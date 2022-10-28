class Accounts::ActivationsController < ApplicationController
  layout 'landing'

  before_action :set_account, only: %i[show]

  def show
    @account.activate!
    auto_login(@account)
    redirect_to root_path, flash: { success: 'Your account was activated successfully' }
  end

  def new
    @email = flash[:email]
    redirect_to root_path if current_account.present?
    redirect_to welcome_path if @email.blank?
  end

  private

  def set_account
    @account = Account.load_from_activation_token(params[:key])
    render redirect_to root_path, flash: { error: 'The activation of your account failed' } if @account.blank?
  end
end
