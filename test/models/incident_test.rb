require 'test_helper'

class IncidentTest < ActiveSupport::TestCase
  setup do
    @organization = create(:organization)
    @reporter_account = create(:account, organization: @organization)
  end

  test 'should set defaults attribute at creation' do
    incident =
      Incident.create!(name: 'test incident', creator: @reporter_account)
    assert_not_nil incident.started_at
    assert_equal 'open', incident.status
  end

  test 'should set local_id according to number of incidents in organization' do
    incident =
      Incident.create!(name: 'test incident', creator: @reporter_account)
    incident.status_closed!
    incident2 =
      Incident.create!(name: 'test incident 2', creator: @reporter_account)
    assert_equal 1, incident.local_id
    assert_equal 2, incident2.local_id
  end

  test 'should set ended_at when status is closed' do
    incident = create(:incident, :open, creator: @reporter_account)
    assert_equal incident.status, Incident::STATUS_OPEN
    assert_nil incident.ended_at
    incident.status_closed!
    assert_equal incident.status, Incident::STATUS_CLOSED
    assert_not_nil incident.ended_at
  end
end
