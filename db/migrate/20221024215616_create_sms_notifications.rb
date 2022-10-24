class CreateSmsNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :sms_notifications do |t|
      t.references :organization, null: false, foreign_key: true
      t.references :account, null: false, foreign_key: true
      t.references :incident, null: false, foreign_key: true
      t.text :body

      t.timestamps
    end
  end
end
