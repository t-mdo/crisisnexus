class PasswordResetsController < ApplicationController
  layout 'landing'
  before_action :set_token_and_user, only: %i[edit update]

  def new; end

  def create
    @account = Account.find_by_email(params[:email])
    redirect_to new_password_reset_path, flash: { alert: 'No user found with that email' } if @account.nil?

    @account.deliver_reset_password_instructions!
    redirect_to root_path, flash: { success: 'Instructions have been sent to your email' }
  end

  def edit; end

  def update
    if @account.change_password(params[:password])
      redirect_to root_path, flash: { success: 'Password was successfully updated' }
    else
      redirect_to root_path, flash: { error: "Password update couldn't proceed. Contact the support" }
    end
  end

  private

  def set_token_and_user
    @token = params[:token]
    @account = Account.load_from_reset_password_token(@token)
    redirect_to root_path if @account.blank?
  end
end
