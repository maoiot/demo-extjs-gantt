class Dependency < ActiveRecord::Base
  # as json with format { rows: [ dependencies ] }
  # to match desired format for ExtJS TreeStore
  def self.json(deps)
    deps.map do |dep|
      {
          :Id => dep.id,
          :From => dep.From,
          :To => dep.To,
          :Type => dep.Type
      }
    end
  end
end
