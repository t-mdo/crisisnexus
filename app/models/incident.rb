class Incident < ApplicationRecord
  STATUS_OPEN = 'open'
  STATUS_CLOSED = 'closed'
  STATUS_POSTMORTEM_PUBLISHED = 'postmortem_published'
  
  attribute :started_at, :datetime, default: Time.now.utc

  belongs_to :creator, class_name: 'Account'

  enum :status, { open: STATUS_OPEN, closed: STATUS_CLOSED, postmortem_published: STATUS_POSTMORTEM_PUBLISHED }, default: STATUS_OPEN, prefix: true

  validates :status, inclusion: { in: statuses.keys }
end
