FactoryBot.define do
  factory :organization do
    name { Faker::Company.name }
    war_room_url { 'https://meet.google.com/aro-qmvh-snh' }
    identifier { Faker::Internet.unique.domain_name }
    welcome_message_displayed { true }

    after(:create) do
      role_names = Role.pluck(:name).sort

      create(:role, :communication_manager) unless role_names.include?('communication_manager')
      create(:role, :incident_manager) unless role_names.include?('incident_manager')
      create(:role, :scribe) unless role_names.include?('scribe')
    end
  end
end
