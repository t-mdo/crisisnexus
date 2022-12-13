require 'test_helper'

class Api::Postmortems::StatusesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @account = create(:account)
    @incident = create(:incident, :open, organization: @account.organization)
    @postmortem = create(:postmortem, incident: @incident, assigned_to: @account)
    login_account(@account)
  end

  test '#update updates postmortem status to published' do
    put postmortem_status_url @postmortem, params: { status: 'published' }, format: :json

    assert_response :success
    assert_equal 'published', @postmortem.reload.status
  end
end
