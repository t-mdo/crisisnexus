class MakeOrganizationIdNullableOnAccounts < ActiveRecord::Migration[7.0]
  def change
    change_column_null :accounts, :organization_id, true
  end
end
