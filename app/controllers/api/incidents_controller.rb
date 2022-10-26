class Api::IncidentsController < ApiController
  before_action :set_incident, only: %i[show update]
  after_action :send_sms_notifications, only: %i[create update]

  def index
    @incidents = current_organization.incidents.order(local_id: :desc)
    @incidents = @incidents.where(status: params[:status]) if params[
      :status
    ].present?
    @incidents = @incidents.limit(params[:limit]) if params[:limit].present?
  end

  def show; end

  def create
    attributes = params.require(:incident).permit(:name, :summary)
    @incident =
      Incident.create({ **attributes, creator: current_account }.compact_blank)
    @incident_saved = @incident.persisted?
    return if @incident_saved

    render json: {
             errors: @incident.errors.full_messages
           },
           status: :unprocessable_entity
  end

  def update
    attributes = params.require(:incident).permit(:name, :summary, :status)

    @incident.assign_attributes(attributes)
    @incident.closer = current_account
    @incident_saved = @incident.save

    return if @incident_saved

    render status: :unprocessable_entity,
           json: {
             errors: @incident.errors.full_messages
           }
  end

  private

  def set_incident
    @incident = current_organization.incidents.find_by(local_id: params[:id])
    head :not_found if @incident.nil?
  end

  def send_sms_notifications
    return unless @incident_saved

    IncidentBatchSmsSender.call(incident: @incident)
  end
end
