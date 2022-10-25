json.merge! incident.as_json(
              only: %i[local_id name summary status started_at ended_at],
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
