class Api::BillsController < ApplicationController
  def index
    @bills = current_user.bills
    render "api/bills/show"
  end

  def urgent
    @bills = current_user.bills.due_this_month.not_paid
    render "api/bills/show"
  end

  def this_month
    @bills = current_user.bills.due_this_month
    render "api/bills/show"
  end

  def update
    @bill = Bill.find(params[:id])
    if @bill.update(:completed => params[:bill][:completed])
      render "api/bills/single_bill"
    end
  end

  def create
    first_render = true
    params[:bill][:users].each do |user_id|
      @bill = User.find(user_id).bills.new(description: params[:bill][:description],
                     amount: params[:bill][:amount],
                     due_date: params[:bill][:due_date])
      if @bill.save && first_render
        first_render = false
        render "api/bills/single_bill"
      end
    end
  end
end
