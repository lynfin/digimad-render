class Visit < ApplicationRecord
  belongs_to :speedtest, optional: true
  belongs_to :destination
  belongs_to :user
end
