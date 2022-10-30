FactoryBot.define do
  factory :organization do
    name { Faker::Company.name }
    war_room_url { 'https://meet.google.com/aro-qmvh-snh' }
    identifier { Faker::Internet.unique.domain_name }
  end
end
