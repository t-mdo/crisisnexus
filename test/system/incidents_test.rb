require 'application_system_test_case'

class IncidentsTest < ApplicationSystemTestCase
  include SmsNotificationsHelper

  setup do
    stub_sms_notification_requests

    @account = create(:account)
    @organization = @account.organization
  end

  test 'triggers and closes an incident' do
    login_as(account: @account)

    assert_text 'To do'

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
    assert_button 'Join the war room'
    assert_text 'Open incident'
    assert_text '#CRISIS-1: We are down'
    assert_text 'The root page cannot be loaded anymore'

    assert_difference 'Incident.status_open.count', -1 do
      assert_difference 'Postmortem.count', 1 do
        click_on 'Close the incident'

        within '.modal-container' do
          name_input = find 'input[name="name"]'
          assert_equal 'We are down', name_input.value
          summary_input = find 'textarea[name="summary"]'
          assert_equal 'The root page cannot be loaded anymore', summary_input.value
          fill_in 'summary', with: 'The root page cannot be loaded anymore. It was the cat that unplugged the servers'
          click_on 'Next step'
          fill_in 'Postmortem owner email', with: @account.email
          find('li[role="option"]', text: @account.email).click
          click_on 'Close incident'
        end

        assert_text 'To do'
        assert_text '#CRISIS-1: We are down'
        assert_text 'Closed'
      end
    end
  end

  test 'assigns and re-assigns roles during the incident lifespan' do
    default_im_account = create(:account, :enrolled_as_incident_manager, email: 'im@crisisnexus.com',
                                                                         organization: @organization)
    default_cm_account = create(:account, :enrolled_as_communication_manager, email: 'cm@crisisnexus.com',
                                                                              organization: @organization)
    Incident.open(name: 'We are down', summary: 'The root page cannot be loaded anymore', creator: @account)

    login_as(account: @account)
    incident_manager_block = find('div#role-block-incident_manager')
    incident_manager_block.assert_text "Incident manager\n#{default_im_account.display_name}"
    communication_manager_block = find('div#role-block-communication_manager')
    communication_manager_block.assert_text "Communication manager\n#{default_cm_account.display_name}"
    scribe_block = find('button#role-block-scribe')
    scribe_block.assert_text "Scribe\nNo scribe assigned\nAssume the role"

    click_on 'Roles'
    find_all('a', text: 'Details').first.click
    assert_text 'Roles - Incident manager'
    within find('#enrolled-members') do
      assert_selector 'li', count: 1
      enrollment = find 'li', text: default_im_account.display_name
      enrollment.find('button').click
      assert_no_selector 'li', text: default_im_account.display_name
      assert_text 'No members enrolled yet'
    end
    click_on 'add_enrollment'
    within find('#enrolled-members') do
      fill_in "New member's email", with: @account.email[0..2]
      option = find 'li[role="option"]', text: @account.email
      option.click
      assert_selector 'li', text: @account.display_name
    end

    click_on 'Dashboard'
    refresh
    incident_manager_block = find('button#role-block-incident_manager')
    incident_manager_block.click
    incident_manager_block = find('div#role-block-incident_manager')
    incident_manager_block.assert_text "Incident manager\n#{@account.display_name}"

    scribe_block = find('button#role-block-scribe')
    scribe_block.click
    scribe_block = find('div#role-block-scribe')
    scribe_block.assert_text "Scribe\n#{@account.display_name}"
  end

  test 'assigns scribe role and scribe minutes' do
    create(:account, :enrolled_as_incident_manager, organization: @organization)
    create(:account, :enrolled_as_communication_manager, organization: @organization)
    Incident.open(name: 'We are down', summary: 'The root page cannot be loaded anymore', creator: @account)
    Incident.first.minutes.create(who: 'Jean-Claude', what: "1 + 1 = 11. Et ça c'est beau", recorded_by: @account)

    login_as(account: @account)
    assert_no_button 'Start scribing'
    assert_text 'No scribe assigned'
    assert_text 'Assume the role'
    click_on 'Assume the role'
    within '#role-block-scribe' do
      assert_text @account.display_name
    end
    click_on 'Start scribing'
    assert_text '#CRISIS-1: We are down'
    assert_text 'Minutes'
    assert_text 'Jean-Claude'
    assert_text "1 + 1 = 11. Et ça c'est beau"
    fill_in 'Who', with: 'Jean-Claude'
    fill_in 'Said or Did What', with: "J'adore l'eau. Dans 20/30 ans il y en aura plus"
    click_on 'Submit'
    assert_text "J'adore l'eau. Dans 20/30 ans il y en aura plus"
  end

  test 'edits and views postmortem after the incident is closed' do
    create(:incident, :closed, creator: @account, name: 'Blank landing page')
    login_as(account: @account)
    find('li', text: 'CRISIS-1').click
    assert_text '#CRISIS-1: Blank landing page'
    assert_text 'Closed'
    assert_text 'Postmortem'
    assert_text "Owner: #{@account.display_name}"
    click_on 'Edit'

    assert_text 'Postmortem edition'
    fill_in 'summary', with: 'The landing page was fully blank'
    sleep 2
    assert_text 'Postmortem saved'
    click_on 'Back to incident'
    refresh
    click_on 'View'

    assert_text 'Postmortem'
    assert_no_text 'edition'
    assert_text 'One sentence summary'
    assert_no_text 'Who was impacted'
    click_on 'Edit'

    assert_field 'summary', with: 'The landing page was fully blank'
    fill_in 'impact_who', with: 'All users'
    fill_in 'impact_what', with: 'They could not access the landing page and thus not login if they were logged out'
    find('input[placeholder="Start time"]').click
    fill_in 'incident_impact_started_at', with: Time.parse('24-12-2022 18:00')
    find('input[placeholder="End time"]').click
    fill_in 'incident_impact_ended_at', with: Time.parse('24-12-2022 19:00')
    fill_in 'timeline_text', with: 'Timeline'
    fill_in 'lucky_text', with: 'Lucky'
    fill_in 'unlucky_text', with: 'Unlucky'
    fill_in 'five_whys_text', with: 'Five whys'
    sleep 2
    assert_text 'Postmortem saved'
    assert_no_field 'next_step_actions.1.name'
    fill_in 'next_step_actions.0.name', with: 'Deploy sentry to catch 500 sooner'
    assert_field 'next_step_actions.1.name'
    fill_in 'next_step_actions.1.name', with: 'Add a test on the landing page'
    sleep 2
    assert_text 'Actions saved'
    click_on 'Back to incident'
    click_on 'View'

    assert_text 'Postmortem'
    assert_no_text 'edition'
    assert_text 'The landing page was fully blank'
    assert_text 'All users'
    assert_text 'They could not access the landing page and thus not login if they were logged out'
    assert_text 'Dec 24, 2022 6:00 PM'
    assert_text 'Dec 24, 2022 7:00 PM'
    assert_text 'Timeline'
    assert_text 'Lucky'
    assert_text 'Unlucky'
    assert_text 'Five whys'
    assert_text 'Deploy sentry to catch 500 sooner'
    assert_text 'Add a test on the landing page'
  end
end
