Rails.application.routes.draw do
  
  get '/pricing', to: 'landing#pricing'
  get '/contact', to: 'landing#contact'
  root "landing#index"
end
