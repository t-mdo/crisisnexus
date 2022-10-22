class AddWarRoomUrlToOrganizations < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :war_room_url, :string
  end
end
