class Message < ActiveRecord::Base
  belongs_to :house
  belongs_to :sender,
    class_name: "User",
    primary_key: :id,
    foreign_key: :user_id
end
