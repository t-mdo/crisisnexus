json.role_enrollments do
  json.array! @role_enrollments do |role_enrollment|
    json.id role_enrollment.id
    json.account do
      json.email role_enrollment.account.email
    end
  end
end
