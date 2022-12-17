FactoryBot.define do
  factory :postmortem do
    incident
    association :assigned_to, factory: :account
    summary { nil }
    impact_who { nil }
    impact_what { nil }
    incident_impact_started_at { nil }
    incident_impact_ended_at { nil }
    timeline_text { nil }
    lucky_text { nil }
    unlucky_text { nil }
    five_whys_text { nil }

    trait :completed do
      summary { Faker::Company.catch_phrase }
      impact_who { Faker::Company.profession }
      impact_what { Faker::Company.bs }
      incident_impact_started_at { Faker::Time.between(from: 1.year.ago, to: 1.day.ago) }
      incident_impact_ended_at do
        Faker::Time.between(from: incident_impact_started_at, to: incident_impact_started_at + 2.hours)
      end
      timeline_text { Faker::Lorem.paragraph_by_chars(number: 1000) }
      lucky_text { Faker::Lorem.paragraph_by_chars(number: 200) }
      unlucky_text { Faker::Lorem.paragraph_by_chars(number: 200) }
      five_whys_text { Faker::Lorem.paragraph_by_chars(number: 1000) }
    end
  end
end
