class Organization < ApplicationRecord
  has_many :accounts
  has_many :incidents
end
