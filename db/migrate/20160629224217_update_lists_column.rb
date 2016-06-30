class UpdateListsColumn < ActiveRecord::Migration
  def change
    change_column_null :lists, :house_id, false
  end
end
