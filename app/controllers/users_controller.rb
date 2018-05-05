# class UsersController <ApplicationController
#     skip_before_action :verify_authenticity_token
#
#     def index
#         render json: Users.all
#     end
#
#     def show
#         render json: Users.find(params["id"])
#     end
#
#     def create
#         render json: Users.create(params["user"])
#     end
#
#     def delete
#         render json: Users.delete(params["id"])
#     end
#
#     def update
#         render json: Users.update(params["id"], params["user"])
#     end
#
# end
