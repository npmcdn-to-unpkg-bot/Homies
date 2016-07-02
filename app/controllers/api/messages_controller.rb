class Api::MessagesController < ApplicationController
  def index
    @messages = current_user.house.messages
    @user =
    render "api/messages/index"
  end

  def create
    @message = Message.new(message_params)
    @message.sender = current_user
    @message.house = current_user.house
    if @message.save
      Pusher.trigger('message', 'message_created', {})
      render "api/messages/show"
    else
      render json: "wasn't able to create message"
    end
  end

  private
  def message_params
    params.require(:message).permit(:content)
  end
end
