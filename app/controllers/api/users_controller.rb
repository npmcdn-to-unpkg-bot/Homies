class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if !@user.save
      render json: @user.errors, status: 422
    else
      login(@user)
      render :show
    end
  end

  def user_params
    params.require(:user).permit(:f_name, :l_name, :username, :password, :house_id)
  end
end
