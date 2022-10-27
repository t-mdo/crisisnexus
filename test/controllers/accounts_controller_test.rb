require 'test_helper'

class Api::AccountsControllerTest < ActionDispatch::IntegrationTest
  test '#create creates a new account with no pre-existing org' do
    assert_difference 'Account.count', 1 do
      post account_path(params: { email: 'test@test.com', password: 'test123' }, format: :json)
      assert_response :found
    end

    assert_equal 'test@test.com', Account.last.email
    assert_nil Account.last.organization

    assert_equal Account.last.id, session[:user_id].to_i
  end

  test '#create creates a new account associated to pre-existing org' do
    organization = create(:organization, name: 'Test Org', identifier: 'test.com')
    assert_difference 'Account.count', 1 do
      post account_path(params: { email: 'test@test.com', password: 'test123' }, format: :json)
      assert_response :found
    end

    assert_equal 'test@test.com', Account.last.email
    assert_equal organization, Account.last.organization

    assert_equal Account.last.id, session[:user_id].to_i
  end
end
