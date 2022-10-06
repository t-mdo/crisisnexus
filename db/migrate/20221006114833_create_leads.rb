class CreateLeads < ActiveRecord::Migration[7.0]
  def change
    create_table :leads do |t|
      t.string :email
      t.string :conversion_source

      t.timestamps
    end
  end
end
