json.name action.name
json.assigned_to action.assigned_to, partial: 'api/models/account', as: :account
json.due_at action.due_at.strftime('%Y-%m-%d')
