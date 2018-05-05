class ArticlesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        render json: Article.all
    end
end
#     def show
#         render json: Articles.find(params["id"])
#     end
#
#     def create
#         render json: Articles.create(params["article"])
#     end
#
#     def delete
#         render json: Articles.delete(params["id"])
#     end
#
#     def update
#         render json: Articles.update(params["id"], params["article"])
#     end
