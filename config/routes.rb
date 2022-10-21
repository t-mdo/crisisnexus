Rails.application.routes.draw do
  # Redirects naked to www in production
  if Rails.env.production?
    match '(*any)',
          to: redirect(subdomain: 'www'),
          via: :all,
          constraints: {
            subdomain: '',
          }
  end

  scope module: :api, constraints: lambda { |req| req.format == :json } do
    resources :incidents, only: %i[index show create update]
  end

  get '/registration', to: 'registrations#new'
  resource :registration, only: %i[create]
  get '/login', to: 'sessions#new'
  resource :sessions, only: %i[create]

  # Only static pages for lp
  get '/welcome', to: 'landing#index'
  get '/pricing', to: 'landing#pricing'
  get '/contact', to: 'landing#contact'

  root 'root#index'
  get '*path',
      to: 'root#index',
      constraints: lambda { |req| req.format == :html }
end
