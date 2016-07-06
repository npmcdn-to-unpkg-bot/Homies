class Bill < ActiveRecord::Base
  has_many :user_bills,
    class_name: "UserBill",
    foreign_key: :bill_id,
    primary_key: :id,
    inverse_of: :bill
  has_many :users, through: :user_bills

  # Scope
  scope :due_this_month, -> { where(due_date: Time.now.beginning_of_month..Time.now.end_of_month) }

end
