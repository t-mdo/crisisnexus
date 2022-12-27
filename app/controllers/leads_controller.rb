class LeadsController < ApplicationController
  before_action :set_email
  before_action :redirect_if_lead_already_exists
  before_action :redirect_if_email_has_an_account

  def create
    Lead.create!(email: @email)

    redirect_to '/', flash: { success: 'Thanks for your interest! You will receive an email from us very soon' }
  end

  private

  def redirect_if_lead_already_exists
    return unless Lead.find_by(email: @email)

    redirect_to '/', flash: { success: 'Your request was taken into account. Check your emails!' }
  end

  def redirect_if_email_has_an_account
    return unless Account.find_by(email: @email)

    redirect_to '/login', flash: { warning: 'You already have an account.' }
  end

  def set_email
    @email = params.require(:email)
  end
end
