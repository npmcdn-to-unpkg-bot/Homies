class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string   :f_name,          null: false
      t.string   :l_name,          null: false
      t.string   :username,        null: false
      t.string   :password_digest, null: false
      t.string   :session_token,   null: false
      t.integer  :house_id,        null: false
      t.timestamps null: false
    end
    add_index "users", ["house_id"], name: "index_users_on_house_id", using: :btree
  end
end
