class AddUniqueConstraintOnRoleName < ActiveRecord::Migration[7.0]
  def change
    add_index :roles, :name, unique: true
  end
end
