class ApiController < ApplicationController
  skip_forgery_protection
  before_action :require_login

  private

  def not_authenticated
    render json: { error: 'Not authenticated' }, status: :unauthorized
  end
end
