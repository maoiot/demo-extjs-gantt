class DependenciesController < ApplicationController
  def index
    dependencies = Dependency.all
    render :json => Dependency.json(dependencies)
  end
end
