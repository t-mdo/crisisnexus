class NextStepAction < ApplicationRecord
  belongs_to :postmortem
  belongs_to :assigned_to, class_name: 'Account', optional: true
  has_one :incident, through: :postmortem

  validates :name, presence: true

  def completed?
    completed_at.present?
  end
end
