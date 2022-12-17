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
end
