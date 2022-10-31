require 'test_helper'

class Api::Roles::EnrollmentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @role = create(:role, :incident_manager)
    @account = create(:account)

    login_account @account
  end

  test '#create enrolls account as potential holder of a role' do
    assert_equal 0, @account.role_enrollments.count

    assert_difference 'RoleEnrollment.count', 1 do
      post role_enrollments_path(@role.name, params: { enrollment: { account_id: @account.id } }, format: :json)
      assert_response :success
    end

    assert_equal 1, @account.role_enrollments.count
    assert_not_nil @account.role_enrollments.last
  end

  test '#create render 422 if account not found' do
    assert_no_difference 'RoleEnrollment.count' do
      post role_enrollments_path(@role.name, params: { enrollment: { account_id: @account.id + 1 } }, format: :json)
      assert_response :unprocessable_entity
    end

    error = response.parsed_body['errors'].first
    assert_equal 'Account must exist', error
  end

  test '#create render 404 if role not found' do
    assert_no_difference 'RoleEnrollment.count' do
      post role_enrollments_path('crapcrap', params: { enrollment: { account_id: @account.id } }, format: :json)
      assert_response :not_found
    end

    error = response.parsed_body['errors'].first
    assert_equal 'Role not found', error
  end
end
