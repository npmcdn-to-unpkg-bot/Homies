class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.string :description, null: false
      t.datetime :due_date, null: false
      t.boolean :completed, default: false
      t.float :amount, null: false
      t.integer :user_id, null: false
      t.timestamps null: false
    end
  end
end
