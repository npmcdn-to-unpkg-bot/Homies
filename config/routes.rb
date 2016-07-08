Rails.application.routes.draw do
  root "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :houses, only: [:edit, :create, :show, :update, :index]
    resources :lists, only: [:index, :create, :show, :update]
    resources :list_items, only: [:create, :update]
    resources :users, only: [:create, :update]
    resources :messages, only: [:create, :index]
    resources :events, only: [:create, :index, :destroy]
    resources :bills, only: [:create, :index, :destroy, :update]
    get 'bills/urgent' => 'bills#urgent'
    get 'bills/thisMonth' => 'bills#this_month'
    get 'events/upcomingThisMonth' => 'events#upcoming_this_month'
    resource :session, only: [:create, :destroy, :show]
  end
end
