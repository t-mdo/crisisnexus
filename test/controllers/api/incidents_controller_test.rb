require 'test_helper'

class Api::IncidentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @account = create(:account)
    create_list(:incident, 10, :closed, creator: @account)
    create(:incident, :open, creator: @account)
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
    get incidents_path, xhr: true
    assert_response :success
    body = response.parsed_body['incidents']
    assert_equal 11, body.size
    assert_equal 1,
                 body.select { |i| i['status'] == Incident::STATUS_OPEN }.size
    assert_equal 10,
                 body.select { |i| i['status'] == Incident::STATUS_CLOSED }.size
    body.each { |incident| assert_equal BODY_KEYS, incident.keys.sort }
  end
end
