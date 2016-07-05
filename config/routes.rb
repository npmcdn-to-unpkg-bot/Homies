Rails.application.routes.draw do
  root "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :houses, only: [:edit, :create, :show, :update]
    resources :lists, only: [:index, :create, :show, :update]
    resources :list_items, only: [:create, :update]
    resources :users, only: [:create, :update]
    resources :messages, only: [:create, :index]
    resources :events, only: [:create, :index]
    resource :session, only: [:create, :destroy, :show]
  end
end
