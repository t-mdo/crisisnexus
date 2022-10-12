class IncidentsController < ApiController
  def create
    Incident.create(params[:incident])
  end
end
