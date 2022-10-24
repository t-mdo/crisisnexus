require 'test_helper'

class OrganizationTest < ActiveSupport::TestCase
  test 'organization should have a valid url as war room' do
    organization =
      Organization.new(
        name: 'Test Organization',
        war_room_url: 'https://meet.google.com/xyz-abcd-zyx',
      )
    assert organization.valid?

    organization =
      Organization.new(
        name: 'Test Organization',
        war_room_url: 'slack://slack.com/channel',
      )
    assert organization.valid?

    organization =
      Organization.new(name: 'Test Organization', war_room_url: 'crapcrap')
    assert_not organization.valid?
  end
end
