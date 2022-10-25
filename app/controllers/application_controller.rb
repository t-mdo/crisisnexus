class ApplicationController < ActionController::Base
  protected

  def current_account
    current_user
  end

  def current_organization
    @current_organization ||= current_account&.organization
  end
end
