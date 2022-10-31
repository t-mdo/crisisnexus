class CreateRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :roles do |t|
      t.string :name
      t.timestamps
    end

    create_table :role_enrollments do |t|
      t.belongs_to :role, null: false, foreign_key: true
      t.belongs_to :account, null: false, foreign_key: true
      t.belongs_to :organization, null: false, foreign_key: true
      t.timestamps
    end

    add_index :role_enrollments, %i[role_id account_id], unique: true
  end
end
