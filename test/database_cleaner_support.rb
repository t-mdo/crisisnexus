# frozen_string_literal: true

require 'database_cleaner/active_record'
require 'active_support/concern'

module DatabaseCleanerSupport
  extend ActiveSupport::Concern

  included do
    setup { DatabaseCleaner.start }

    teardown { DatabaseCleaner.clean }
  end
end

DatabaseCleaner.clean_with :truncation
DatabaseCleaner.strategy = :transaction
