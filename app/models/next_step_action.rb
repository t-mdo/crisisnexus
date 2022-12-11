class NextStepAction < ApplicationRecord
  belongs_to :postmortem
  belongs_to :assigned_to, class_name: 'Account', optional: true

  validates :name, presence: true
  validates :due_at,
            comparison: {
              greater_than: Time.now.utc
            }, allow_nil: true
end
