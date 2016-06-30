class Api::ListsController < ApplicationController
  def index
    @lists = current_user.house.lists
    render "api/lists/index1"
  end
end
