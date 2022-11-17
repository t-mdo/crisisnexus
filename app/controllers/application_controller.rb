class ApplicationController < ActionController::Base
  before_action :set_ssid

  protected

  def current_account
    current_user
  end

  def current_organization
    @current_organization ||= current_account&.organization
  end

  private

  def set_ssid
    session[:ssid] ||= SecureRandom.uuid
  end
end
