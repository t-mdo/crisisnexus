Rails.application.routes.draw do
  # Redirects naked to www in production
  match '(*any)', to: redirect(subdomain: 'www'), via: :all, constraints: { subdomain: '' } if Rails.env.production?
  
  get '/registration', to: 'registrations#new'
  resource :registration, only: %i(create)

  # Only static pages for lp
  get '/pricing', to: 'landing#pricing'
  get '/contact', to: 'landing#contact'

  root "landing#index"
end
