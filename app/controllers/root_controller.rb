class RootController < ApplicationController
  def index
    if !logged_in?
      return redirect_to welcome_path
    end
  end
end
