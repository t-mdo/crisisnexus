#!/bin/sh

export RAILS_ENV=production
export NODE_ENV=production

bundle exec rails db:create
bundle exec rails db:migrate
bundle exec rails assets:precompile
rails s -b 0.0.0.0 -p 5001
