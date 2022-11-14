class AddDisplayNameToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :display_name, :text
  end
end
