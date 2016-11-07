Rails.application.routes.draw do
  # Startpage
  root 'application#index'

  # Resource routes (maps HTTP verbs to controller actions automatically):
  resources :tasks
  resources :dependencies
end
