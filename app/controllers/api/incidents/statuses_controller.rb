class Api::Incidents::StatusesController < ApiController
  before_action :set_incident

  def update
    @incident_attributes = params.require(:incident).permit(:name, :summary, :status)
    @postmortem_attributes = params.require(:postmortem).permit(:assigned_to)

    close_process if @incident_attributes[:status] == Incident::STATUS_CLOSED
  end

  private

  def close_process
    return if close_incident && create_postmortem

    render status: :unprocessable_entity,
           json: {
             errors: @incident.errors.full_messages
           }
  end

  def close_incident
    @incident.close(**@incident_attributes, closer: current_account)
  end

  def create_postmortem
    @incident.create_postmortem(assigned_to_id: @postmortem_attributes[:assigned_to])
  end

  def set_incident
    @incident = current_organization.incidents.find_by(local_id: params[:incident_id])
    return unless @incident.nil?

    render status: :not_found, json: { errors: ['Incident not found'] }
  end
end
