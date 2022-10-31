require 'test_helper'

class Api::RoleEnrollmentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @role = create(:role, :incident_manager)
    @account = create(:account)
    @role_enrollment = create(:role_enrollment, account: @account, role: @role)

    login_account @account
  end

  test '#destroy remove enrollment of account as potential holder of a role' do
    assert_equal 1, @account.role_enrollments.count

    assert_difference 'RoleEnrollment.count', -1 do
      delete role_enrollment_path(@role_enrollment.id, format: :json)
      assert_response :success
    end

    assert_equal 0, @account.role_enrollments.count
    assert_nil @account.role_enrollments.last
  end
end
