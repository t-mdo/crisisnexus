class Api::Postmortems::NextStepActionsController < ApiController
  before_action :set_postmortem

  def index
    @next_step_actions = @postmortem.next_step_actions
  end

  private

  def set_postmortem
    @postmortem = current_organization.postmortems.find(params.require(:postmortem_id))
  end
end
