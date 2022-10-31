FactoryBot.define do
  factory :role do
    trait :incident_manager do
      name { 'incident_manager' }
    end

    trait :incident_manager_sidekick do
      name { 'incident_manager_sidekick' }
    end

    trait :communication_manager do
      name { 'communication_manager' }
    end

    trait :scribe do
      name { 'scribe' }
    end
  end
end
