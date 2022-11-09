json.postmortem do
  if @postmortem
    json.partial! 'api/models/postmortem', postmortem: @postmortem
  else
    json.nil!
  end
end
