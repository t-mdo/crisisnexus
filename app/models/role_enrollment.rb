class RoleEnrollment < ApplicationRecord
  belongs_to :role
  belongs_to :account
  belongs_to :organization

  validates_uniqueness_of :account_id, scope: :role_id, message: "can't have multiple enrollments for the same role"

  after_initialize :set_organization

  private

  def set_organization
    self.organization ||= account&.organization
  end
end
