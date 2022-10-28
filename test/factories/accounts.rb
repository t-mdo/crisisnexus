FactoryBot.define do
  factory :account do
    email { Faker::Internet.unique.email }
    password { 'password' }
    phone_number { "+336#{Faker::Number.number(digits: 8)}" }
    organization

    after(:create) do |account|
      account.activate!
    end
  end
end
