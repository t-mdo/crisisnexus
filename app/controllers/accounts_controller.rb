class AccountsController < ApplicationController
  layout 'landing'

  before_action :set_account_for_creation, only: %i[create]
  before_action :set_organization_for_creation, only: %i[create]

  def new; end

  def create
    @account.save
    return redirect_to new_account_activation_path, flash: { email: @account.email } if @account.persisted?

    redirect_to new_account_path, flash: { error: @account.errors.full_messages.first }
  end

  private

  def set_account_for_creation
    account_params = params.permit(:email, :password)
    @account = Account.new(account_params)
  end

  def set_organization_for_creation
    @account.organization = Organization.find_organization_from_email(@account.email)
  end
end
