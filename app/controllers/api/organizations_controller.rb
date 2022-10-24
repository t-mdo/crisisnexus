class Api::OrganizationsController < ApiController
  def show
    @organization = current_organization
  end

  def update
    @organization = current_organization
    attributes = params.permit(:name, :war_room_url)
    updated = @organization.update(attributes)

    if !updated
      return(
        render status: :unprocessable_entity,
               json: {
                 errors: @organization.errors.full_messages,
               }
      )
    end
  end

  private

  def update_war_room_url
  end
end
