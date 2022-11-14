ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'minitest/reporters'
require 'webmock/minitest'
require 'pry-rescue/minitest' if ENV['PRY_RESCUE']
Dir[Rails.root.join('test', 'test_helpers', '**', '*.rb')].each { |file| require file }

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods

  teardown do
    ActionMailer::Base.deliveries.clear
  end

  Minitest::Reporters.use!
  WebMock.disable_net_connect!(
    allow_localhost: true,
    allow: 'chromedriver.storage.googleapis.com'
  )

  parallelize(workers: :number_of_processors)

  protected

  def login_account(account)
    post tests_login_path(params: { account: })
  end

  def login_as(account:, path: '/')
    visit tests_login_path(params: { account:, redirect_to: path })
  end
end

require 'database_cleaner_support'
