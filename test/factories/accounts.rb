FactoryBot.define do
  factory :account do
    email { Faker::Internet.unique.email }
    password { 'password' }
    organization
  end
end
