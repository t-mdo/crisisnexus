class Api::PostmortemsController < ApiController
  before_action :set_postmortem
  before_action :set_attributes, only: :update

  def show
    @incident = @postmortem.incident
  end

  def update
    @postmortem.update!(@postmortem_attributes)
  rescue ActiveRecord::RecordInvalid => e
    render status: :unprocessable_entity, json: { errors: e.record.errors.full_messages }
  end

  private

  def set_incident
    @incident = current_organization.incidents.find_by(local_id: params[:incident_id])
    return unless @incident.nil?

    render status: :not_found, json: { errors: ['Incident not found'] }
  end

  def set_postmortem
    @postmortem = current_organization.postmortems.find(params.require(:id))
  end

  def set_attributes
    permit_attributes =
      %i[summary impact_who impact_what incident_impact_started_at incident_impact_ended_at
         timeline_text lucky_text unlucky_text five_whys_text]
    @postmortem_attributes = params.require(:postmortem).permit(permit_attributes).compact_blank
  end
end
