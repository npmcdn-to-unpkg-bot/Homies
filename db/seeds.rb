# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
House.create!(name: "House 1")
User.create!(username: "pyo", f_name: "Paul", l_name: "Okuda", password: "secret", house_id: 1)
Bill.create(description: "First bill", due_date: Date.new, amount: 15.66)
UserBill.create(user_id: 1, bill_id: 1)
