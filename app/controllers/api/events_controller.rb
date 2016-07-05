class Api::EventsController < ApplicationController
  def index
    @events = current_user.house.events
  end
end
