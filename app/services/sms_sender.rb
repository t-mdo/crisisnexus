class SmsSender
  attr_reader :message, :phone_number

  def initialize(message, phone_number)
    @message = message
    @phone_number = phone_number
  end

  def call
    begin
      client = Twilio::REST::Client.new
      client.messages.create(
        from: Rails.application.credentials.twilio_phone_number,
        to: @phone_number
        body: @message
      )
    rescue Twilio::REST::TwilioError => e
      Rails.logger.error "Twilio Error: #{e.message}"
    end
  end
end
