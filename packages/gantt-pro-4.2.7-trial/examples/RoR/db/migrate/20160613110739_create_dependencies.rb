class CreateDependencies < ActiveRecord::Migration
  def change
    create_table :dependencies do |t|
      t.integer :From
      t.integer :To
      t.integer :Type

      t.timestamps null: false
    end
  end
end
