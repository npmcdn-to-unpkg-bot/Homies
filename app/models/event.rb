class Event < ActiveRecord::Base
  belongs_to :house
  belongs_to :creator,
    class_name: "User",
    primary_key: :id,
    foreign_key: :user_id

  # Scope
  scope :chronological, -> { order(start_date: :desc)}
  scope :upcoming, -> { where('start_date >= ?', Date.today) }
  scope :this_month, -> { where(start_date: Time.now.beginning_of_month..Time.now.end_of_month) }
end
