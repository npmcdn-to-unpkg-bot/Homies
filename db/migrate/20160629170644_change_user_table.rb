class ChangeUserTable < ActiveRecord::Migration
  def change
    change_column :users, :house_id, :integer, null: true
  end
end
