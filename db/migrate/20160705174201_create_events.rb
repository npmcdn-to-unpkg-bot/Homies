class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.string :description
      t.datetime :start_date, null: false
      t.datetime :end_date, null: false
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.integer :user_id, null: false
      t.integer :house_id, null: false
      t.timestamps null: false
    end
  end
end
