class CreateMinutes < ActiveRecord::Migration[7.0]
  def change
    create_table :minutes do |t|
      t.text :who
      t.text :what
      t.references :incident, null: false, foreign_key: true
      t.references :recorded_by, null: false, foreign_key: { to_table: :accounts }

      t.timestamps
    end
  end
end
