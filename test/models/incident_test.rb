require "test_helper"

class IncidentTest < ActiveSupport::TestCase
  @reporter_account = FactoryBot.create(:account)

  test 'should set defaults attribute at creation' do
    incident = Incident.create(name: 'test incident', creator: reporter_account)
    assert_not_nil incident.started_at
    assert_equal 'open', incident.status
  end
end
