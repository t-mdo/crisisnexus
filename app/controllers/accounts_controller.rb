class AccountsController < ApplicationController
  layout 'landing'

  before_action :set_account_for_creation, only: %i[create]
  before_action :set_organization_for_creation, only: %i[create]
  before_action :set_account_for_activation, only: %i[activate]

  def new; end

  def create
    @account.save
    if @account.persisted?
      auto_login(@account)
      return redirect_to root_path
    end
    redirect_to new_account_path, flash: { error: @account.errors.full_messages.first }
  end

  def activate
    @account.activate!
    redirect_to root_path, flash: { success: 'Your account was activated successfully' }
  end

  private

  def set_account_for_creation
    account_params = params.permit(:email, :password)
    @account = Account.new(account_params)
  end

  def set_organization_for_creation
    @account.organization = Organization.find_organization_from_email(@account.email)
  end

  def set_account_for_activation
    @account = Account.load_from_activation_token(params[:id])
    render redirect_to root_path, flash: { error: 'The activation of your account failed' } if @account.blank?
  end
end
