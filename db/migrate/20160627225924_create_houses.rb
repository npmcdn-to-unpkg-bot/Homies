class CreateHouses < ActiveRecord::Migration
  def change
    create_table :houses do |t|
      t.string :name, null: false
      t.string :street_1
      t.string :street_2
      t.string :city
      t.string :state
      t.string :zip
      t.timestamps null: false
    end
  end
end
