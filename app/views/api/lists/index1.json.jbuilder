@lists.each do |list|
  json.set! list.id do
    json.partial! 'list1', list: list
  end
end
