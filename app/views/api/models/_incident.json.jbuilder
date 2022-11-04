json.merge! incident.as_json(
  only: %i[local_id name summary status started_at ended_at]
)
json.duration incident.duration
json.creator { json.email incident.creator.email }
json.closer do
  if incident.closer.present?
    json.email incident.closer.email
  else
    json.null!
  end
end
json.incident_manager do
  if incident.incident_manager.present?
    json.email incident.incident_manager.email
  else
    json.null!
  end
end
json.communication_manager do
  if incident.communication_manager.present?
    json.email incident.communication_manager.email
  else
    json.null!
  end
end
json.scribe do
  if incident.scribe.present?
    json.email incident.scribe.email
  else
    json.null!
  end
end
