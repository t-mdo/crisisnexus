class SmsNotification < ApplicationRecord
  belongs_to :organization
  belongs_to :account
  belongs_to :incident

  validates :body, presence: true
end
