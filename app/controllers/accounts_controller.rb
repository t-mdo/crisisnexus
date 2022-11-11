class AccountsController < ApplicationController
  layout 'landing'

  before_action :set_account_for_creation, only: %i[create]

  def new
    @organization = params[:organization] && Organization.find_by(identifier: params[:organization])
  end

  def create
    @account.save
    return redirect_to new_account_activation_path, flash: { email: @account.email } if @account.persisted?

    redirect_to new_account_path(params: { organization: @organization[:identifier] }),
                flash: { error: @account.errors.full_messages.first }
  end

  private

  def set_account_for_creation
    @organization = params[:organization]
    account_attributes = params.permit(:email, :password)

    account_attributes[:email] += "@#{params[:organization][:identifier]}" if params[:organization].present?
    @account = Account.new(account_attributes)
    @account.organization = Organization.find_organization_from_email(@account.email)
  end
end
