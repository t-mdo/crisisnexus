class Account < ApplicationRecord
  authenticates_with_sorcery!
end
