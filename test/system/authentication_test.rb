require 'application_system_test_case'

class AuthenticationTest < ApplicationSystemTestCase
  setup do
    @account = create(:account, password: 'strongpassword1234')
    @account.activate!
  end

  test 'login step' do
    visit root_path
    click_on 'Login'

    within 'form' do
      fill_in 'email', with: @account.email
      fill_in 'password', with: 'crapcrap'
      click_on 'Login'
    end

    assert_selector '.flash-alert', text: 'Invalid email or password'

    within 'form' do
      fill_in 'email', with: @account.email
      fill_in 'password', with: 'strongpassword1234'
      click_on 'Login'
    end
    assert_text 'Dashboard'
  end
end
