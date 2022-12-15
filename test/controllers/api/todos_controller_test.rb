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
    Postmortem.first.status_published!

    get todos_url format: :json
    assert_response :success

    todos = response.parsed_body['todos']

    todos_array = todos.values.flatten
    assert_equal 5, todos_array.count
    assert_equal 4, todos_array.select { |t| t['type'] == 'postmortem' }.count
    assert_equal 1, todos_array.select { |t| t['type'] == 'next_step_action' }.count
  end

  test '#index renders only pending tasks or the ones completed less than a week ago' do
    Postmortem.all.each(&:status_published!)
    next_step_actions = NextStepAction.where(assigned_to: @account)
    next_step_actions.first.update(completed_at: 8.days.ago)
    next_step_actions.second.update(completed_at: 6.days.ago)

    get todos_url format: :json
    assert_response :success

    todos = response.parsed_body['todos']

    todos_array = todos.values.flatten
    assert_equal 9, todos_array.count
    assert_equal 9, todos_array.select { |t| t['type'] == 'next_step_action' }.count
  end
end
