Rails.application.routes.draw do
  root "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :houses, only: [:edit, :create, :show, :update]
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy, :show]
  end
end
