require 'test_helper'

class RoleEnrollmentTest < ActiveSupport::TestCase
  setup do
    @role = create(:role, :incident_manager)
    @account = create(:account)
  end

  test 'account cannot have multiple enrollments for the same role' do
    persisted = RoleEnrollment.create(account: @account, role: @role)
    assert persisted

    second_enrollment = RoleEnrollment.new(account: @account, role: @role)
    assert_not second_enrollment.valid?
    assert_equal "Account can't have multiple enrollments for the same role",
                 second_enrollment.errors.full_messages.first
  end
end
