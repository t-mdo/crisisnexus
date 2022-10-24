class SmsSender
  attr_reader :phone_number, :body

  def initialize(message, phone_number)
    @phone_number = phone_number
    @body = body
  end

  def call
    begin
      client = Twilio::REST::Client.new
      client.messages.create(
        from: Rails.application.credentials.twilio_phone_number,
        to: @phone_number
        body: @body
      )
    rescue Twilio::REST::TwilioError => e
      Rails.logger.error "Twilio Error: #{e.message}"
    end
  end
end
