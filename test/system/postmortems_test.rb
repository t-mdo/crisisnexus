require 'application_system_test_case'

class IncidentsTest < ApplicationSystemTestCase
  setup do
    @account = create(:account)
    @organization = @account.organization
  end

  test 'edits and views postmortem after the incident is closed' do
    @incident = create(:incident, :closed, creator: @account, name: 'Blank landing page')
    login_as(account: @account)
    find('li', text: 'Crisis #1').click
    assert_text 'Crisis #1: Blank landing page'
    assert_text 'Closed'
    assert_text 'Postmortem'
    assert_text "Owner: #{@account.display_name}"
    click_on 'Edit'

    assert_text 'Postmortem'
    assert_text 'Draft'
    fill_in 'summary', with: 'The landing page was fully blank'
    sleep 2
    assert_text 'Changes saved'
    click_on 'Back to incident'
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
    assert_text 'Changes saved'
    assert_no_field 'next_step_actions.1.name'
    fill_in 'next_step_actions.0.name', with: 'Deploy sentry to catch 500 sooner'
    assert_field 'next_step_actions.1.name'
    fill_in 'next_step_actions.1.name', with: 'Add a test on the landing page'
    sleep 2
    assert_text 'Actions saved'
    click_on 'Publish'
    assert_text 'Published'
    click_on 'Back to incident'
    refresh
    click_on 'View'

    assert_text 'Postmortem'
    assert_current_path '/incidents/1/postmortem'
    assert_field 'summary', disabled: true, with: 'The landing page was fully blank'
    assert_field 'impact_who', disabled: true, with: 'All users'
    assert_field 'impact_what',
                 disabled: true,
                 with: 'They could not access the landing page and thus not login if they were logged out'
    assert_field 'incident_started_at', disabled: true, with: @incident.started_at.localtime.strftime('%Y-%m-%dT%H:%M')
    assert_field 'incident_ended_at', disabled: true, with: @incident.ended_at.localtime.strftime('%Y-%m-%dT%H:%M')
    assert_field 'incident_impact_started_at', disabled: true, with: '2022-12-24T18:00'
    assert_field 'incident_impact_ended_at', disabled: true, with: '2022-12-24T19:00'
    assert_field 'timeline_text', disabled: true, with: 'Timeline'
    assert_field 'lucky_text', disabled: true, with: 'Lucky'
    assert_field 'unlucky_text', disabled: true, with: 'Unlucky'
    assert_field 'five_whys_text', disabled: true, with: 'Five whys'
    assert_field 'next_step_actions.0.name', disabled: true, with: 'Deploy sentry to catch 500 sooner'
    assert_field 'next_step_actions.1.name', disabled: true, with: 'Add a test on the landing page'
  end
end
