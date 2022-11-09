require 'test_helper'

class Api::Incidents::PostmortemControllerTest < ActionDispatch::IntegrationTest
  setup do
    @account = create(:account)
    @incident = create(:incident, :open, organization: @account.organization)
    @postmortem = create(:postmortem, incident: @incident, assigned_to: @account)
    login_account(@account)
  end

  test '#show renders postmortem' do
    get incident_postmortem_path(@incident, format: :json)
    assert_response :success

    body = response.parsed_body
    body['postmortem'].except('assigned_to', 'created_at', 'updated_at').each do |key, value|
      expected_value = @postmortem.send(key)
      if expected_value.nil?
        assert_nil value
      else
        assert_equal expected_value, value
      end
    end
    assert_equal @account.id, body['postmortem']['assigned_to']['id']
    assert_equal @postmortem.created_at.to_i, Time.parse(body['postmortem']['created_at']).to_i
    assert_equal @postmortem.updated_at.to_i, Time.parse(body['postmortem']['updated_at']).to_i
    binding.pry
  end

  test '#update updates postmortem' do
    params =
      { postmortem: {
        summary: 'summary',
        impact_who: 'impact_who',
        impact_what: 'impact_what',
        incident_impact_started_at: 1.day.ago,
        incident_impact_ended_at: 1.hour.ago,
        timeline_text: 'timeline_text',
        lucky_text: 'lucky_text',
        unlucky_text: 'unlucky_text',
        five_whys_text: 'five_whys_text',
        next_step_actions_attributes: [{ name: 'action1' }, { name: 'action2' }]
      } }

    put incident_postmortem_path(@incident, params:, format: :json)
    assert_response :success

    @postmortem.reload
    params[:postmortem]
      .except(:next_step_actions_attributes, :incident_impact_started_at, :incident_impact_ended_at).each do |key, value|
      assert_equal value, @postmortem.send(key)
    end
    assert_not_nil @postmortem.incident_impact_started_at
    assert_not_nil @postmortem.incident_impact_ended_at
    assert_equal 2, @postmortem.next_step_actions.size
    assert_equal 'action1', @postmortem.next_step_actions.first.name
  end

  test '#update overwrites next step actions' do
    put incident_postmortem_path(@incident, params: { postmortem: { next_step_actions_attributes: [{ name: '1' }] } },
                                            format: :json)
    assert_response :success
    put incident_postmortem_path(@incident, params: { postmortem: { next_step_actions_attributes: [{ name: '2' }] } },
                                            format: :json)
    assert_response :success
    assert_equal 1, @postmortem.reload.next_step_actions.size
  end
end
