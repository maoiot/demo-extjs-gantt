class Task < ActiveRecord::Base
  has_many :children, :class_name => 'Task', :foreign_key => 'ParentId'
  belongs_to :parent, :class_name => 'Task', :foreign_key => 'ParentId'

  # root nodes (ParentId is null) as json tree
  def self.get_root_tree
    roots = Task.where('"tasks"."ParentId" IS NULL')
    Task.json(roots)
  end

  # as json with format { children: [ tasks tree ] }
  # to match desired format for ExtJS TreeStore
  def self.json(tasks)
    {
        :success => true,
        :children => Task.json_tree(tasks)
    }
  end

  # as json tree
  def self.json_tree(tasks)
    tasks.map do |task|
      {
          :Id => task.id,
          :Name => task.Name,
          :StartDate => task.StartDate,
          :Duration => task.Duration,
          :DurationUnit => task.DurationUnit,
          :leaf => task.children.count() == 0,
          :expanded => true,
          :children => task.children.count() == 0 ? nil : Task.json_tree(task.children)
      }
    end
  end
end
