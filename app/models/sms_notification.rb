class SmsNotification < ApplicationRecord
  belongs_to :organization
  belongs_to :account
  belongs_to :incident
end
