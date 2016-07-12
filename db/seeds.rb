# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
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
Bill.create!(description: "Friendship fees", due_date: 1.month.ago, amount: 130.99)
Bill.create!(description: "Using my car", due_date: 15.days.ago, amount: 12.33)

UserBill.create(user_id: 1, bill_id: 1)
UserBill.create(user_id: 1, bill_id: 2)
UserBill.create(user_id: 1, bill_id: 3)
UserBill.create(user_id: 1, bill_id: 4)
UserBill.create(user_id: 1, bill_id: 5)
UserBill.create(user_id: 1, bill_id: 6)
UserBill.create(user_id: 1, bill_id: 7)


Message.create!(content: "hey welcome to the house everyone", user_id: 1, house_id: 1)
Message.create!(content: "anybody hungry?", user_id: 2, house_id: 1)
Message.create!(content: "kind of, I ate a little while ago, but I am down to go anyways", user_id: 3, house_id: 1)
Message.create!(content: "I've got plans, sorry!", user_id: 4, house_id: 1)
Message.create!(content: "cool. let's leave the house in about an hour?", user_id: 2, house_id: 1)
Message.create!(content: "sounds good to me", user_id: 3, house_id: 1)
Message.create!(content: "perfect", user_id: 1, house_id: 1)
Message.create!(content: "btw, I'm going to be out of the house all of this weekend on a trip with my family", user_id: 4, house_id: 1)
Message.create!(content: "thanks for the heads up!", user_id: 1, house_id: 1)
Message.create!(content: "nice, where you going?", user_id: 2, house_id: 1)
Message.create!(content: "Japan!", user_id: 4, house_id: 1)

Event.create!(name: "Paul's friend visiting", user_id: 1, house_id: 1, start_date: 1.day.from_now, end_date: 3.days.from_now)
Event.create!(name: "Birthday party", user_id: 1, house_id: 1, start_date: 12.hours.from_now, end_date: 16.hours.from_now)
Event.create!(name: "Landlord coming", user_id: 2, house_id: 1, start_date: 21.hours.from_now, end_date: 23.hours.from_now)
Event.create!(name: "Pictures with Santa", user_id: 3, house_id: 1, start_date: 48.hours.from_now, end_date: 50.hours.from_now)
Event.create!(name: "TV shopping", user_id: 3, house_id: 1, start_date: 16.hours.from_now, end_date: 20.hours.from_now)

List.create!(title: "Groceries", user_id: 1, house_id: 1)
ListItem.create!(content: "Rice", list_id: 1)
ListItem.create!(content: "Eggs", list_id: 1)
ListItem.create!(content: "Milk", list_id: 1)
ListItem.create!(content: "Chicken", list_id: 1)
ListItem.create!(content: "Cereal", list_id: 1)

List.create!(title: "Rent", user_id: 1, house_id: 1)
ListItem.create!(content: "Paul - 1000", list_id: 2)
ListItem.create!(content: "Michael - 900", list_id: 2)
ListItem.create!(content: "Kevin - 1120", list_id: 2)
ListItem.create!(content: "Rachel - 950", list_id: 2)

List.create!(title: "Paul's chores", user_id: 1, house_id: 1)
ListItem.create!(content: "Eat", list_id: 3)
ListItem.create!(content: "Sleep", list_id: 3)
ListItem.create!(content: "Play ping pong", list_id: 3)
ListItem.create!(content: "Repeat", list_id: 3)

List.create!(title: "4th Of July", user_id: 1, house_id: 1)
ListItem.create!(content: "Fireworks!!", list_id: 4)
ListItem.create!(content: "Food", list_id: 4)
ListItem.create!(content: "Invite people", list_id: 4)

List.create!(title: "Tahoe Trip", user_id: 1, house_id: 1)
ListItem.create!(content: "Wood", list_id: 5)
ListItem.create!(content: "Car", list_id: 5)
ListItem.create!(content: "Clothes", list_id: 5)
ListItem.create!(content: "Bug spray", list_id: 5)
ListItem.create!(content: "Food", list_id: 5)

List.create!(title: "People Coming to Party", user_id: 1, house_id: 1)
ListItem.create!(content: "Martin", list_id: 6)
ListItem.create!(content: "Arty", list_id: 6)
ListItem.create!(content: "Sebastian", list_id: 6)
