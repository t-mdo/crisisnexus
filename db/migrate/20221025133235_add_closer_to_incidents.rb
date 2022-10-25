class AddCloserToIncidents < ActiveRecord::Migration[7.0]
  def change
    add_reference :incidents,
                  :closer,
                  null: true,
                  foreign_key: {
                    to_table: :accounts,
                  }
  end
end
