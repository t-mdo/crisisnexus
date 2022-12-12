json.next_step_actions @next_step_actions do |action|
  json.partial! 'api/models/next_step_action', action:
end
