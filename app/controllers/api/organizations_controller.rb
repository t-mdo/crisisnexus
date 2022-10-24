class Api::OrganizationsController < ApiController
  def update
    update_war_room_url if params[:war_room_url].present?
  end

  private

  def update_war_room_url
    updated = current_organization.update(war_room_url: params[:war_room_url])

    if !updated
      return(
        render status: :unprocessable_entity,
               json: {
                 errors: current_organization.errors.full_messages,
               }
      )
    end
  end
end
