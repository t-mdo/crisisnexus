require 'test_helper'

class PostmortemTest < ActiveSupport::TestCase
  test 'touched?' do
    postmortem = create(:postmortem)
    assert_not postmortem.touched?
    postmortem.update!(summary: 'summary')
    assert postmortem.touched?
  end
end
