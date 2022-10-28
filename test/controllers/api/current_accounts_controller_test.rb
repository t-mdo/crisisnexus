require 'test_helper'

class Api::CurrentAccountsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @account = create(:account, phone_number: nil)
    login_user(@account)
  end

  test '#update updates current account phone number' do
    assert_nil @account.phone_number
    patch current_account_path(params: { account: { phone_number: '+33633779194' } }, format: :json)
    assert_response :success
    assert_equal '+33633779194', @account.reload.phone_number
  end

  test '#update renders error if phone number is invalid' do
    assert_nil @account.phone_number
    patch current_account_path(params: { account: { phone_number: 'crapcrap' } }, format: :json)
    assert_response :unprocessable_entity
    body = response.parsed_body
    assert_nil @account.phone_number
    assert_equal 'Phone number is invalid', body.first
  end

  test '#update does not update email' do
    assert_no_changes '@account.reload.email' do
      patch current_account_path(params: { account: { email: 't@t.com' } }, format: :json)
    end
  end
end
