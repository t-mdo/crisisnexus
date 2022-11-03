class AddLastExercisedAtToRoleEnrollments < ActiveRecord::Migration[7.0]
  def change
    add_column :role_enrollments, :last_exercised_at, :datetime
  end
end
