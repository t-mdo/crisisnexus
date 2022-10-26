require 'test_helper'

class Api::IncidentsControllerTest < ActionDispatch::IntegrationTest
  include SmsNotificationsHelper

  setup do
    stub_sms_notification_requests

    @account = create(:account)
    create_list(:incident, 10, :closed, creator: @account)
    login_user(@account)
  end

  BODY_KEYS = %w[
    closer
    creator
    duration
    ended_at
    local_id
    name
    started_at
    status
    summary
  ].freeze

  test '#index renders all the incidents of the organization' do
    create(:incident, :open, creator: @account)
    get incidents_path(format: :json)
    assert_response :success
    body = response.parsed_body['incidents']
    assert_equal 11, body.size
    assert_equal 1,
                 body.select { |i| i['status'] == Incident::STATUS_OPEN }.size
    assert_equal 10,
                 body.select { |i| i['status'] == Incident::STATUS_CLOSED }.size
    body.each { |incident| assert_equal BODY_KEYS, incident.keys.sort }
  end

  test '#index status open renders data about currently open incident in organization' do
    @open_incident = create(:incident, :open, creator: @account)
    get incidents_path(params: { status: Incident::STATUS_OPEN }, format: :json)
    assert_response :success

    body = @response.parsed_body['incidents']

    assert_equal 1, body.size
    assert_equal @open_incident.local_id, body.first['local_id']
  end

  test '#index status open renders null when there is no open incident' do
    get incidents_path(params: { status: Incident::STATUS_OPEN }, format: :json)
    body = @response.parsed_body['incidents']

    assert_response :success
    assert_equal 0, body.size
  end

  test '#index status open renders null if there is only an open incident open in another organization' do
    account2 = create(:account)
    incident2 = create(:incident, :open, creator: account2)

    get incidents_path(params: { status: Incident::STATUS_OPEN }, format: :json)
    assert_response :success

    body = @response.parsed_body['incidents']

    assert_equal 0, body.size
  end

  test '#index limit renders the specified number of incidents' do
    get incidents_path(params: { limit: 3 }, format: :json)
    assert_response :success

    body = @response.parsed_body['incidents']

    assert_equal 3, body.size
  end

  test '#create creates an incident record' do
    assert_difference 'Incident.count', 1 do
      post incidents_path(params: { incident: { name: 'test' } }, format: :json)
      assert_response :success
    end

    assert_equal 'test', Incident.last.name
    assert_equal 'open', Incident.last.status
  end

  test '#create sends sms notifications to organization users if incident is open' do
    create_list(:account, 3, organization: @account.organization)

    assert_difference 'SmsNotification.count', 4 do
      post incidents_path(params: { incident: { name: 'test' } }, format: :json)
      assert_response :success
    end

    assert_incident_sms_notications(incident: Incident.last)
  end

  test '#create renders 422 if an open incident is already under way' do
    @open_incident = create(:incident, :open, creator: @account)

    assert_difference 'Incident.count', 0 do
      post incidents_path(params: { incident: { name: 'test' } }, format: :json)
      assert_response :unprocessable_entity
    end

    assert_no_incident_sms_notification
  end

  test '#update updates open incident status to closed' do
    @open_incident = create(:incident, :open, creator: @account)

    assert_equal Incident::STATUS_OPEN, @open_incident.status
    assert_nil @open_incident.ended_at

    patch incident_path(
      @open_incident.local_id,
      params: {
        incident: {
          status: Incident::STATUS_CLOSED
        }
      },
      format: :json
    )
    assert_response :success
    body = response.parsed_body['incident']

    @open_incident.reload
    assert_equal @open_incident.local_id, body['local_id']
    assert_equal Incident::STATUS_CLOSED, @open_incident.status
    assert_equal Incident::STATUS_CLOSED, body['status']
    assert_not_nil @open_incident.ended_at
    assert_equal @account.id, @open_incident.closer_id
    assert_not_nil body['ended_at']
  end

  test '#update sends sms notification to organization users if incident is closed' do
    create_list(:account, 3, organization: @account.organization)
    @open_incident = create(:incident, :open, creator: @account)

    assert_equal Incident::STATUS_OPEN, @open_incident.status
    assert_nil @open_incident.ended_at

    assert_difference 'SmsNotification.count', 4 do
      patch incident_path(
        @open_incident.local_id,
        params: {
          incident: {
            status: Incident::STATUS_CLOSED
          }
        },
        format: :json
      )
      assert_response :success
    end

    assert_incident_sms_notications(incident: @open_incident.reload)
  end

  test '#update renders 404 not found when no record was found' do
    patch incident_path(
      100,
      params: {
        status: Incident::STATUS_CLOSED
      },
      format: :json
    )
    assert_response :not_found

    assert_no_incident_sms_notification
  end

  private

  def assert_incident_sms_notications(incident:)
    incident.organization.accounts.each do |account|
      assert_sms_notification_request(body: incident.sms_notification_body, to: account.phone_number)
      sms_notification = SmsNotification.find_by!(incident:, account:)
      assert sms_notification.success
      assert_equal incident.sms_notification_body, sms_notification.body
    end
  end

  def assert_no_incident_sms_notification
    assert_no_sms_notification_request
  end
end
