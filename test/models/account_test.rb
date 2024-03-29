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

  test 'account should have an email that does not come from email providers' do
    account = Account.new(email: 'thibault@gmail.com')
    assert_not account.valid?
    assert_equal 'Email cannot be from a public email provider. Use your work email instead.',
                 account.errors.full_messages.first
  end

  test 'account should have a valid phone number' do
    account = Account.new(email: 't@t.com')
    assert account.valid?

    account = Account.new(email: 't@t.com', phone_number: '637799194')
    assert_not account.valid?
    assert_equal 'is invalid. Please write it to the format +14123456789', account.errors[:phone_number].first

    account = Account.new(email: 't@t.com', phone_number: '0637799194')
    assert_not account.valid?
    assert_equal 'is invalid. Please write it to the format +14123456789', account.errors[:phone_number].first

    account = Account.new(email: 't@t.com', phone_number: '+33637799194')
    assert account.valid?
  end

  test 'sets display name on account creation' do
    account = Account.create(email: 'thibault.miranda@crisisnexus.com')
    assert_equal 'thibault.miranda', account.display_name
  end

  test 'can_manage_incident?' do
    account = create(:account)
    assert_not account.can_manage_incident?
    assert_not account.can_manage_communication?
    create(:role_enrollment, account:, role: Role.incident_manager)
    assert account.can_manage_incident?
    assert_not account.can_manage_communication?
  end

  test 'can_manage_communication?' do
    account = create(:account)
    assert_not account.can_manage_communication?
    assert_not account.can_manage_incident?
    create(:role_enrollment, account:, role: Role.communication_manager)
    assert account.can_manage_communication?
    assert_not account.can_manage_incident?
  end
end
