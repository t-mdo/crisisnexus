require 'application_system_test_case'

class IncidentsTest < ApplicationSystemTestCase
  test 'visit the homepage and register as lead' do
    visit root_path
    assert_text "Don't let chaos manage incidents for you"
    field = first('input[name="email"]')
    field.set('test@crisisnexus.com')
    submit_button = first('input[type="submit"][value="Get early access"]')
    submit_button.click
    assert_text 'Thanks for your interest! You will receive an email from us very soon'
    field = first('input[name="email"]')
    field.set('test@crisisnexus.com')
    submit_button = first('input[type="submit"][value="Get early access"]')
    submit_button.click
    assert_text 'Your request was taken into account. Check your emails!'
  end

  test "don't register the lead if the email is already associated with an account" do
    @account = create(:account)
    visit root_path

    assert_text "Don't let chaos manage incidents for you"
    field = first('input[name="email"]')
    field.set(@account.email)
    submit_button = first('input[type="submit"][value="Get early access"]')
    submit_button.click
    assert_text 'You already have an account.'
    assert_selector 'input[type="submit"][value="Login"]'
  end
end
