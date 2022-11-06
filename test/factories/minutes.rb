FactoryBot.define do
  factory :minute do
    who { Faker::Movies::StarWars.character }
    what { Faker::Movies::StarWars.quote }
    incident
    association :recorded_by, factory: :account
  end
end
