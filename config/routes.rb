# config/routes.rb
Rails.application.routes.draw do
  get '/hello', to: 'application#hello_world'

  resources :visits
  resources :users, :favorites, :destinations, :speedtests, :addresses
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get 'destinations/summarize/:id', to: 'destinations#summarize'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
