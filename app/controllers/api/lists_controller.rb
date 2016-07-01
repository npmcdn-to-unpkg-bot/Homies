class Api::ListsController < ApplicationController
  def index
    @lists = current_user.house.lists
    render "api/lists/index"
  end

  def update
    @list = List.find(params[:id])
    if @list.update(:title => params[:list][:title])
      render "api/lists/show"
    end
  end


end
