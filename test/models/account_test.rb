require 'test_helper'

class AccountTest < ActiveSupport::TestCase
  test 'account should have a valid email' do
    account = Account.new
    assert_not account.valid?

    account = Account.new(email: 'crap@crap@crap')
    assert_not account.valid?

    account = Account.new(email: 'tmo@crisisnexus.com')
    assert account.valid?
  end

  test 'account should have a valid phone number' do
    account = Account.new(email: 't@t.com')
    assert account.valid?

    account = Account.new(email: 't@t.com', phone_number: '637799194')
    assert_not account.valid?
    assert_equal 'is invalid', account.errors[:phone_number].first

    account = Account.new(email: 't@t.com', phone_number: '0637799194')
    assert_not account.valid?
    assert_equal 'is invalid', account.errors[:phone_number].first

    account = Account.new(email: 't@t.com', phone_number: '+33637799194')
    assert account.valid?
  end
end
