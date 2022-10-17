class CreateIncidents < ActiveRecord::Migration[7.0]
  def change
    create_table :incidents do |t|
      t.integer :local_id
      t.string :name, null: false
      t.text :summary
      t.string :status, null: false
      t.datetime :started_at, null: false
      t.datetime :ended_at
      t.references :creator, null: false, foreign_key: { to_table: :accounts }

      t.timestamps
    end
  end
end
