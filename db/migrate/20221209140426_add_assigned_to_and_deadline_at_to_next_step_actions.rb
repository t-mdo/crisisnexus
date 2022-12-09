class AddAssignedToAndDeadlineAtToNextStepActions < ActiveRecord::Migration[7.0]
  def change
    add_reference :next_step_actions, :assigned_to, null: true, foreign_key: { to_table: :accounts }
    add_column :next_step_actions, :due_at, :datetime
    add_column :next_step_actions, :completed_at, :datetime
  end
end
