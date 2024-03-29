require 'application_system_test_case'

class OrganizationSettingsTest < ApplicationSystemTestCase
  setup do
    @account = create(:account)
    @organization = @account.organization
    create_list(:account, 20, organization: @organization)
  end

  test 'setup war room url' do
    create(:incident, :open, organization: @organization)
    @organization.update!(war_room_url: nil)

    login_as(account: @account)
    click_on 'Set up your war room'
    assert_text 'Organization settings'
    fill_in 'war_room_url', with: 'https://meet.google.com/xxx-yyyy-zzz'
    click_on 'Submit'
    assert_text 'Changes applied'
  end

  test 'organization settings form and accounts list and accounts invitations' do
    login_as(account: @account)
    click_on 'Organization'
    assert_text 'Organization settings'
    assert_field 'name', with: @organization.name
    assert_field 'war_room_url', with: @organization.war_room_url
    fill_in 'name', with: 'Awesome Inc.', fill_options: { clear: :backspace }
    fill_in 'war_room_url', with: 'https://meet.google.com/xxx-xxxx-xxx', fill_options: { clear: :backspace }
    click_on 'Submit'
    assert_equal 'Awesome Inc.', @organization.reload.name
    assert_equal 'https://meet.google.com/xxx-xxxx-xxx', @organization.reload.war_room_url
    refresh
    assert_field 'name', with: @organization.name
    assert_field 'war_room_url', with: @organization.war_room_url

    assert_selector 'li', count: 21
    assert_selector 'li', text: @account.email
    assert_selector 'li', text: Account.last.email

    click_on 'Invite accounts'
    assert_text 'Invite accounts to your organization'
    assert_field disabled: true, with: "https://www.crisisnexus.com/account/new?organization=#{@organization.identifier}"
  end

  test 'organization settings form errors' do
    login_as(account: @account)
    click_on 'Organization'
    assert_text 'Organization settings'
    fill_in 'name', with: '', fill_options: { clear: :backspace }
    fill_in 'war_room_url', with: '', fill_options: { clear: :backspace }
    click_on 'Submit'
    assert_text 'Your organization needs to have a name'
    assert_text 'You need a virtual war room url for your organization'
    refresh
    fill_in 'war_room_url', with: 'crapcrap', fill_options: { clear: :backspace }
    click_on 'Submit'
    assert_text 'War room url must be a valid URL'
  end
end
