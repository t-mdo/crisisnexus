class Api::CurrentAccountsController < ApiController
  helper_method :current_account

  def show; end

  def update
    attributes = params.require(:account).permit(:phone_number, :onboarding_completed)

    return if current_account.update(attributes)

    render status: :unprocessable_entity, json: { errors: current_account.errors.full_messages }
  end
end
