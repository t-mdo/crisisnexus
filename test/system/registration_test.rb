require 'application_system_test_case'

class RegistrationTest < ApplicationSystemTestCase
  test 'registration, activation and onboarding step' do
    visit new_account_path

    assert_text 'Sign up'
    assert_text 'Use your work email'
    fill_in 'email', with: 'test@crisisnexus.com'
    fill_in 'password', with: 'strongpassword1234'
    click_on 'Sign up'
    assert_text 'Account activation required'
    assert_text "We've just sent a link to test@crisisnexus.com"
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

    assert_difference 'ActionMailer::Base.deliveries.size', 1 do # email to tmo@crisisnexus.com
      assert_text 'A few more steps to go'
      assert_text 'This is a quick onboarding'
      assert_text 'Organization creation'
      assert_text 'Organization domain'
      domain = find 'input[disabled]'
      assert_equal 'crisisnexus.com', domain.value
      fill_in 'war_room_url', with: 'https://meet.google.com/xxx-xxxx-xxx'
      click_on 'Next step'

      assert_text 'Phone number'
      fill_in 'phone_number', with: '0637799194'
      click_on 'Finish'
      assert_text 'Phone number is invalid. Please write it to the format +14123456789'
      fill_in 'phone_number', with: '+1 555 555 5555', fill_options: { clear: :backspace }
      fill_in 'display_name', with: 'John'
      click_on 'Finish'
    end

    assert_text 'Welcome to CrisisNexus'
    assert_text 'Thank you for being one of our earliest users'
    assert_text 'Book a first session with me'
    assert_text 'Thibault Miranda de Oliveira'
    assert_button 'Later'
    new_tab = window_opened_by do
      click_on 'Book the session'
    end
    within_window new_tab do
      assert_current_path 'https://calendly.com/crisisnexus/onboarding', ignore_query: true
    end
    new_tab.close

    assert_text 'Dashboard'
  end

  test 'registration with invitation link' do
    @organization = create(:organization, name: 'CrisisNexus', identifier: 'crisisnexus.com')
    create(:account, organization: @organization)

    visit new_account_path(organization: @organization.identifier)
    assert_field 'email_domain', disabled: true, with: '@crisisnexus.com'
    fill_in 'email', with: 'tmo'
    fill_in 'password', with: 'strongpassword1234'
    click_on 'Sign up'
    assert_text 'Account activation required'
    assert_text "We've just sent a link to tmo@crisisnexus.com"
    last_mail_sent = ActionMailer::Base.deliveries.last
    assert_equal 'tmo@crisisnexus.com', last_mail_sent.to.first
    assert_equal 'Activate your CrisisNexus account', last_mail_sent.subject
  end
end
