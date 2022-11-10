class Postmortem < ApplicationRecord
  belongs_to :assigned_to, class_name: 'Account', inverse_of: :postmortem
  belongs_to :incident
  has_many :next_step_actions
  accepts_nested_attributes_for :next_step_actions, allow_destroy: true

  def touched?
    updated_at > created_at
  end
end
