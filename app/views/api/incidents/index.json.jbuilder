json.array! @incidents do |incident|
  json.merge! incident.as_json(
                except: %i[id created_at updated_at organization_id],
              )

  json.duration incident.duration
end
