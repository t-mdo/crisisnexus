class RegistrationsController < ApplicationController
  layout 'landing'

  def new
  end

  def create
    email = params.require(:email)
    referrer_params_string = URI.parse(request.referrer).query
    conversion_source =
      if referrer_params_string.present?
        CGI.parse(referrer_params_string)['source']&.first
    Lead.create(email:, conversion_source:)

    redirect_to '/', flash: { success: "We'll keep you posted, sit tight!" }
  end
end
