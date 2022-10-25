json.incidents @incidents do |incident|
  json.partial! 'api/incidents/incident', incident:
end
