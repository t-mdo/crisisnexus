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
          id: postmortem.id,
          incident_local_id: postmortem.incident.local_id,
          incident_name: postmortem.incident.name,
          postmortem_id: postmortem.id
        }
      end

    @assigned_actions_array =
      NextStepAction
      .joins(:postmortem)
      .where(assigned_to: current_account)
      .where(completed_at: nil).or(NextStepAction.where('completed_at < ?', 1.week.ago))
      .merge(Postmortem.status_published)
      .includes(postmortem: :incident)
      .map do |action|
        {
          type: 'next_step_action',
          id: action.id,
          incident_local_id: action.postmortem.incident.local_id,
          incident_name: action.postmortem.incident.name,
          postmortem_id: action.postmortem.id,
          action_name: action.name,
          completed_at: action.completed_at
        }
      end

    @todos =
      (@assigned_postmortems_array + @assigned_actions_array)
      .group_by { |todo| todo[:incident_local_id] }

    render json: { todos: @todos }
  end
end
