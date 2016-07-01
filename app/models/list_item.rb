class ListItem < ActiveRecord::Base
  belongs_to :list, inverse_of: :list_items
end
