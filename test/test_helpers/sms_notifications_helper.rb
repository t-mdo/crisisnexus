module SmsNotificationsHelper
  TWILIO_API_MESSAGES_URL = 'https://api.twilio.com/2010-04-01/Accounts/ACf873a585b8cdc5718514f3f7d2fa470b/Messages.json'.freeze

  def stub_sms_notification_requests
    stub_request(:post, TWILIO_API_MESSAGES_URL)
      .to_return(
        status: 200,
        body: {}.to_json
      )
  end

  def stub_error_sms_notification_requests
    stub_request(:post, TWILIO_API_MESSAGES_URL)
      .to_return(
        status: 400,
        body: {
          message: 'Attempt to send to unsubscribed recipient',
          code: 21_610,
          more_info: 'https://www.twilio.com/docs/api/errors/21610',
          status: 400
        }.to_json
      )
  end

  def assert_sms_notification_request(body:, to:, times: 1)
    from_phone_number = '18644796982'
    assert_requested :post, TWILIO_API_MESSAGES_URL,
                     body: { 'Body' => body, 'From' => from_phone_number, 'To' => to }, times:
  end

  def assert_no_sms_notification_request
    assert_not_requested :post, TWILIO_API_MESSAGES_URL
  end
end
