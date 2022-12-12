class Api::Postmortems::NextStepActionsController < ApiController
  before_action :set_postmortem
  before_action :set_next_step_action, only: %i[destroy]

  def index
    @next_step_actions = @postmortem.next_step_actions.order(:created_at)
  end

  def create
    @next_step_actions_params =
      params.permit(next_step_actions: %i[id name assigned_to_id due_at])[:next_step_actions].to_a
    @next_step_actions_params.filter! { |action| action[:name].present? }

    @next_step_actions = []

    @next_step_actions_params.each do |action|
      @next_step_actions << if action[:id].present?
                              update_next_step_action(action)
                            else
                              create_next_step_action(action)
                            end
    end
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

  def create_next_step_action(attributes)
    action = @postmortem.next_step_actions.build(attributes)
    return action if action.save

    render status: :unprocessable_entity,
           json: { errors: action.errors.full_messages }
  end

  def update_next_step_action(attributes)
    action = @postmortem.next_step_actions.find(attributes[:id])
    return action if action.update(attributes)

    render status: :unprocessable_entity,
           json: { errors: action.errors.full_messages }
  end
end
