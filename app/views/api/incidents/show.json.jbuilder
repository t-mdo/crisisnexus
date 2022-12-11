json.incident do
  json.partial! 'api/models/incident', incident: @incident
  json.postmortem do
    json.id @incident.postmortem.id
    json.is_touched @incident.postmortem.touched?
    json.assigned_to @incident.postmortem.assigned_to, partial: 'api/models/account', as: :account
  end
end
