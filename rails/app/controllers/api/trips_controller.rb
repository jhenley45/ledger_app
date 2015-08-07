class Api::TripsController < ApplicationController

  def index
    @trips = Trip.all
    render json: @trips
  end

  def show
    render json: Trip.find(params[:id])
  end

end
