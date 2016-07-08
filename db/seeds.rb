# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'faker'
House.create!(name: "2702 Potrero")
User.create!(username: "pyo", f_name: "Paul", l_name: "Okuda", password: "secret", house_id: 1)
User.create!(username: "mshin", f_name: "Michael", l_name: "Shin", password: "secret", house_id: 1)
User.create!(username: "kevinwan", f_name: "Kevin", l_name: "Wang", password: "secret", house_id: 1)
User.create!(username: "rachelw", f_name: "Rachel", l_name: "Wong", password: "secret", house_id: 1)

Bill.create!(description: "Water bill", due_date: Date.tomorrow, amount: 15.66)
Bill.create!(description: "Recycling", due_date: 3.days.from_now, completed: true, amount: 39.56)
Bill.create!(description: "Gas/parking", due_date: 4.days.from_now, completed: true, amount: 50.32)
Bill.create!(description: "Dish soap", due_date: 3.days.from_now, amount: 5.32)
Bill.create!(description: "Food", due_date: 8.days.from_now, amount: 36.32)

UserBill.create(user_id: 1, bill_id: 1)
UserBill.create(user_id: 1, bill_id: 2)
UserBill.create(user_id: 1, bill_id: 3)
UserBill.create(user_id: 1, bill_id: 4)
UserBill.create(user_id: 1, bill_id: 5)


Message.create!(content: Faker::Superhero.name, user_id: 1, house_id: 1)


Message.create!(content: Faker::Superhero.name, user_id: 2, house_id: 1)

Message.create!(content: Faker::Superhero.name, user_id: 3, house_id: 1)

Message.create!(content: Faker::Superhero.name, user_id: 4, house_id: 1)



Event.create!(name: Faker::Hipster.word, user_id: 1, house_id: 1, start_date: 2.days.from_now, end_date: 3.days.from_now)
