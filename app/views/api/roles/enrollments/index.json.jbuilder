json.role_enrollments do
  json.array! @role_enrollments do |role_enrollment|
    json.id role_enrollment.id
    json.account do
      json.partial! 'api/models/account', account: role_enrollment.account
    end
  end
end
