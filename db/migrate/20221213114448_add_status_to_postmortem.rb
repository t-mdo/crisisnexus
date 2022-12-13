class AddStatusToPostmortem < ActiveRecord::Migration[7.0]
  def change
    add_column :postmortems, :status, :string, default: 'draft'
  end
end
