class TestsController < ApplicationController
  before_action :raise_if_not_test_env
  before_action :set_account, only: %i[login]

  def login
    auto_login(@account)
    head :ok
  end

  private

  def raise_if_not_test_env
    raise 'This controller should not be accessible outside of the test env' unless Rails.env.test?
  end

  def set_account
    @account = Account.find(params.require(:account))
  end
end
