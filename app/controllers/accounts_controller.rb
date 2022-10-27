class AccountsController < ApplicationController
  layout 'landing'

  before_action :set_account_params, only: %i[create]

  def new; end

  def create
    @account = Account.create(@account_params)
    if @account.persisted?
      auto_login(@account)
      return redirect_to root_path
    end
    redirect_to new_account_path, flash: { error: @account.errors.full_messages.first }
  end

  private

  def set_account_params
    @account_params = params.permit(:email, :password)
  end
end
