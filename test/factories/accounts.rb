FactoryBot.define do
  factory :account do
    display_name { Faker::Name.unique.name }
    email { Faker::Internet.email(name: display_name) }
    phone_number { "+336#{Faker::Number.number(digits: 8)}" }
    organization
    activation_state { 'active' }
    onboarding_completed { true }

    trait :enrolled_as_incident_manager do
      after(:create) do |account|
        create(:role_enrollment, :incident_manager, account:)
      end
    end

    trait :enrolled_as_communication_manager do
      after(:create) do |account|
        create(:role_enrollment, :communication_manager, account:)
      end
    end
  end
end
