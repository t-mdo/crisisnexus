FactoryBot.define do
  factory :postmortem do
    assigned_to { nil }
    incident { nil }
    summary { "MyText" }
    impact_who { "MyText" }
    impact_what { "MyText" }
    incident_impact_started_at { "2022-11-09 00:14:03" }
    incident_impact_ended_at { "2022-11-09 00:14:03" }
    timeline_text { "MyText" }
    lucky_text { "MyText" }
    unlucky_text { "MyText" }
    five_whys_text { "MyString" }
  end
end
