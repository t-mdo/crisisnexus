class AddWelcomeMessageDisplayedToOrganizations < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :welcome_message_displayed, :boolean
  end
end
