class Api::IncidentsController < ApiController
  before_action :set_incident, only: %i[show update]

  def index
    @incidents = current_organization.incidents.order(local_id: :desc)
    @incidents = @incidents.where(status: params[:status]) if params[
      :status
    ].present?
    @incidents = @incidents.limit(params[:limit]) if params[:limit].present?
  end

  def show
  end

  def create
    attributes = params.require(:incident).permit(:name, :summary)
    @incident =
      Incident.create({ **attributes, creator: current_account }.compact_blank)
    unless @incident.persisted?
      return(
        render json: {
                 errors: incident.errors.full_messages,
               },
               status: :unprocessable_entity
      )
    end
    send_sms_notifications
  end

  def update
    attributes = params.require(:incident).permit(:name, :summary, :status)
    updated = @incident.update(attributes)

    return if updated
    render status: :unprocessable_entity,
           json: {
             errors: @incident.errors.full_messages,
           }
  end

  private

  def send_sms_notifications
    body =
      "Crisis started: \"#{@incident.name}\".\nPlease join the war room asap! Godspeed."
    current_organization.accounts.each do |user|
      SmsSender.call(phone_number: user.phone_number, body:)
    end
    SmsNotification.create(
      organization: current_organization,
      account: current_account,
      incident: @incident,
      body:,
    )
  end

  def set_incident
    @incident = current_organization.incidents.find_by(local_id: params[:id])
    head :not_found if @incident.nil?
  end
end
