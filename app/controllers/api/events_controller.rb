class Api::EventsController < ApplicationController
  def index
    @events = current_user.house.events
  end

  def create
    @event = Event.new(:name => params[:evnt][:name],
                       :start_date => params[:evnt][:start_date],
                       :end_date => params[:evnt][:end_date],
                       :start_time => params[:evnt][:start_time],
                       :end_time => params[:evnt][:end_time])
    @event.creator = current_user
    @event.house = current_user.house
    if @event.save!
      render "api/events/show"
    end
  end
end
