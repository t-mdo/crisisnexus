class Account < ApplicationRecord
  authenticates_with_sorcery!

  belongs_to :organization, optional: true
  has_many :created_incidents, class_name: 'Incident', inverse_of: :creator
  has_many :closed_incidents, class_name: 'Incident', inverse_of: :closer
  has_many :sms_notifications

  validates :email,
            presence: true,
            uniqueness: true,
            format: {
              with: URI::MailTo::EMAIL_REGEXP
            }
  validates :phone_number, phone: { possible: true, allow_blank: true }
end
