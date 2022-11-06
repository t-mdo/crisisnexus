require 'test_helper'

class Api::Incidents::MinutesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @account = create(:account)
    @incident = create(:incident, :open, organization: @account.organization)
    login_account(@account)
  end

  test '#index renders list of minutes for incident' do
    create_list(:minute, 10, incident: @incident, recorded_by: @account)

    get incident_minutes_path(@incident.local_id, format: :json)
    assert_response :success

    body = response.parsed_body
    assert_equal 10, body['minutes'].size

    minute = body['minutes'].first
    assert_not_nil minute['who']
    assert_not_nil minute['what']
    assert_not_nil minute['recorded_by']
    assert_not_nil minute['created_at']
  end

  test '#create creates minute' do
    post incident_minutes_path(@incident.local_id, params: { minute: { who: 'TMO', what: "We're back up!" } },
                                                   format: :json)
    assert_response :success

    body = response.parsed_body

    assert_equal body['minute']['who'], 'TMO'
    assert_equal Minute.last.who, 'TMO'
    assert_equal body['minute']['what'], "We're back up!"
    assert_equal Minute.last.what, "We're back up!"
  end
end
