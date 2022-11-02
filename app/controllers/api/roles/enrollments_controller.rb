class Api::Roles::EnrollmentsController < ApiController
  before_action :set_role, only: %i[index create]
  before_action :set_account_id, only: %i[create]

  def index
    @role_enrollments = current_organization.role_enrollments.where(role: @role).order(:created_at).includes(:account)
  end

  def create
    @role_enrollment = RoleEnrollment.create(role: @role, account_id: @account_id)
    return head :created if @role_enrollment.persisted?

    render status: :unprocessable_entity, json: { errors: @role_enrollment.errors.full_messages }
  end

  private

  def set_role
    @role = Role.find_by(name: params[:role_id])
    render json: { errors: ['Role not found'] }, status: :not_found if @role.blank?
  end

  def set_account_id
    @account_id = params.require(:enrollment)[:account_id]
    render json: { errors: ['Account_id not provided'] }, status: :unprocessable_entity if @account_id.blank?
  rescue ActionController::ParameterMissing
    render json: { errors: ['Enrollment object not provided'] }, status: :unprocessable_entity if @account_id.blank?
  end
end
