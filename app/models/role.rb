class Role < ApplicationRecord
  has_many :role_enrollments
  has_many :accounts, through: :role_enrollments

  validates :name, presence: true, uniqueness: true

  class << self
    def incident_manager
      find_by!(name: :incident_manager)
    end

    def communication_manager
      find_by!(name: :communication_manager)
    end

    def scribe
      find_by!(name: :scribe)
    end

    def enrolled_as_incident_manager?
      exists?(name: :incident_manager)
    end

    def enrolled_as_communication_manager?
      exists?(name: :communication_manager)
    end

    def enrolled_as_scribe?
      exists?(name: :scribe)
    end
  end
end
