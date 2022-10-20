class Api::Incidents::OpenController < ApiController
  before_action :set_organization, only: %i[show]

  def show
    @open_incident = @organization.incidents.status_open.first
  end

  private

  def set_organization
    @organization = current_user.organization
  end
end
