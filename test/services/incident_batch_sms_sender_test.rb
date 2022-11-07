require 'test_helper'

class IncidentBatchSmsSenderTest < ActionDispatch::IntegrationTest
  include SmsNotificationsHelper

  setup do
    @account = create(:account)
    @organization = @account.organization
    @incident = create(:incident, :open, creator: @account)
    login_account(@account)
  end

  test 'sends sms to all accounts in the organization' do
    stub_sms_notification_requests

    account_in_different_org = create(:account)
    create_list(:account, 9, organization: @account.organization)

    assert_difference 'SmsNotification.count', 10 do
      IncidentBatchSmsSender.call(incident: @incident)
    end

    @organization.accounts.each do |account|
      assert_sms_notification_request(
        body: @incident.sms_notification_body,
        to: account.phone_number
      )

      sms = account.sms_notifications.last

      assert_not_nil sms
      assert sms.success
      assert_nil sms.error_message
      assert_equal @incident, sms.incident
      assert_equal @organization, sms.organization
      assert_equal @incident.sms_notification_body, sms.body
    end
    assert_equal 0, account_in_different_org.sms_notifications.count
  end

  test 'does not send sms and logs the error if phone number is blank' do
    @account.update!(phone_number: nil)

    assert_difference 'SmsNotification.count', 0 do
      IncidentBatchSmsSender.call(incident: @incident)
    end
  end

  test 'does not send sms and logs the error if twilio respond in error' do
    stub_error_sms_notification_requests

    assert_difference 'SmsNotification.count', 1 do
      IncidentBatchSmsSender.call(incident: @incident)
    end

    sms = @account.sms_notifications.last
    assert_not sms.success
    assert_equal "[HTTP 400] 21610 : Unable to create record\nAttempt to send to unsubscribed recipient\nhttps://www.twilio.com/docs/api/errors/21610\n\n",
                 sms.error_message
  end
end
