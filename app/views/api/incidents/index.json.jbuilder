json.incidents @incidents do |incident|
  json.partial! 'api/models/incident', incident:
end
