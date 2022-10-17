class AddOrganizationToAccountsAndIncidents < ActiveRecord::Migration[7.0]
  def change
    add_reference :accounts, :organization, null: false, foreign_key: true
    add_reference :incidents, :organization, null: false, foreign_key: true
  end
end
