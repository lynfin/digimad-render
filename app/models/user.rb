class User < ApplicationRecord
  has_many :favorites
  has_many :destinations, through: :favorites
  has_many :visits
  has_many :destinations, through: :visits
  has_many :speedtests, through: :visits
  belongs_to :address
  validates :firstname, :lastname, presence: true
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, email: true
  validates :image, http_url: true, allow_nil: true
end