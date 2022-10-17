class RootController < ApplicationController
  def index
    return redirect_to welcome_path if !logged_in?
  end
end
