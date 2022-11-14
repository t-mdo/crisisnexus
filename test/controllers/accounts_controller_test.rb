require 'test_helper'

class AccountsControllerTest < ActionDispatch::IntegrationTest
  test '#create creates a new account with no pre-existing org' do
    assert_difference 'Account.count', 1 do
      post account_path(params: { email: 'test@test.com', password: 'strongpassword1234' }, format: :json)
      assert_response :found
      assert_redirected_to new_account_activation_path
    end

    assert_equal 'test@test.com', Account.last.email
    assert_nil Account.last.organization
  end

  test '#create creates a new account associated to pre-existing org' do
    organization = create(:organization, name: 'Test Org', identifier: 'test.com')
    assert_difference 'Account.count', 1 do
      post account_path(params: { email: 'test@test.com', password: 'strongpassword1234' }, format: :json)
      assert_response :found
      assert_redirected_to new_account_activation_path
    end

    assert_equal 'test@test.com', Account.last.email
    assert_equal organization, Account.last.organization
  end
end
