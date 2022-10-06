Rails.application.routes.draw do
  
  get '/registration', to: 'registrations#new'
  resource :registration, only: %i(create)

  # Only static pages for lp
  get '/pricing', to: 'landing#pricing'
  get '/contact', to: 'landing#contact'

  root "landing#index"
end
