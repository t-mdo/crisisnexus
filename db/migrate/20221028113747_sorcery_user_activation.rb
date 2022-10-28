class SorceryUserActivation < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :activation_state, :string, default: nil
    add_column :accounts, :activation_token, :string, default: nil
    add_column :accounts, :activation_token_expires_at, :datetime, default: nil

    add_index :accounts, :activation_token
  end
end
