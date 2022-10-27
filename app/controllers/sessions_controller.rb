class SessionsController < ApplicationController
  layout 'landing'

  def new; end

  def create
    if params[:email].blank? || params[:password].blank?
      flash.now[:error] = 'Please enter your email and password'
      return render :new
    end

    user = login(params[:email], params[:password])
    return redirect_to root_path, notice: 'Logged in!' if user.present?

    flash.now[:error] = 'Email or password was invalid'
    render :new
  end

  def destroy
    logout
    redirect_to welcome_path, flash: { success: 'Logged out' }
  end
end
