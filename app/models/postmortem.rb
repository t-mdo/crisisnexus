class Postmortem < ApplicationRecord
  belongs_to :assigned_to, class_name: 'Account', inverse_of: :postmortem
  belongs_to :incident
  has_many :next_step_actions
end
