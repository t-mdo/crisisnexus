class CreatePostmortems < ActiveRecord::Migration[7.0]
  def change
    create_table :postmortems do |t|
      t.references :assigned_to, null: false, foreign_key: { to_table: :accounts }
      t.references :incident, null: false, foreign_key: true
      t.text :summary
      t.text :impact_who
      t.text :impact_what
      t.datetime :incident_impact_started_at
      t.datetime :incident_impact_ended_at
      t.text :timeline_text
      t.text :lucky_text
      t.text :unlucky_text
      t.string :five_whys_text

      t.timestamps
    end
  end
end
