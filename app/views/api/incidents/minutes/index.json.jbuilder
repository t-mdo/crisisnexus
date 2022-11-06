json.minutes @minutes do |minute|
  json.partial! 'api/models/minute', minute:
end
