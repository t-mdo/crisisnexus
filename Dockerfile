FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y nodejs npm postgresql-client
RUN npm install -g yarn
WORKDIR /crisisnexus
COPY Gemfile /crisisnexus/Gemfile
COPY Gemfile.lock /crisisnexus/Gemfile.lock
RUN bundle install
RUN yarn

EXPOSE 5001

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]
