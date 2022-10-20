require 'test_helper'

class Api::Incidents::OpenControllerTest < ActionDispatch::IntegrationTest
  setup do
    @controller = Api::Incidents::OpenController.new
    @account = create(:account)
    @incident = create(:incident, :open, creator: @account)
    login_user(@incident.creator)
  end

  test '#show renders data about currently open incident in organization' do
    get incidents_open_path(format: :json)
    assert_response :success
    assert_equal @incident.local_id, @response.parsed_body['local_id']
  end

  test '#show renders 404 if there is an open incident open in another organization' do
    account2 = create(:account)
    incident2 = create(:incident, :open, creator: account2)

    @incident.status_closed!

    get incidents_open_path(format: :json)
    assert_response :not_found
  end

  test '#show renders 404 when there is no open incident' do
    @incident.status_closed!

    get incidents_open_path(format: :json)
    assert_response :not_found
  end
end
