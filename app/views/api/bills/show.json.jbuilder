@bills.each do |bill|
  json.set! bill.id do
    json.partial! 'bill', bill: bill
  end
end
