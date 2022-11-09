class CreateNextStepActions < ActiveRecord::Migration[7.0]
  def change
    create_table :next_step_actions do |t|
      t.text :name, null: false
      t.references :postmortem, null: false, foreign_key: true

      t.timestamps
    end
  end
end
