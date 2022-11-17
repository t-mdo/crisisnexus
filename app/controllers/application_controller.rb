class ApplicationController < ActionController::Base
  include TrackEvents

  protected

  def current_account
    current_user
  end

  def current_organization
    @current_organization ||= current_account&.organization
  end
end
