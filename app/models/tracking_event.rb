class TrackingEvent < ApplicationRecord
  belongs_to :account, optional: true
end
