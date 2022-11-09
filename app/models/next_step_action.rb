class NextStepAction < ApplicationRecord
  belongs_to :postmortem

  validates :name, presence: true
end
