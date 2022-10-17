ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'minitest/reporters'

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods

  Minitest::Reporters.use!
  parallelize(workers: :number_of_processors)
end

require 'database_cleaner_support.rb'
