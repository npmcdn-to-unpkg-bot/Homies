class List < ActiveRecord::Base
  belongs_to :house
  has_many :list_items
end
