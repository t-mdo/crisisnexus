class NextStepAction < ApplicationRecord
  belongs_to :postmortem
  belongs_to :assigned_to, class_name: 'Account', optional: true
  has_one :incident, through: :postmortem

  validates :name, presence: true
  validates :due_at,
            comparison: {
              greater_than: Time.zone.now
            }, allow_nil: true
end
