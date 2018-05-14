class CategoriesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        render json: Category.all
    end

    def show
        render json: Category.find(params["id"])
    end

    def create
        render json: Category.create(params["category"])
    end

    def update
        render json: Category.update(params["id"],params["category"])
    end

    def delete
        render json: Category.delete(params["id"])
    end

    def finduser
        render json: Category.findusercat(params["userid"])
    end

    def catquery
        render json: Category.returncats(params["query"])
    end
end
