FactoryBot.define do
  factory :account do
    email { Faker::Internet.unique.email }
    phone_number { "+336#{Faker::Number.number(digits: 8)}" }
    organization
    activation_state { 'active' }
    onboarding_completed { true }
  end
end
