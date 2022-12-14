class Api::TodosController < ApiController
  def index
    @assigned_postmortems_array =
      Postmortem
      .where(assigned_to: current_account)
      .where.not(status: Postmortem::STATUS_PUBLISHED)
      .includes(:incident)
      .map do |postmortem|
        {
          type: 'postmortem',
          incident_local_id: postmortem.incident.local_id,
          incident_name: postmortem.incident.name,
          postmortem_id: postmortem.id
        }
      end

    @assigned_actions_array =
      NextStepAction
      .where(assigned_to_id: current_account)
      .where(completed_at: nil)
      .includes(postmortem: :incident)
      .map do |action|
        {
          type: 'next_step_action',
          incident_local_id: action.postmortem.incident.local_id,
          incident_name: action.postmortem.incident.name,
          postmortem_id: action.postmortem.id,
          action_id: action.id,
          action_name: action.name
        }
      end

    @todos =
      (@assigned_postmortems_array + @assigned_actions_array)
      .group_by { |todo| "Crisis ##{todo[:incident_local_id]}: #{todo[:incident_name]}" }

    render json: { todos: @todos }
  end
end
