class Account < ApplicationRecord
  authenticates_with_sorcery!

  belongs_to :organization
  has_many :incidents, inverse_of: :creator
  has_many :sms_notifications
end
