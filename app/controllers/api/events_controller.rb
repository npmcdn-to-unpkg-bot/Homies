class Api::EventsController < ApplicationController
  def index
    @events = Event.all
  end

  def upcoming_this_month
    @events = Event.all.upcoming.this_month.order('start_date')
    render "api/events/index"
  end

  def create
    @event = Event.new(:name => params[:evnt][:name],
                       :start_date => params[:evnt][:start_date],
                       :end_date => params[:evnt][:end_date])
    @event.creator = current_user
    @event.house = current_user.house
    if @event.save!
      render "api/events/show"
    end
  end

  def destroy
    @event = Event.find(params[:id])
    if @event.destroy!
      render "api/events/show"
    end
  end
end
