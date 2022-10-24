require 'test_helper'

class Api::OrganizationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @account = create(:account)
    @organization = @account.organization
    login_user(@account)
  end

  test '#update updates organization war_room_url' do
    assert_nil @organization.war_room_url

    patch organization_path(
            params: {
              war_room_url: 'https://meet.google.com/dss-dsss-dss',
            },
            format: :json,
          )

    assert_response :success
    assert_equal 'https://meet.google.com/dss-dsss-dss',
                 @organization.reload.war_room_url
  end

  test '#update renders errors if war_room_url is invalid' do
    patch organization_path(
            params: {
              war_room_url: 'crapcrap/dss-dsss-dss',
            },
            format: :json,
          )

    assert_response :unprocessable_entity
    body = response.parsed_body
    assert_equal 1, body['errors'].size
    assert_equal 'War room url must be a valid URL', body['errors'].first
    assert_nil @organization.reload.war_room_url
  end

  test '#update updates organization name' do
    patch organization_path(params: { name: 'New Name' }, format: :json)

    assert_response :success
    assert_equal 'New Name', @organization.reload.name
  end
end
