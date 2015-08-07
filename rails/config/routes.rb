Rails.application.routes.draw do

  namespace :api do
    resources :trips
  end

  root "api/trips#index"

end
