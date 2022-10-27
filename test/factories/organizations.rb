FactoryBot.define do
  factory :organization do
    name { Faker::Company.name }
    identifier { Faker::Internet.unique.domain_name }
  end
end
