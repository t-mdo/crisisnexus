class Incident < ApplicationRecord
  STATUS_OPEN = 'open'.freeze
  STATUS_CLOSED = 'closed'.freeze
  STATUS_POSTMORTEM_PUBLISHED = 'postmortem_published'.freeze

  attribute :started_at, :datetime, default: Time.now.utc

  belongs_to :organization

  belongs_to :creator, class_name: 'Account', inverse_of: :created_incidents
  belongs_to :closer,
             class_name: 'Account',
             inverse_of: :closed_incidents,
             optional: true
  belongs_to :incident_manager,
             class_name: 'Account',
             inverse_of: :managed_incidents,
             optional: true
  belongs_to :incident_manager_sidekick,
             class_name: 'Account',
             inverse_of: :sidekicked_incidents,
             optional: true
  belongs_to :scribe, class_name: 'Account', inverse_of: :scribed_incidents, optional: true
  belongs_to :communication_manager,
             class_name: 'Account',
             inverse_of: :communication_managed_incidents,
             optional: true

  has_many :sms_notifications

  enum :status,
       {
         open: STATUS_OPEN,
         closed: STATUS_CLOSED,
         postmortem_published: STATUS_POSTMORTEM_PUBLISHED
       },
       default: STATUS_OPEN,
       prefix: true

  validates :name, presence: true
  validates :status, inclusion: { in: statuses.keys }
  validates :ended_at,
            comparison: {
              greater_than: :started_at
            },
            allow_nil: true

  after_initialize :set_organization
  before_create :set_local_id
  before_create :abort_if_organization_has_open_incident
  before_update :set_ended_at,
                if: -> { status_changed? && status == STATUS_CLOSED }

  class << self
    def open(creator:, **attributes)
      role_designator = RoleDesignator.new(organization: creator.organization)
      incident_manager_enrollment = role_designator.designate_enrollment_for_incident_manager_role
      communication_manager_enrollment = role_designator.designate_enrollment_for_communication_manager_role
      incident = create(
        **attributes,
        creator:,
        incident_manager: incident_manager_enrollment&.account,
        communication_manager: communication_manager_enrollment&.account
      )
      return incident unless incident.persisted?

      incident_manager_enrollment&.set_exercised_at
      communication_manager_enrollment&.set_exercised_at
      IncidentBatchSmsSender.call(incident:)
      incident
    end
  end

  def duration
    ended_at_or_now = ended_at || Time.now.utc
    ended_at_or_now - started_at
  end

  def sms_notification_body
    return "Crisis \"#{name}\" closed by #{creator.email}" if status_closed?

    "Crisis \"#{name}\" open.\nPlease join the war room asap! Godspeed"
  end

  private

  def abort_if_organization_has_open_incident
    return unless organization.incidents.status_open.any?

    errors.add(:base, 'An incident is already ongoing')
    throw :abort
  end

  def set_organization
    return if creator.blank?

    self.organization ||= creator.organization
  end

  def set_local_id
    return if organization.blank?

    self.local_id ||= organization.incidents.count + 1
  end

  def set_ended_at
    self.ended_at = Time.now.utc
  end
end
