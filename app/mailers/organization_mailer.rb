class OrganizationMailer < ApplicationMailer
  def organization_registered_internal_email(organization)
    @organization = organization
    @creator_account = organization.accounts.first
    mail to: 'tmo@crisisnexus.com', subject: "CrisisNexus - #{organization.identifier} has registered"
  end
end
