require 'application_system_test_case'

class OrganizationSettingsTest < ApplicationSystemTestCase
  setup do
    @account = create(:account, phone_number: nil)
    @organization = @account.organization
  end

  test 'account settings form' do
    login_as(account: @account)
    click_on @account.display_name
    assert_text 'Account'
    assert_text "Logged in as: #{@account.email}"

    assert_field 'phone_number', with: ''
    fill_in 'phone_number', with: '+33612345678'
    click_on 'Submit'

    assert_equal '+33612345678', @account.reload.phone_number
    refresh
    assert_field 'phone_number', with: '+33612345678'
  end

  test 'account settings form errors' do
    login_as(account: @account)
    click_on @account.display_name
    assert_text 'Account'

    fill_in 'phone_number', with: 'crapcrap', fill_options: { clear: :backspace }
    click_on 'Submit'
    assert_text 'Phone number is invalid. Please write it to the format +14123456789'
    refresh
    fill_in 'phone_number', with: '0637799194', fill_options: { clear: :backspace }
    click_on 'Submit'
    assert_text 'Phone number is invalid. Please write it to the format +14123456789'
  end
end
