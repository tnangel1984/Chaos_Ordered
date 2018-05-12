Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
# #This says that whenever a user visits /people, use the Article controller and use the index "action" (or method).
#get('/articles', {:to=> articles.index()})
    get '/articles', to: 'articles#index'
    get '/articles/:id', to: 'articles#show'
    post '/articles', to: 'articles#create'
    put '/articles/:id', to: 'articles#update'
    delete '/articles/:id', to: 'articles#delete'
    get 'articleduplicates/:title', to: 'articles#duplicates'

    get '/users', to: 'users#index'
    get '/users/:id', to: 'users#show'
    post 'users', to: 'users#create'
    put '/users/:id', to: 'users#update'
    delete '/users/:id', to: 'users#delete'

    get '/categories', to: 'categories#index'
    get '/categories/:id', to: 'categories#show'
    post '/categories', to: 'categories#create'
    put '/categories/:id', to: 'categories#update'
    delete '/categories/:id', to: 'categories#delete'

    get '/joins', to: 'joins#index'
    get '/joins/:id', to: 'joins#show'
    post '/joins', to: 'joins#create'
    put '/joins/:id', to: 'joins#update'
    delete '/joins/:id', to: 'joins#delete'
end
