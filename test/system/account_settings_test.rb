require 'application_system_test_case'

class AccountSettingsTest < ApplicationSystemTestCase
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
    assert_field 'display_name', with: @account.display_name
    fill_in 'phone_number', with: '+33612345678'
    fill_in 'display_name', with: 'John Doe', fill_options: { clear: :backspace }
    click_on 'Submit'

    assert_equal '+33612345678', @account.reload.phone_number
    assert_equal 'John Doe', @account.reload.display_name
    refresh
    assert_field 'phone_number', with: '+33612345678'
    assert_field 'display_name', with: 'John Doe'
  end

  test 'account settings form errors' do
    login_as(account: @account)
    click_on @account.display_name
    assert_text 'Account'

    fill_in 'display_name', with: '', fill_options: { clear: :backspace }
    click_on 'Submit'
    assert_text 'Display name is required'
    refresh
    fill_in 'phone_number', with: '0637799194', fill_options: { clear: :backspace }
    click_on 'Submit'
    assert_text 'Phone number is invalid. Please write it to the format +14123456789'
  end
end
