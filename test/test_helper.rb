ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'minitest/reporters'
require 'webmock/minitest'
Dir[Rails.root.join('test', 'test_helpers', '**', '*.rb')].each { |file| require file }

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods

  Minitest::Reporters.use!
  parallelize(workers: :number_of_processors)

  protected

  def login_user(user)
    post tests_login_path(params: { account: user })
  end
end

require 'database_cleaner_support'
