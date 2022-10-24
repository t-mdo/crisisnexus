class Organization < ApplicationRecord
  has_many :accounts
  has_many :incidents

  validate :war_room_url_is_valid

  private

  def war_room_url_is_valid
    return if war_room_url.blank?
    return if war_room_url.match?(URI.regexp(%w[https http slack]))

    errors.add(:war_room_url, 'must be a valid URL')
  end
end
