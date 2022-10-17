class Incident < ApplicationRecord
  belongs_to :creator

  enum :status, { open: 'open', solved: 'solved', post_mortem_published: 'post_mortem_published'}, prefix: true

  validates :status, inclusion: { in: statuses.keys }

  before_create :set_status
  before_create :set_started_at

  private

  def set_started_at
    self.started_at = Time.now.utc
  end

  def set_status
    self.status_open!
  end
end
