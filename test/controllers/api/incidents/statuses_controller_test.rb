require 'test_helper'

class Api::Incidents::StatusesControllerTest < ActionDispatch::IntegrationTest
  include SmsNotificationsHelper

  setup do
    stub_sms_notification_requests

    @account = create(:account)
    create_list(:incident, 10, :closed, creator: @account)
    login_account(@account)
  end

  test '#update updates open incident status to closed' do
    @open_incident = create(:incident, :open, creator: @account)

    assert_equal Incident::STATUS_OPEN, @open_incident.status
    assert_nil @open_incident.ended_at

    patch incident_status_path(
      @open_incident.local_id,
      params: {
        incident: {
          status: Incident::STATUS_CLOSED
        },
        postmortem: {
          assigned_to: @account.id
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
      patch incident_status_path(
        @open_incident.local_id,
        params: {
          incident: {
            status: Incident::STATUS_CLOSED
          },
          postmortem: {
            assigned_to: @account.id
          }
        },
        format: :json
      )
      assert_response :success
    end

    assert_incident_sms_notications(incident: @open_incident.reload)
  end

  test '#update status close creates a postmortem linked to the incident' do
    @open_incident = create(:incident, :open, creator: @account)

    assert_difference 'Postmortem.count', 1 do
      patch incident_status_path(
        @open_incident.local_id,
        params: {
          incident: {
            status: Incident::STATUS_CLOSED
          },
          postmortem: {
            assigned_to: @account.id
          }
        },
        format: :json
      )
      assert_response :success
    end

    @open_incident.reload
    assert @open_incident.postmortem.present?
    assert_equal @account.id, @open_incident.reload.postmortem.assigned_to_id
  end

  test '#update renders 404 not found when no incident was found' do
    patch incident_status_path(
      100,
      params: {
        incident: {
          status: Incident::STATUS_CLOSED
        },
        postmortem: {
          assigned_to: @account.id
        }
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
