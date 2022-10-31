class RoleEnrollment < ApplicationRecord
  belongs_to :role
  belongs_to :account
end
