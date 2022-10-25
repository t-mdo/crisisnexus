class AddSuccessAndErrorMessageToSmsNotification < ActiveRecord::Migration[7.0]
  def change
    add_column :sms_notifications, :success, :boolean
    add_column :sms_notifications, :error_message, :string
  end
end
