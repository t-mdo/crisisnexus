require 'test_helper'

class Api::OrganizationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @account = create(:account)
    @organization = @account.organization
    login_account(@account)
  end

  test '#create creates a new organization' do
    @account.update!(organization: nil)

    assert_difference 'Organization.count', 1 do
      post organization_path(params: { organization: { name: 'Test Org', war_room_url: 'https://meet.google.com/xyz-zzzz-zyx' } },
                             format: :json)
      assert_response :success
    end
    body = response.parsed_body['organization']

    organization = Organization.last
    assert_equal 'Test Org', body['name']
    assert_equal 'Test Org', organization.name
    assert_equal 'https://meet.google.com/xyz-zzzz-zyx', body['war_room_url']
    assert_equal 'https://meet.google.com/xyz-zzzz-zyx', organization.war_room_url

    assert_equal organization.id, @account.reload.organization_id
  end

  test '#create sends an internal email to notify us about the organization creation' do
    @account.update!(organization: nil)

    assert_difference 'ActionMailer::Base.deliveries.size', 1 do
      post organization_path(params: { organization: { name: 'Test Org', war_room_url: 'https://meet.google.com/xyz-zzzz-zyx' } },
                             format: :json)
      assert_response :success
    end

    @organization = Organization.last

    mail = ActionMailer::Base.deliveries.last
    assert_equal "CrisisNexus - #{@organization.identifier} has registered", mail.subject
    assert_equal 'tmo@crisisnexus.com', mail.to.first
  end

  test '#create does not create a new organization if account already has one' do
    old_organization_id = @account.organization_id

    assert_difference 'Organization.count', 0 do
      post organization_path(params: { name: 'Test Org', war_room_url: 'https://meet.google.com/xyz-zzzz-zyx' },
                             format: :json)
      assert_response :forbidden
    end

    assert_equal old_organization_id, @account.reload.organization_id
  end

  test '#update updates organization war_room_url' do
    patch organization_path(
      params: {
        organization: {
          war_room_url: 'https://meet.google.com/dss-dsss-dss'
        }
      },
      format: :json
    )

    assert_response :success
    assert_equal 'https://meet.google.com/dss-dsss-dss',
                 @organization.reload.war_room_url
  end

  test '#update renders errors if war_room_url is invalid' do
    default_war_room_url = @organization.war_room_url

    patch organization_path(
      params: {
        organization: {
          war_room_url: 'crapcrap/dss-dsss-dss'
        }
      },
      format: :json
    )

    assert_response :unprocessable_entity
    body = response.parsed_body
    assert_equal 1, body['errors'].size
    assert_equal 'War room url must be a valid URL', body['errors'].first
    assert_equal default_war_room_url, @organization.reload.war_room_url
  end

  test '#update updates organization name' do
    patch organization_path(params: { organization: { name: 'New Name' } }, format: :json)

    assert_response :success
    assert_equal 'New Name', @organization.reload.name
  end
end
