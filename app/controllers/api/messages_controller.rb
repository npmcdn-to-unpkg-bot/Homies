class Api::MessagesController < ApplicationController
  def index
    @messages = current_user.house.messages
    render "api/messages/index"
  end

  def create
    @message = Message.new(message_params)
    @message.user_id = current_user.id
    @message.house = current_user.house
    if @message.save
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
