class SessionsController < ApplicationController
  layout 'landing'

  def new
  end

  def create
    if params[:email].blank? || params[:password].blank?
      flash.now[:error] = 'Please enter your email and password'
      return render :new
    end

    user = login(params[:email], params[:password])
    if user.present?
      redirect_to root_path, notice: 'Logged in!'
    else
      flash.now[:error] = 'Email or password was invalid'
      render :new
    end
  end
end
