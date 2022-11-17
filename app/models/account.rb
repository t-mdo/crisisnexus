class Account < ApplicationRecord
  authenticates_with_sorcery!

  BLACKLISTED_EMAIL_RAW_DOMAINS =
    %w[outlook gmail aol aim yahoo hotmail icloud protonmail zoho yandex titan gmx hubspot].freeze

  belongs_to :organization, optional: true

  has_many :created_incidents, class_name: 'Incident', inverse_of: :creator
  has_many :closed_incidents, class_name: 'Incident', inverse_of: :closer
  has_many :managed_incidents, class_name: 'Incident', inverse_of: :incident_manager
  has_many :sidekicked_incidents, class_name: 'Incident', inverse_of: :incident_manager_sidekick
  has_many :scribed_incidents, class_name: 'Incident', inverse_of: :scribe
  has_many :communication_managed_incidents,
           class_name: 'Incident',
           inverse_of: :communication_manager
  has_many :role_enrollments, dependent: :destroy
  has_many :roles, through: :role_enrollments
  has_many :minutes, inverse_of: :recorded_by
  has_many :postmortem, inverse_of: :assigned_to
  has_many :sms_notifications
  has_many :tracking_events

  validates :email,
            presence: true,
            uniqueness: true,
            format: {
              with: URI::MailTo::EMAIL_REGEXP
            }
  validate :email_domain_is_not_from_a_global_provider
  validates :phone_number,
            phone: { possible: true, allow_blank: true,
                     message: 'is invalid. Please write it to the format +14123456789' }

  before_create :set_default_display_name

  scope :activated, -> { where(activation_state: 'active') }

  def can_manage_incident?
    roles.enrolled_as_incident_manager?
  end

  def can_manage_communication?
    roles.enrolled_as_communication_manager?
  end

  private

  def email_domain_is_not_from_a_global_provider
    return unless email_changed? && email.present?

    domain = email.split('@').last
    email_matches_blacklisted_domain =
      BLACKLISTED_EMAIL_RAW_DOMAINS.any? do |blacklisted_domain|
        domain.match?(blacklisted_domain)
      end
    return unless email_matches_blacklisted_domain

    errors.add(:email,
               'cannot be from a public email provider. Use your work email instead.')
  end

  def set_default_display_name
    self.display_name ||= email.split('@').first
  end
end
