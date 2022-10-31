class Api::RoleEnrollmentsController < ApiController
  before_action :set_role, only: %i[create destroy]
  before_action :set_account, only: %i[create destroy]

  def create
    @role_enrollment = RoleEnrollment.create(role: @role, account: @account)
    return head :created if @role_enrollment.persisted?

    render status: :unprocessable_entity, json: { errors: @role_enrollment.errors.full_messages }
  end

  def destroy
    @role_enrollment = RoleEnrollment.find_by(role: @role, account: @account)
    return render :not_found, json: { errors: ['Role enrollment not found'] } unless @role_enrollment

    @role_enrollment.destroy
    head :ok
  end

  private

  def set_role
    @role = Role.find(params[:role_id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ['Role not found'] }, status: :not_found
  end

  def set_account
    @account = Account.find(params[:account_id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ['Account not found'] }, status: :not_found
  end
end
