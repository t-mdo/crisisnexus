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
  has_many :sms_notifications

  enum :status,
       {
         open: STATUS_OPEN,
         closed: STATUS_CLOSED,
         postmortem_published: STATUS_POSTMORTEM_PUBLISHED,
       },
       default: STATUS_OPEN,
       prefix: true

  validates :name, presence: true
  validates :status, inclusion: { in: statuses.keys }
  validates :ended_at,
            comparison: {
              greater_than: :started_at,
            },
            allow_nil: true

  after_initialize :set_organization
  before_create :set_local_id
  before_create :abort_if_organization_has_open_incident
  before_update :set_ended_at,
                if: -> { status_changed? && status == STATUS_CLOSED }

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
