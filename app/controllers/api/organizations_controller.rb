class Api::OrganizationsController < ApiController
  def show
    render json: current_organization.as_json(only: %i[name war_room_url])
  end

  def update
    attributes = params.permit(:name, :war_room_url)
    updated = current_organization.update(attributes)

    if !updated
      return(
        render status: :unprocessable_entity,
               json: {
                 errors: current_organization.errors.full_messages,
               }
      )
    end
    head :ok
  end

  private

  def update_war_room_url
  end
end
