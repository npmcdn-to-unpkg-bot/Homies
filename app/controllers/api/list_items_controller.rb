class Api::ListItemsController < ApplicationController
  def create
    @list = List.new(:title => params[:list][:title],
                     :description => params[:list][:description])
    @list.user = current_user
    @list.house = current_user.house
    if @list.save!
      unless params[:list][:list_items].nil?
        params[:list][:list_items].each do |list_item|
          @list_item = ListItem.new(:content => list_item)
          @list_item.list = @list
          @list_item.save!
        end
      end
      render "api/lists/show"
    else
    end
  end

  def update
    @list_item = ListItem.find(params[:id])
    if @list_item.update(:content => params[:item][:content])
      render "api/list_items/show"
    end
  end
end
