class Api::RoleEnrollmentsController < ApiController
  before_action :set_role_enrollment

  def destroy
    @role_enrollment.destroy
    head :ok
  end

  private

  def set_role_enrollment
    @role_enrollment = RoleEnrollment.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render status: :not_found, json: { errors: ['Role enrollment not found'] }
  end
end
