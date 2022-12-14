require 'test_helper'

class Api::TodosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @account = create(:account)
    @account2 = create(:account, organization: @account.organization)
    @incidents = create_list(:incident, 5, :closed, creator: @account)
    @incidents += create_list(:incident, 5, :closed, creator: @account2)
    @incidents.each do |incident|
      create(:next_step_action, postmortem: incident.postmortem, assigned_to: @account)
      create(:next_step_action, postmortem: incident.postmortem, assigned_to: @account2)
    end
    @incidents << create(:incident, :closed, creator: @account2)
    login_account(@account)
  end

  test '#index renders all todo tasks for current_account' do
    get todos_url format: :json
    assert_response :success

    todos = response.parsed_body['todos']
    todos.keys.each.with_index do |key, index|
      incident = @incidents[index]
      assert_equal "Crisis ##{incident.local_id}: #{incident.name}", key
    end
    todos_array = todos.values.flatten
    assert_equal 15, todos_array.count
    assert_equal 5, todos_array.select { |t| t['type'] == 'postmortem' }.count
    assert_equal 10, todos_array.select { |t| t['type'] == 'next_step_action' }.count
  end
end
