class Organization < ApplicationRecord
  has_many :accounts
  has_many :incidents
  has_many :sms_notifications

  validate :war_room_url_is_valid

  def self.find_organization_from_email(email)
    email_domain = email.split('@').last
    Organization.find_by(identifier: email_domain)
  end

  private

  def war_room_url_is_valid
    return if war_room_url.blank?
    return if war_room_url.match?(URI::DEFAULT_PARSER.make_regexp(%w[https http slack]))

    errors.add(:war_room_url, 'must be a valid URL')
  end
end
