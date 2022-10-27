json.organization do
  if @organization.present?
    json.partial! 'api/organizations/organization', organization: @organization
  else
    json.null!
  end
end
