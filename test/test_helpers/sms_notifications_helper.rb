module SmsNotificationsHelper
  TWILIO_API_MESSAGES_URL = 'https://api.twilio.com/2010-04-01/Accounts/ACf873a585b8cdc5718514f3f7d2fa470b/Messages.json'.freeze

  def stub_sms_notification_requests
    stub_request(:post, TWILIO_API_MESSAGES_URL)
      .to_return(
        status: 200,
        body: "{}",
      )
  end
end
