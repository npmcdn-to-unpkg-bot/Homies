class UserBill < ActiveRecord::Base
  belongs_to :user, inverse_of: :user_bills
  belongs_to :bill,
    class_name: "Bill",
    primary_key: :id,
    foreign_key: :bill_id,
    inverse_of: :user_bills
end
