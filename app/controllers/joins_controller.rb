class JoinsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        render json: Join.all
    end

    def show
        render json: Join.find(params["id"])
    end

    def create
        render json: Join.create(params["join"])
    end

    def update
        render json: Join.update(params["id"], params["join"])
    end

    def delete
        render json: Join.delete(params["id"])
    end

    # def duplicates
    #     render json: Join.duplicates(params[":id1", ":id2"])
    # end
end
