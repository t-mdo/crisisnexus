require 'test_helper'

class IncidentTest < ActiveSupport::TestCase
  include SmsNotificationsHelper

  setup do
    stub_sms_notification_requests
    @role_im = create(:role, :incident_manager)
    @role_cm = create(:role, :communication_manager)
    create(:role, :scribe)
    @organization = create(:organization)
    @reporter_account = create(:account, organization: @organization)
  end

  test 'should have a name, a creator and an organization' do
    incident = Incident.new
    assert_not incident.valid?
    assert_equal %i[creator name organization],
                 incident.errors.messages.keys.sort

    incident =
      Incident.new(
        name: 'test',
        creator: @reporter_account,
        organization: @organization
      )
    assert incident.valid?
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

  test 'should not create an incident if there is already an open incident in the organization' do
    open_incident = create(:incident, :open, creator: @reporter_account)

    incident =
      Incident.create(name: 'test incident', creator: @reporter_account)
    assert_not incident.persisted?
    assert_equal 'An incident is already ongoing',
                 incident.errors.full_messages.first

    open_incident.status_closed!
    incident =
      Incident.create(name: 'test incident', creator: @reporter_account)
    assert incident.persisted?
  end

  test 'incident.open creates an incident with the roles' do
    accounts = create_list(:account, 10, organization: @organization)
    accounts.first(5).each { |account| create(:role_enrollment, account:, role: @role_im) }
    accounts.last(5).each { |account| create(:role_enrollment, account:, role: @role_cm) }

    assert_difference 'Incident.count', 1 do
      assert_difference 'SmsNotification.count', 11 do
        incident = Incident.open(name: 'test incident', creator: @reporter_account)
        assert incident.persisted?
        assert_not_nil incident.incident_manager
        assert_not_nil incident.communication_manager
      end
    end
  end
end
