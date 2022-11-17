class CreateTrackingEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :tracking_events do |t|
      t.text :ssid
      t.references :account, null: true, foreign_key: true
      t.text :name
      t.text :source

      t.timestamps
    end
  end
end
