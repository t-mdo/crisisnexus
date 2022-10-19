class Api::IncidentsController < ApiController
  def index
    @incidents = current_organization.incidents.order(started_at: :desc)
  end

  def create
    attributes = params.require(:incident).permit(:name, :summary)
    incident =
      Incident.create({ **attributes, creator: current_user }.compact_blank)
    if incident.persisted?
      render json: { id: incident.id }
    else
      render json: {
               errors: incident.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end
end
