require 'application_system_test_case'

class RegistrationTest < ApplicationSystemTestCase
  test 'registration, activation and onboarding step' do
    visit new_account_path

    assert_text 'Sign up'
    assert_text 'Use your work email'
    fill_in 'email', with: 'test@crisisnexus.com'
    fill_in 'password', with: 'password'
    click_on 'Sign up'
    assert_text 'Account activation required'
    assert_text "We've just sent a link to test@crisisnexus.com."
    assert_text 'Check out your inbox and click the link to activate your account.'

    assert_equal 1, ActionMailer::Base.deliveries.size
    activation_email = ActionMailer::Base.deliveries.last
    assert_equal 'test@crisisnexus.com', activation_email.to.first
    assert_equal 'Activate your CrisisNexus account', activation_email.subject
    key = activation_email.body.match(/key=(.*)"/)[1]
    visit account_activation_url(key:)

    assert_equal 2, ActionMailer::Base.deliveries.size
    confirmation_email = ActionMailer::Base.deliveries.last
    assert_equal 'test@crisisnexus.com', activation_email.to.first
    assert_equal 'Your CrisisNexus account is now activated', confirmation_email.subject

    assert_text 'Welcome to CrisisNexus'
    assert_text 'This is a quick onboarding'
    assert_text 'Organization creation'
    assert_text 'Organization domain'
    domain = find 'input[disabled]'
    assert_equal 'crisisnexus.com', domain.value
    fill_in 'war_room_url', with: 'https://meet.google.com/xxx-xxxx-xxx'
    click_on 'Next step'

    assert_text 'Phone number'
    fill_in 'phone_number', with: '+1 555 555 5555'
    click_on 'Finish'

    assert_text 'Dashboard'
  end
end
