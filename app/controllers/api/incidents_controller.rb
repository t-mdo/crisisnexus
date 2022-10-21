class Api::IncidentsController < ApiController
  before_action :set_incident, only: %i[update]

  def index
    @incidents = current_organization.incidents.order(local_id: :desc)
    @incidents = @incidents.where(status: params[:status]) if params[
      :status
    ].present?
    @incidents = @incidents.limit(params[:limit]) if params[:limit].present?
  end

  def update
    update_status if params[:status].present?
  end

  def create
    attributes = params.require(:incident).permit(:name, :summary)
    @incident =
      Incident.create({ **attributes, creator: current_user }.compact_blank)
    if !@incident.persisted?
      render json: {
               errors: incident.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  private

  def update_status
    updated = @incident.update(status: params[:status])

    if !updated
      return(
        render status: :unprocessable_entity,
               json: {
                 errors: @incident.errors.full_messages,
               }
      )
    end
  end

  def set_incident
    @incident = current_organization.incidents.find_by(local_id: params[:id])
    head :not_found if @incident.nil?
  end
end
