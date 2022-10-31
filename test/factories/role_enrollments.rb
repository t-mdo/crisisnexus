FactoryBot.define do
  factory :role_enrollment do
    account
    role
    organization { account.organization }
  end
end
