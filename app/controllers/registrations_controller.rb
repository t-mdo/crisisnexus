class RegistrationsController < ApplicationController
  layout 'landing'

  def new
  end

  def create
    email = params.require(:email)
    referrer_params_string = URI.parse(request.referrer).query
    conversion_source = referrer_params_string.present? ? CGI.parse(referrer_params_string)['source']&.first : nil
    Lead.create(email: email, conversion_source: conversion_source)

    redirect_to '/', flash: { success: "We'll keep you posted, sit tight!"}
  end
end
