class AddHouseColumnLists < ActiveRecord::Migration
  def change
    add_column :lists, :house_id, :integer
  end
end
