class Api::OpenIncidents::RolesController < ApiController
  before_action :set_incident
  before_action :set_role

  def update
    attributes = { @role.name => current_account }
    return if @incident.update(attributes)

    render json: {
      errors: @incident.errors.full_messages
    }, status: :unprocessable_entity
  end

  private

  def set_incident
    @incident = Incident.status_open.first
    return if @incident.present?

    render json: {
      errors: ['No open incident']
    }, status: :not_found
  end

  def set_role
    @role = Role.find_by(name: params[:id])
    return if @role.present?

    render json: {
      errors: ['No role found']
    }, status: :not_found
  end
end
