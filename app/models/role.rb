class Role < ApplicationRecord
  has_many :role_enrollments
  has_many :accounts, through: :role_enrollments
end
