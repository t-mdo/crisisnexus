require 'test_helper'

class SmsNotificationTest < ActiveSupport::TestCase
  test 'sms notification should have a body, an organization, an account and and incident' do
    account = create(:account)
    incident = create(:incident, creator: account)

    sms = SmsNotification.new
    assert_not sms.valid?

    sms =
      SmsNotification.new(
        account:,
        incident:,
        organization: account.organization,
        body: 'test',
      )
    assert sms.valid?
  end
end
