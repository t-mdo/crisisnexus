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
    resources :accounts, only: %i[index]
    resources :incidents, only: %i[index show create update] do
      scope module: :incidents do
        resource :status, only: %i[update]
        resources :minutes, only: %i[index create]
      end
    end
    resources :postmortems, only: %i[show update] do
      scope module: :postmortems do
        resources :next_step_actions, only: %i[index create destroy]
        resource :status, only: %i[update]
      end
    end
    resource :open_incident, only: %i[] do
      scope module: :open_incidents do
        resources :roles, only: %i[update]
      end
    end
    resources :todos, only: %i[index update]
    resource :organization, only: %i[show create update]
    resource :current_account, only: %i[show update]
    resources :roles, only: %i[] do
      scope module: :roles do
        resources :enrollments, only: %i[index create]
      end
    end
    resources :role_enrollments, only: %i[destroy]
  end

  # Only static pages for lp
  get '/welcome', to: 'landing#index'
  resource :lead, only: %i[create]
  resource :account, only: %i[new create] do
    scope module: :accounts do
      resource :activation, only: %i[new show]
    end
  end
  get '/login', to: 'sessions#new'
  get '/logout', to: 'sessions#destroy'
  resource :session, only: %i[destroy]
  resource :password_reset, only: %i[new create edit update]

  match '/tests/login', to: 'tests#login', via: %i[get post] if Rails.env.test?

  root 'root#index'
  get '*path',
      to: 'root#index',
      constraints: ->(req) { req.format == :html }
end
