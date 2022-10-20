class Api::IncidentsController < ApiController
  def index
    @incidents = current_organization.incidents.order(local_id: :desc)
    @incidents = @incidents.where(status: params[:status]) if params[
      :status
    ].present?
    @incidents = @incidents.limit(params[:limit]) if params[:limit].present?
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
