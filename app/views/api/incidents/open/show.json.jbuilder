json.merge! @open_incident.as_json(
              except: %i[id organization_id creator_id created_at updated_at],
            )

creator = @open_incident.creator
json.creator { json.email creator.email }
