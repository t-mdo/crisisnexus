FactoryBot.define do
  factory :organization do
    name { Faker::Company.unique.name }
  end
end
