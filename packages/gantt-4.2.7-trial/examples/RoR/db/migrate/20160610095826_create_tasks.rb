class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :Name
      t.datetime :StartDate
      t.integer :Duration
      t.string :DurationUnit
      t.integer :ParentId

      t.timestamps null: false
    end
  end
end
