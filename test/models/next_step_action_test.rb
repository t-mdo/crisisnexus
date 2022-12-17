require 'test_helper'

class NextStepActionTest < ActiveSupport::TestCase
  setup do
    @postmortem = create(:postmortem)
  end

  test 'name is required' do
    action = NextStepAction.new
    assert_not action.valid?
    assert_equal ["can't be blank"], action.errors[:name]
  end

  test 'due_at must be in the future' do
    action = NextStepAction.new(name: 'name', due_at: 2.days.ago, postmortem: @postmortem)
    assert_not action.valid?
    assert_match(/must be greater than/, action.errors[:due_at].first)
    assert
  end
end
