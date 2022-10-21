json.open_incident do
  if @open_incident.present?
    json.partial! 'api/incidents/incident', incident: @open_incident
  else
    json.nil!
  end
end
