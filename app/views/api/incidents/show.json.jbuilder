json.incident do
  json.partial! 'api/models/incident', incident: @incident
  json.postmortem do
    if @incident.postmortem
      json.id @incident.postmortem.id
      json.status @incident.postmortem.status
      json.assigned_to @incident.postmortem.assigned_to, partial: 'api/models/account', as: :account
    end
  end
end
