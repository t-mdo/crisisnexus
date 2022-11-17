module TrackEvents
  extend ActiveSupport::Concern

  included do
    before_action :set_ssid
  end

  def track_event(name, **properties)
    TrackingEvent.create!(ssid: session[:ssid], account: current_account, name:, properties:)
  end

  private

  def set_ssid
    session[:ssid] ||= SecureRandom.uuid
  end
end
