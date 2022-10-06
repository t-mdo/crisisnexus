class Lead < ApplicationRecord
  validates :email, uniqueness: true
end
