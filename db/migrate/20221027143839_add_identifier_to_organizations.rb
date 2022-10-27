class AddIdentifierToOrganizations < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :identifier, :string, null: false
  end
end
