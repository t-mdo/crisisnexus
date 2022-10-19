FactoryBot.define do
  factory :incident do
    name { Faker::Quote.unique.famous_last_words }
    summary { Faker::Lorem.paragraph_by_chars(number: 512) }
    association :creator, factory: :account
    organization { creator.organization }

    trait :open do
      status { :open }
    end

    trait :closed do
      status { :closed }
    end

    trait :postmortem_published do
      status { :postmortem_published }
    end
  end
end
