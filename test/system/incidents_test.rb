require 'application_system_test_case'

class IncidentsTest < ApplicationSystemTestCase
  include SmsNotificationsHelper

  setup do
    stub_sms_notification_requests

    @account = create(:account)
    login_as(account: @account)
  end

  test 'triggers and closes an incident' do
    assert_text 'No incident in progress'

    click_on 'Trigger an incident'

    within '.modal-container' do
      assert_text 'Trigger an incident'
      assert_text "What's happening?"
      fill_in 'name', with: 'We are down'
      assert_text 'Summary (optional)'
      fill_in 'summary', with: 'The root page cannot be loaded anymore'
      click_on 'Godspeed'
    end

    assert_text 'Incident in progress'
    assert_button 'Join the War Room'
    assert_text 'Ongoing incident'
    assert_text '#CRISIS-1: We are down'
    assert_text 'The root page cannot be loaded anymore'

    click_on 'Close the incident'

    within '.modal-container' do
      name_input = find 'input[name="name"]'
      assert_equal 'We are down', name_input.value
      summary_input = find 'textarea[name="summary"]'
      assert_equal 'The root page cannot be loaded anymore', summary_input.value
      fill_in 'summary', with: 'The root page cannot be loaded anymore. It was the cat that unplugged the servers'
      click_on 'Close the crisis'
    end

    assert_text 'No incident in progress'
    assert_text '#CRISIS-1: We are down'
    assert_text 'Closed'
  end
end
