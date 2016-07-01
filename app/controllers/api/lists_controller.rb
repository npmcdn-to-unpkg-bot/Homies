class Api::ListsController < ApplicationController
  def index
    @lists = current_user.house.lists
    render "api/lists/index"
  end

  def create
    
  end


end
