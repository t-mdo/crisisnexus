FactoryBot.define do
  factory :incident do
    name { Faker::Company.bs }
    summary { Faker::Lorem.paragraph_by_chars(number: 512) }
    association :creator, factory: :account
    organization { creator.organization }
    status { :closed }
    started_at { Faker::Time.between(from: 1.year.ago, to: 1.day.ago) }
    ended_at { Faker::Time.between(from: started_at, to: started_at + 2.hours) }

    trait :open do
      postmortem { nil }
      status { :open }
      started_at { Faker::Time.between(from: 2.hours.ago, to: 5.minutes.ago) }
      ended_at { nil }
    end

    trait :closed do
      status { :closed }
      closer { creator }
      after(:create) do |incident|
        create(:postmortem, incident:, assigned_to: incident.creator)
      end
    end

    trait :postmortem_published do
      status { :postmortem_published }
    end
  end
end
