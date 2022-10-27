class AddOnboardingCompletedToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :onboarding_completed, :boolean, null: false, default: false
  end
end
