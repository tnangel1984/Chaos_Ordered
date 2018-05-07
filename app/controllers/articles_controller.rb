class ArticlesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        render json: Article.all
    end

    def show
        render json: Article.find(params["id"])
    end

    def create
        render json: Article.create(params["article"])
    end

    def update
        render json: Article.update(params["id"], params["article"])
    end

    def delete
        render json: Article.delete(params["id"])
    end
end
