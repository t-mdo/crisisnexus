class SorceryResetPassword < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :reset_password_token, :string, default: nil
    add_column :accounts, :reset_password_token_expires_at, :datetime, default: nil
    add_column :accounts, :reset_password_email_sent_at, :datetime, default: nil
    add_column :accounts, :access_count_to_reset_password_page, :integer, default: 0

    add_index :accounts, :reset_password_token
  end
end
