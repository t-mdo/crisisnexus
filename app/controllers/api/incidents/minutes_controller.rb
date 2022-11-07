class Api::Incidents::MinutesController < ApiController
  before_action :set_incident

  def index
    @minutes = @incident.minutes
  end

  def create
    attributes = params.require(:minute).permit(:who, :what)

    @minute = @incident.minutes.create(**attributes, recorded_by: current_account)
    return if @minute.persisted?

    render status: :unprocessable_entity, json: { errors: @minute.errors.full_messages }
  end

  private

  def set_incident
    @incident = current_organization.incidents.find_by(local_id: params[:incident_id])
    return unless @incident.nil?

    render status: :not_found, json: { errors: ['Incident not found'] }
  end
end
