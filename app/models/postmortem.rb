class Postmortem < ApplicationRecord
  belongs_to :assigned_to
  belongs_to :incident
end
