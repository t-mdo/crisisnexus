class RoleEnrollment < ApplicationRecord
  belongs_to :role
  belongs_to :account

  validates_uniqueness_of :account_id, scope: :role_id, message: "can't have multiple enrollments for the same role"
end
