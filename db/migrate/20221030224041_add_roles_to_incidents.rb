class AddRolesToIncidents < ActiveRecord::Migration[7.0]
  def change
    add_reference :incidents, :incident_manager, foreign_key: { to_table: :accounts }
    add_reference :incidents, :incident_manager_sidekick, foreign_key: { to_table: :accounts }
    add_reference :incidents, :scribe, foreign_key: { to_table: :accounts }
    add_reference :incidents, :communication_manager, foreign_key: { to_table: :accounts }
  end
end
