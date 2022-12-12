json.id action.id
json.name action.name
if action.assigned_to.present?
  json.assigned_to action.assigned_to, partial: 'api/models/account', as: :account
else
  json.assigned_to nil
end
json.due_at action.due_at
