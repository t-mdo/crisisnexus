class IncidentBatchSmsSender < ApplicationService
  attr_accessor :incident

  def initialize(incident:)
    @incident = incident
  end

  def call
    accounts_to_notify = @incident.organization.accounts.where.not(phone_number: nil)
    accounts_to_notify.each do |account|
      result =
        SmsSender.call(
          phone_number: account.phone_number,
          body: @incident.sms_notification_body
        )
      SmsNotification.create(
        organization: account.organization,
        account:,
        incident: @incident,
        body: @incident.sms_notification_body,
        success: result[:success],
        error_message: result[:error_message]
      )
    end
  end
end
