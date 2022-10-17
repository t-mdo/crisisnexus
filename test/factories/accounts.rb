FactoryBot.define do
  factory :account do
    email { Faker::Internet.unique.email }
    organization
  end
end
