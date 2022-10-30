require 'test_helper'
require 'capybara/cuprite'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  if ENV['HEADLESS'] == 'false'
    driven_by :selenium, using: :chrome, screen_size: [1200, 800]
  else
    driven_by :cuprite, using: :chrome, screen_size: [1200, 800]
  end
end
