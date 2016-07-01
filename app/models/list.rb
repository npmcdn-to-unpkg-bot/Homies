class List < ActiveRecord::Base
  belongs_to :user
  belongs_to :house
  has_many :list_items, inverse_of: :list
end
