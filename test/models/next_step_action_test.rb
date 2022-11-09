require 'test_helper'

class NextStepActionTest < ActiveSupport::TestCase
  test 'name is required' do
    action = NextStepAction.new
    refute action.valid?
    assert_equal ["can't be blank"], action.errors[:name]
  end
end
