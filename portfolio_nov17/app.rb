# ======= requires =======
require "sinatra"
require 'sinatra/activerecord'
require "sinatra/reloader"
# ======= database =======
# set :database, "sqlite3:portfolio.db"
# ======= home =======
get '/' do
	puts "*** home ***"
	erb :home
end

get '/about' do
  puts "*** about ***"
  erb :about
end

get '/portfolio' do
  puts "*** portfolio ***"
  erb :portfolio
end

get '/blog' do
  puts "*** blog ***"
  erb :blog
end
