class RootController < ApplicationController
  def index
    return redirect_to welcome_path unless logged_in?
  end
end
