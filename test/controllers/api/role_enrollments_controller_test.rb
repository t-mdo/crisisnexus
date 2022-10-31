require 'test_helper'

class Api::RoleEnrollmentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @role = create(:role, :incident_manager)
    @account = create(:account)

    login_account @account
  end

  test '#create enrolls account as potential holder of a role' do
    assert_equal 0, @account.role_enrollments.count

    assert_difference 'RoleEnrollment.count', 1 do
      post role_enrollments_path(params: { account_id: @account.id, role_id: @role.id }, format: :json)
      assert_response :success
    end

    assert_equal 1, @account.role_enrollments.count
    assert_not_nil @account.role_enrollments.last
  end

  test '#create render 404 if account not found' do
    assert_no_difference 'RoleEnrollment.count' do
      post role_enrollments_path(params: { account_id: @account.id + 1, role_id: @role.id }, format: :json)
      assert_response :not_found
    end

    error = response.parsed_body['errors'].first
    assert_equal 'Account not found', error
  end

  test '#create render 404 if role not found' do
    assert_no_difference 'RoleEnrollment.count' do
      post role_enrollments_path(params: { account_id: @account.id, role_id: @role.id + 1 }, format: :json)
      assert_response :not_found
    end

    error = response.parsed_body['errors'].first
    assert_equal 'Role not found', error
  end

  test '#destroy remove enrollment of account as potential holder of a role' do
    create(:role_enrollment, account: @account, role: @role)
    assert_equal 1, @account.role_enrollments.count

    assert_difference 'RoleEnrollment.count', -1 do
      delete role_enrollments_path(params: { account_id: @account.id, role_id: @role.id }, format: :json)
      assert_response :success
    end

    assert_equal 0, @account.role_enrollments.count
    assert_nil @account.role_enrollments.last
  end
end
