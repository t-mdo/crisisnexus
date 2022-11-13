require 'application_system_test_case'

class AuthenticationTest < ApplicationSystemTestCase
  setup do
    @account = create(:account, password: 'strongpassword1234')
    @account.activate!
  end

  test 'login step' do
    visit login_path

    assert_text 'Login'
    fill_in 'email', with: @account.email
    fill_in 'password', with: 'crapcrap'
    click_on 'Log in'
    assert_selector '.flash-alert', text: 'Invalid password'

    fill_in 'email', with: @account.email
    fill_in 'password', with: 'strongpassword1234'
    click_on 'Log in'
    assert_text 'Dashboard'
  end
end
