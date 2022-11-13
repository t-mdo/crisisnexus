require 'test_helper'

class Accounts::ActivationController < ActionDispatch::IntegrationTest
  setup do
    @account = create(:account, phone_number: nil, password: 'strongpassword1234')
  end

  test '#show activates account' do
    assert_equal 'pending', @account.activation_state
    assert_emails 1

    activation_email = ActionMailer::Base.deliveries.last
    assert_equal 'noreply@crisisnexus.com', activation_email.from.first
    assert_equal @account.email, activation_email.to.first
    assert_equal 'Activate your CrisisNexus account', activation_email.subject

    get account_activation_path(params: { key: @account.activation_token })
    assert_redirected_to root_url

    assert_equal 'active', @account.reload.activation_state
    assert_emails 2

    confirmation_email = ActionMailer::Base.deliveries.last
    assert_equal 'noreply@crisisnexus.com', confirmation_email.from.first
    assert_equal @account.email, confirmation_email.to.first
    assert_equal 'Your CrisisNexus account is now activated', confirmation_email.subject
  end
end
