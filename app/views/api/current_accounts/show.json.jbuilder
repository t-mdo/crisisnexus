json.account do
  json.email current_account.email
  json.phone_number current_account.phone_number
  json.onboarding_completed current_account.onboarding_completed
end
