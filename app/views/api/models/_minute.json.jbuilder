json.who minute.who
json.what minute.what
json.recorded_by do
  json.partial! 'api/models/account', account: minute.recorded_by
end
json.created_at minute.created_at
