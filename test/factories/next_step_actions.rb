FactoryBot.define do
  factory :next_step_action do
    name { Faker::Company.bs }
    postmortem { nil }
    completed_at { nil }
    assigned_to { nil }
  end
end
