class Api::TripsController < ApplicationController

  def index
    @trips = Trip.all
    render json: @trips
  end

  def show
    render json: Trip.find(params[:id])
  end

  def create
  	@trip = Trip.new(trip_params)

  	if @trip.save
  		render json: @trip
  	else
  		render json: { error: "Something went wrong that prohibited this trip from being created." }, status: 500
  	end
  end

  private

  def trip_params
  	params.require(:trip).permit(:title)
  end

end
