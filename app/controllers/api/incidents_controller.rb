class Api::IncidentsController < ApiController
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
