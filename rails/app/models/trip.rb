class Trip < ActiveRecord::Base
	validates :title, presence: :true
end
