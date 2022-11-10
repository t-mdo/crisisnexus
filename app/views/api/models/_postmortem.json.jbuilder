json.summary postmortem.summary
json.impact_who postmortem.impact_who
json.impact_what postmortem.impact_what
json.incident_impact_started_at postmortem.incident_impact_started_at
json.incident_impact_ended_at postmortem.incident_impact_ended_at
json.timeline_text postmortem.timeline_text
json.lucky_text postmortem.lucky_text
json.unlucky_text postmortem.unlucky_text
json.five_whys_text postmortem.five_whys_text
json.created_at postmortem.created_at
json.updated_at postmortem.updated_at
json.is_touched postmortem.touched?
json.assigned_to do
  json.partial! 'api/models/account', account: postmortem.assigned_to
end
json.next_step_actions postmortem.next_step_actions do |action|
  json.name action.name
end
