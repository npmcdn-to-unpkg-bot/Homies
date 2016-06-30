class House < ActiveRecord::Base
  has_many :lists
  has_many :users
end
