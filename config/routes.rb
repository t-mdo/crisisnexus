Rails.application.routes.draw do
  # Redirects naked to www in production
  match '(*any)', to: redirect(subdomain: 'www'), via: :all, constraints: { subdomain: '' } if Rails.env.production?

  scope module: :api do
    resources :incidents, only: %i(create)
  end
  
  get '/registration', to: 'registrations#new'
  resource :registration, only: %i(create)
  get '/login', to: 'sessions#new'
  resource :sessions, only: %i(create)

  # Only static pages for lp
  get '/welcome', to: 'landing#index'
  get '/pricing', to: 'landing#pricing'
  get '/contact', to: 'landing#contact'

  root "root#index"
  get '*path', to: 'root#index', constraints: lambda { |req| req.format == :html }
end
