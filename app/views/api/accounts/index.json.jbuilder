json.accounts do
  json.array! @accounts do |account|
    json.partial! 'api/models/account', account:
  end
end
