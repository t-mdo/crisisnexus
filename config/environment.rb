# Load the Rails application.
require_relative 'application'

ActionMailer::Base.smtp_settings = {
  user_name: 'apikey',
  password: Rails.application.credentials.sendgrid_api_key,
  domain: 'crisisnexus.com',
  address: 'smtp.sendgrid.net',
  port: 465,
  authentication: :plain,
  enable_starttls_auto: true,
  tls: ENV['RAILS_ENV'] == 'production'
}

# Initialize the Rails application.
Rails.application.initialize!
