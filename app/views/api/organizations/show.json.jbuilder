json.organization do
  if @organization.present?
    json.name @organization.name
    json.war_room_url @organization.war_room_url
  else
    json.null!
  end
end
