require 'test_helper'

class Api::OpenIncidents::RolesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @account = create(:account)
    create(:role_enrollment, account: @account, role: Role.incident_manager)
    create(:role_enrollment, account: @account, role: Role.communication_manager)
    login_account(@account)
  end

  test '#update renders 404 if there is no open incident' do
    put open_incident_role_path(Role.incident_manager.name, format: :json)
    assert_response :not_found
    body = response.parsed_body
    assert_equal 'No open incident', body['errors'].first
  end

  test '#update renders 404 if passed role name is invalid' do
    incident = create(:incident, status: :open)

    assert_nil incident.reload.incident_manager

    put open_incident_role_path('crapcrap', format: :json)
    assert_response :not_found
    body = response.parsed_body
    assert_equal 'No role found', body['errors'].first
    assert_nil incident.reload.incident_manager
  end

  test '#update incident scope is limited to organization' do
    incident = create(:incident, status: :open, creator: create(:account))

    put open_incident_role_path(Role.incident_manager.name, format: :json)
    assert_response :not_found

    body = response.parsed_body
    assert_equal 'No open incident', body['errors'].first
  end

  test '#update set doesnt give the role to current account if not enrolled' do
    former_incident_manager_account = create(:account, organization: @account.organization)
    create(:role_enrollment, account: former_incident_manager_account, role: Role.incident_manager)
    incident = create(:incident, status: :open, creator: @account,
                                 incident_manager: former_incident_manager_account)
    @account.role_enrollments.destroy_all

    assert_equal former_incident_manager_account.id, incident.reload.incident_manager_id

    put open_incident_role_path(Role.incident_manager.name, format: :json)
    assert_response :unprocessable_entity

    body = response.parsed_body
    assert_equal 'Incident manager role cannot be assumed by this account as it is not enrolled', body['errors'].first
    assert_equal former_incident_manager_account.id, incident.reload.incident_manager_id
  end

  test '#update set given role to current account' do
    former_incident_manager_account = create(:account, organization: @account.organization)
    create(:role_enrollment, account: former_incident_manager_account, role: Role.incident_manager)
    incident = create(:incident, status: :open, creator: @account,
                                 incident_manager: former_incident_manager_account)

    assert_equal former_incident_manager_account.id, incident.reload.incident_manager_id

    put open_incident_role_path(Role.incident_manager.name, format: :json)
    assert_response :success

    body = response.parsed_body
    incident.reload
    assert_equal incident.local_id, body['incident']['local_id']
    assert_equal @account.id, incident.incident_manager_id
  end
end
