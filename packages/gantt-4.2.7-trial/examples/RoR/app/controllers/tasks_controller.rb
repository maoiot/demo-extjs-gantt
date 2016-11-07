class TasksController < ApplicationController
  def index
    # fetch root tasks (ParentId is null) as json-tree
    tree = Task.get_root_tree
    # render as json
    render :json => tree
  end

  def show
    # ExtJS TreeStore requests root node as 'root'
    if params[:id] == 'root'
      # act as if index was called
      index
    else
      # fetch single task
      task = Task.find(params[:id])
      render :json => task.to_json
      #render :json => tasks.to_json(:only => [:id, :Name, :StartDate, :Duration, :DurationUnit])
    end
  end

end
