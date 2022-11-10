require 'test_helper'

class PostmortemTest < ActiveSupport::TestCase
  test 'impact start/end timestamps should be consistent' do
    account = create(:account)
    incident = create(:incident, creator: account)
    postmortem = Postmortem.new(
      incident:,
      assigned_to: account,
      incident_impact_started_at: Time.now,
      incident_impact_ended_at: Time.now - 1.hour
    )
    assert_not postmortem.valid?
    assert_match(/Incident impact ended at must be greater than/, postmortem.errors.full_messages.join)
  end

  test 'touched?' do
    postmortem = create(:postmortem, incident: create(:incident))
    assert_not postmortem.touched?
    postmortem.update!(summary: 'summary')
    assert postmortem.touched?
  end
end
