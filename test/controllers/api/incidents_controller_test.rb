require 'test_helper'

class Api::IncidentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @account = create(:account)
    create_list(:incident, 10, :closed, creator: @account)
    @open_incident = create(:incident, :open, creator: @account)
    login_user(@account)
  end

  BODY_KEYS = %w[
    creator_id
    duration
    ended_at
    local_id
    name
    started_at
    status
    summary
  ]

  test '#index renders all the incidents of the organization' do
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

  test '#update updates open incident status to closed' do
    assert_equal Incident::STATUS_OPEN, @open_incident.status
    assert_nil @open_incident.ended_at

    patch incident_path(
            @open_incident.local_id,
            params: {
              status: Incident::STATUS_CLOSED,
            },
            format: :json,
          )
    assert_response :success
    body = response.parsed_body['incident']

    assert_equal @open_incident.local_id, body['local_id']
    assert_equal Incident::STATUS_CLOSED, body['status']
    assert_not_nil body['ended_at']
  end

  test '#update renders error when no record was found' do
    patch incident_path(
            100,
            params: {
              status: Incident::STATUS_CLOSED,
            },
            format: :json,
          )
    assert_response :not_found
  end
end
