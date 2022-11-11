class Api::OrganizationsController < ApiController
  before_action :check_no_current_organization, only: :create

  def show
    @organization = current_organization
  end

  def create
    attributes = params.require(:organization).permit(:name, :war_room_url)
    @organization =
      Organization.create({
                            **attributes,
                            identifier: current_account.email.split('@').last
                          })
    unless @organization.persisted?
      return render status: :unprocessable_entity,
                    json: {
                      errors: @organization.errors.full_messages
                    }
    end
    current_account.update!(organization: @organization)
  end

  def update
    @organization = current_organization
    attributes = params.require(:organization).permit(:name, :war_room_url)
    updated = @organization.update(attributes)

    return if updated

    render status: :unprocessable_entity,
           json: {
             errors: @organization.errors.full_messages
           }
  end

  private

  def check_no_current_organization
    return if current_organization.nil?

    render status: :forbidden,
           json: {
             errors: ['You already belong to an organization']
           }
  end
end
