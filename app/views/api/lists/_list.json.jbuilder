json.extract! list, :id, :title, :description, :updated_at


json.list_items do
  json.partial! 'api/list_items/list_item', collection: list.list_items, as: :list_item
end
