FactoryBot.define do
  factory :sms_notification do
    organization { nil }
    account { nil }
    incident { nil }
    body { "MyText" }
  end
end
