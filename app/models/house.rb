class House < ActiveRecord::Base
  has_many :lists
  has_many :users
  has_many :messages
  has_many :events
end
