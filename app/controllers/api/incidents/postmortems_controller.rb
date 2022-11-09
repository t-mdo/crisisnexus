class Api::Incidents::PostmortemsController < ApiController
  before_action :set_incident
  before_action :set_postmortem
  before_action :set_attributes, only: :update

  def show; end

  def update
    @postmortem.next_step_actions.destroy_all
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
    @postmortem = @incident.postmortem
  end

  def set_attributes
    permit_attributes =
      [:summary, :impact_who, :impact_what, :incident_impact_started_at, :incident_impact_ended_at,
       :timeline_text, :lucky_text, :unlucky_text, :five_whys_text, { next_step_actions_attributes: [:name] }]
    @postmortem_attributes = params.require(:postmortem).permit(permit_attributes)
    @postmortem_attributes[:next_step_actions_attributes].filter! { |action| action[:name].present? }
    @postmortem_attributes.compact_blank!
  end
end
