class Postmortem < ApplicationRecord
  belongs_to :assigned_to, class_name: 'Account', inverse_of: :postmortem
  belongs_to :incident
  has_many :next_step_actions
  has_one :organization, through: :incident

  STATUS_DRAFT = 'open'.freeze
  STATUS_PUBLISHED = 'published'.freeze

  enum :status,
       {
         draft: STATUS_DRAFT,
         published: STATUS_PUBLISHED
       },
       default: STATUS_DRAFT,
       prefix: true

  validates :status, inclusion: { in: statuses.keys }
  validates :incident_impact_ended_at,
            comparison: {
              greater_than: :incident_impact_started_at
            },
            allow_nil: true

  def touched?
    updated_at > created_at
  end
end
