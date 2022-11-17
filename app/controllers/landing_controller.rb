class LandingController < ApplicationController
  def index
    track_event('landing_page_viewed')
  end

  def pricing; end

  def contact; end
end
