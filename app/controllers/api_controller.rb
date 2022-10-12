class ApiController < ApplicationController
  skip_forgery_protection
  before_action :require_login
end
