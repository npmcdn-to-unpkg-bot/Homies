@homies.each do |homie|
  json.set! homie.id do
    json.partial! 'homie', homie: homie
  end
end
