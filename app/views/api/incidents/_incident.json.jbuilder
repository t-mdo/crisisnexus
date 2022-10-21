json.merge! incident.as_json(
              only: %i[
                local_id
                name
                summary
                status
                started_at
                ended_at
                duration
              ],
            )
json.creator { json.email incident.creator.email }
