class TestsController < ApplicationController
  before_action :raise_if_not_test_env
  before_action :set_account, only: %i[get_login login]

  def login
    auto_login(@account)
    if request.post?
      head :ok
    else
      redirect_to params[:redirect_to] || root_path
    end
  end

  private

  def raise_if_not_test_env
    raise 'This controller should not be accessible outside of the test env' unless Rails.env.test?
  end

  def set_account
    @account = Account.find(params.require(:account))
  end
end
