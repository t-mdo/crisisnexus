require 'application_system_test_case'

class RegistrationTest < ApplicationSystemTestCase
  setup do
    @account = create(:account)
  end

  test 'reset account password' do
    visit root_path
    click_on 'Sign in'

    assert_text 'Forgot your password?'
    click_on 'Reset it'
    assert_text 'Reset password'
    fill_in 'Email', with: @account.email
    assert_difference 'ActionMailer::Base.deliveries.size', 1 do
      click_on 'Reset password'
    end
    assert_text 'Instructions have been sent to your email'
    mail = ActionMailer::Base.deliveries.last
    assert_equal mail.to, [@account.email]
    assert_equal mail.subject, 'Reset your CrisisNexus account password'
    token = mail.body.match(/token=(?<token>.*)"/)[:token]

    visit edit_password_reset_path(token:)
    assert_text 'Reset password'
    fill_in 'Password', with: 'newpassword'
    fill_in 'Password confirmation', with: 'newpassword'
    click_on 'Update password'

    click_on 'Sign in'
    fill_in 'Email', with: @account.email
    fill_in 'Password', with: 'newpassword'
    click_on 'Log in'
    assert_text 'Dashboard'
  end

  test 'reset password with invalid email' do
    visit root_path
    click_on 'Sign in'

    assert_text 'Forgot your password?'
    click_on 'Reset it'
    assert_text 'Reset password'
    fill_in 'Email', with: 'crapcrap@crapcrap.com'
    click_on 'Reset password'
    assert_text 'No user found with that email'
  end
end
