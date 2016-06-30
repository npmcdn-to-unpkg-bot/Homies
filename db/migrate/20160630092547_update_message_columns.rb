class UpdateMessageColumns < ActiveRecord::Migration
  def change
    add_column :messages, :house_id, :integer, null: false
  end
end
