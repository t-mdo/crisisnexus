class RoleDesignator < ApplicationService
  def initialize(organization:)
    @organization = organization
  end

  def designate_enrollment_for_incident_manager_role
    designate_enrollment_for_role(role_name: :incident_manager)
  end

  def designate_enrollment_for_communication_manager_role
    designate_enrollment_for_role(role_name: :communication_manager)
  end

  def designate_enrollment_for_role(role_name:)
    role = Role.find_by!(name: role_name)

    role.role_enrollments
        .where(organization: @organization)
        .order(:last_exercised_at, created_at: :desc)
        .last
  end
end
