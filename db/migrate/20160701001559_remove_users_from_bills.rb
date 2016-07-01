class RemoveUsersFromBills < ActiveRecord::Migration
  def change
    remove_column :bills, :user_id, :integer
  end
end
