Rails.application.routes.draw do
  # Redirects naked to www in production
  if Rails.env.production?
    match '(*any)',
          to: redirect(subdomain: 'www'),
          via: :all,
          constraints: {
            subdomain: ''
          }
  end

  scope module: :api, constraints: ->(req) { req.format == :json } do
    resources :incidents, only: %i[index show create update]
    resource :organization, only: %i[show create update]
    resource :current_account, only: %i[show update]
  end

  resource :lead, only: %i[new create]
  resource :account, only: %i[new create] do
    scope module: :accounts do
      resource :activation, only: %i[new show]
    end
  end
  get '/login', to: 'sessions#new'
  get '/logout', to: 'sessions#destroy'
  resource :session, only: %i[create destroy]

  # Only static pages for lp
  get '/welcome', to: 'landing#index'
  get '/pricing', to: 'landing#pricing'
  get '/contact', to: 'landing#contact'

  post '/tests/login', to: 'tests#login' if Rails.env.test?

  root 'root#index'
  get '*path',
      to: 'root#index',
      constraints: ->(req) { req.format == :html }
end
