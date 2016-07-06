class Api::BillsController < ApplicationController
  def index

  end

  def create
    @bill = current_user.bills.new({description: params[:bill][:description],
                                        amount: params[:bill][:amount],
                                        due_date: params[:bill][:dueDate]})
    if @bill.save
      render "api/bills/show"
    end
  end
end
