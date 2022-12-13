class Api::Postmortems::StatusesController < ApiController
  before_action :set_postmortem

  def update
    return head :ok if @postmortem.update(status: params[:status])

    render status: :unprocessable_entity, json: { errors: postmortem.errors.full_messages }
  end

  private

  def set_postmortem
    @postmortem = current_organization.postmortems.find(params.require(:postmortem_id))
  end
end
