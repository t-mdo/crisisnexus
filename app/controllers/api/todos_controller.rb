class Api::TodosController < ApiController
  before_action :set_todo, only: :update

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
      .and(NextStepAction.where(completed_at: nil).or(NextStepAction.where('completed_at > ?', 1.week.ago)))
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
          completed_at: action.completed_at,
          created_at: action.created_at
        }
      end
      .sort_by { |action| action[:created_at] }

    @todos =
      (@assigned_postmortems_array + @assigned_actions_array)
      .group_by { |todo| todo[:incident_local_id] }

    render json: { todos: @todos }
  end

  def update
    if @todo.completed?
      @todo.update(completed_at: nil)
    else
      @todo.update(completed_at: Time.zone.now)
    end
    head :ok
  end

  private

  def set_todo
    @todo = NextStepAction.find(params[:id])
  end
end
