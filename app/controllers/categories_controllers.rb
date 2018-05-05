# class CategoriesController < ApplicationController
#     skip_before_action :verify_authenticity_token
#
#     def index
#         render json: Categories.all
#     end
#
#     def show
#         render json: Categories.find(params["id"])
#     end
#
#     def create
#         render json: Categories.create(params["category"])
#     end
#
#     def update
#         render json: Categories.update(params["id"],params["category"])
#     end
#
#     def delete
#         render json: Categories.delete(params["id"])
#     end
# end
