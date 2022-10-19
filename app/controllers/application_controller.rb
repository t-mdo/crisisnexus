class ApplicationController < ActionController::Base
  protected

  def current_organization
    @current_organization ||= current_user&.organization
  end
end
