class Api::Postmortems::NextStepActionsController < ApiController
  before_action :set_postmortem
  before_action :set_next_step_action, only: %i[destroy]

  def index
    @next_step_actions = @postmortem.next_step_actions
  end

  def destroy
    return head :ok if @next_step_action.destroy

    render status: :unprocessable_entity, json: { errors: @next_step_action.errors.full_messages }
  end

  private

  def set_postmortem
    @postmortem = current_organization.postmortems.find(params.require(:postmortem_id))
  end

  def set_next_step_action
    @next_step_action = @postmortem.next_step_actions.find(params.require(:id))
  end
end
