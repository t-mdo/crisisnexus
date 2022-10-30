class AddRolesToIncidents < ActiveRecord::Migration[7.0]
  def change
    add_reference :incidents, :incident_manager, null: false, foreign_key: { to_table: :accounts }
    add_reference :incidents, :incident_manager_sidekick, null: false, foreign_key: { to_table: :accounts }
    add_reference :incidents, :scribe, null: false, foreign_key: { to_table: :accounts }
    add_reference :incidents, :communication_manager, null: false, foreign_key: { to_table: :accounts }
  end
end
