# frozen_string_literal: true

require 'database_cleaner/active_record'
require 'active_support/concern'

module DatabaseCleanerSupport
  extend ActiveSupport::Concern

  included do
    setup do
      DatabaseCleaner.start
    end

    teardown do
      DatabaseCleaner.clean
    end
  end
end

DatabaseCleaner.clean_with :truncation
DatabaseCleaner.strategy = :transaction
