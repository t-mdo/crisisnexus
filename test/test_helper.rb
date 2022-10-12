ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require 'minitest/autorun'
require "rails/test_help"
require "minitest/reporters"
require 'minitest/bang'

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods

  setup do
    pry
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.start
  end

  teardown do
    DatabaseCleaner.clean
  end

  Minitest::Reporters.use!
  parallelize(workers: :number_of_processors)
end
