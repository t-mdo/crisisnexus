FactoryBot.define do
  factory :role_enrollment do
    account
    role
    organization { account.organization }

    trait :incident_manager do
      role { Role.incident_manager }
    end

    trait :communication_manager do
      role { Role.communication_manager }
    end

    trait :scribe do
      role { Role.scribe }
    end
  end
end
