class Minute < ApplicationRecord
  belongs_to :incident
  belongs_to :recorded_by, class_name: 'Account'
end
