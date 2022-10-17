class IncidentsController < ApiController
  def create
    incident = Incident.create(params[:incident])
    if incident.persisted?
      render json: { id: incident.id }
    else
      render json: { errors: incident.errors }, status: :unprocessable_entity
    end
  end
end
