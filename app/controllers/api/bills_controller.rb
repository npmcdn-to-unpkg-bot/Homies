class Api::BillsController < ApplicationController
  def index
    @bills = current_user.bills
    render "api/bills/show"
  end

  def create
    @bills = []
    params[:bill][:users].each do |user_id|
      bill = User.find(user_id).bills.new(description: params[:bill][:description],
                     amount: params[:bill][:amount],
                     due_date: params[:bill][:due_date])
      if bill.save
        @bills << bill
      end
    end
    render "api/bills/show"
  end
end
