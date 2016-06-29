class Api::HousesController < ApplicationController
  def create
    @house = House.new(house_params)
    if @house.save
      current_user.house = @house
      current_user.save
      render "api/houses/show"
    else
    end
  end

  private
  def house_params
    params.require(:house).permit(:name, :street_1, :street_2, :city, :state, :zip)
  end
end
