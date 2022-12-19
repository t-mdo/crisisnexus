json.postmortem do
  if @postmortem
    json.partial! 'api/models/postmortem', postmortem: @postmortem
    json.incident_started_at @incident.started_at
    json.incident_ended_at @incident.ended_at
  else
    json.nil!
  end
end
