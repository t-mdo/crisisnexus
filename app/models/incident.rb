class Incident < ApplicationRecord
  STATUS_OPEN = 'open'
  STATUS_CLOSED = 'closed'
  STATUS_POSTMORTEM_PUBLISHED = 'postmortem_published'

  attribute :started_at, :datetime, default: Time.now.utc

  belongs_to :organization
  belongs_to :creator, class_name: 'Account', inverse_of: :incidents

  enum :status,
       {
         open: STATUS_OPEN,
         closed: STATUS_CLOSED,
         postmortem_published: STATUS_POSTMORTEM_PUBLISHED,
       },
       default: STATUS_OPEN,
       prefix: true

  validates :status, inclusion: { in: statuses.keys }

  after_initialize :set_organization
  after_initialize :set_local_id
  before_create :abort_if_organization_has_open_incident

  private

  def abort_if_organization_has_open_incident
    return unless organization.incidents.status_open.any?
    errors.add(:base, 'An incident is already ongoing')
    throw :abort
  end

  def set_local_id
    return if organization.blank?
    self.local_id ||= organization.incidents.count + 1
  end

  def set_organization
    self.organization ||= creator.organization
  end
end
