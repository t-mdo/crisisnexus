class AddAssignedToAndDeadlineAtToNextStepActions < ActiveRecord::Migration[7.0]
  def change
    add_reference :next_step_actions, :assigned_to, null: true, foreign_key: { to_table: :accounts }
    add_column :next_step_actions, :deadline_at, :datetime
  end
end
