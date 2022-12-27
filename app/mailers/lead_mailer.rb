class LeadMailer < ApplicationMailer
  def internal_lead_creation_email(lead)
    @lead = lead
    mail to: 'tmo@crisisnexus.com', subject: "New Lead registered: #{@lead.email}"
  end
end
