require 'test_helper'

class RoleDesignatorTest < ActionDispatch::IntegrationTest
  setup do
    @organization = create(:organization)
    @role = create(:role, :incident_manager)
    create_list(:account, 10, organization: @organization)
    Account.all.each_with_index do |account, index|
      create(:role_enrollment, account:, role: @role, last_exercised_at: index.days.ago)
    end
    @role_designator = RoleDesignator.new(organization: @organization)

    login_account(Account.first)
  end

  test 'designates incident manager in a organization' do
    last_exercised_account = RoleEnrollment.where(role: @role).order(last_exercised_at: :desc).first.account
    assert_equal last_exercised_account, @role_designator.designate_enrollment_for_incident_manager_role.account

    never_exercised_account = Account.last
    never_exercised_account.role_enrollments.first.update!(last_exercised_at: nil)
    assert_equal never_exercised_account, @role_designator.designate_enrollment_for_incident_manager_role.account
    never_exercised_account.destroy!

    other_organization_account = create(:account)
    create(:role_enrollment, account: other_organization_account, role: @role, last_exercised_at: nil)
    assert_not_equal other_organization_account, @role_designator.designate_enrollment_for_incident_manager_role.account
  end
end
