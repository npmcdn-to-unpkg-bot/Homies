class CreateListItems < ActiveRecord::Migration
  def change
    create_table :list_items do |t|
      t.string :content, null: false
      t.boolean :completed, default: false
      t.integer :list_id, null: false
      t.timestamps null: false
    end
    add_index :list_items, :list_id
  end
end
