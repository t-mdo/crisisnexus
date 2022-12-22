class SessionsController < ApplicationController
  layout 'landing'

  def new; end

  def create
    if params[:email].blank? || params[:password].blank?
      return redirect_to login_path, flash: { error: 'Please enter your email and password' }
    end

    login(params[:email], params[:password]) do |user, failure|
      return redirect_to root_path, notice: 'Logged in!' if user.present? && failure.blank?

      case failure
      when :invalid_login
        redirect_to login_path, flash: { error: 'Invalid email or password' }
      when :inactive
        redirect_to login_path, flash: { error: 'You need to activate your account first. Check out your emails' }
      when :invalid_password
        redirect_to login_path, flash: { error: 'Invalid email or password' }
      else
        redirect_to login_path, flash: { error: 'Something went wrong' }
      end
    end
  end

  def destroy
    @ssid = session[:ssid]

    logout
    session[:ssid] = @ssid
    redirect_to welcome_path
  end
end
