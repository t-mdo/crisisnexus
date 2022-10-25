class SmsSender < ApplicationService
  attr_accessor :phone_number, :body

  def initialize(phone_number:, body:)
    @phone_number = phone_number
    @body = body
  end

  def call
    return { success: true } if Rails.env.test?
    if @phone_number.blank?
      return { success: false, error_message: 'Phone number is blank' }
    end

    client = Twilio::REST::Client.new
    client.messages.create(
      from: Rails.application.credentials.twilio_phone_number,
      to: @phone_number,
      body: @body,
    )
    { success: true }
  rescue Twilio::REST::TwilioError => e
    Rails.logger.error "Twilio Error: #{e.message}"
    { success: false, error_message: e.message }
  end
end
