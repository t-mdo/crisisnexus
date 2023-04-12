# Project's vision and meaning
I originally built CrisisNexus on the side as an experimental project, while I focused on finding a co-founder.
I haven't manage to meet the criteria I was expecting for this project, so I dropped the effort.
It's a simple tool, but I'm sure it can proove useful to small companies that want to try to formalize their incident management.

Feel free to reach out if you want have any questions.


# Project's Stack and Tools

## [PostgreSQL](https://www.postgresql.org/)

## [Rails](https://rubyonrails.org/)

[jbuilder](https://github.com/rails/jbuilder): api payload builder\
[sorcery](https://github.com/Sorcery/sorcery): simple abstraction library for authentication (replacement of Devise)

[factory_bot](https://github.com/thoughtbot/factory_bot_rails): fixture creator framework for rails testing\
[faker](https://github.com/faker-ruby/faker): fake data generator for tests\
[capybara](https://github.com/teamcapybara/capybara): testing API to interact with browser for end-to-end testing\
[cuprite](https://github.com/rubycdp/cuprite) && [selenium-webdriver](https://github.com/SeleniumHQ/selenium/wiki/Ruby-Bindings): webdrivers to control browser for e2e testing\
[minitest](https://github.com/minitest/minitest): rails testing framework (prefered over rspec)\
[minitest-reporters](https://github.com/minitest-reporters/minitest-reporters): better format for minitest outputs\
[webmock](https://github.com/bblimke/webmock): mocks web requests in tests.

[pry-rails](https://github.com/pry/pry-rails): interactive debugger for rails\
[pry-rescue](https://github.com/ConradIrwin/pry-rescue): allows pry to spawn automatically when test is failing (used with env variable)\
[rubocop](https://github.com/rubocop/rubocop): ruby formatter

## [React](https://reactjs.org/)

[react-router-dom](https://reactrouter.com/en/main): client routes management\

[react-hook-form](https://react-hook-form.com/): hook library to handle form\
[yup](https://github.com/jquense/yup): form validation library\

[headless-ui](https://headlessui.com/): headless re-usable component for tailwindcss\
[classnames](https://www.npmjs.com/package/classnames): helper package to compose className prop\
[prettier](https://prettier.io/): code formatter

[dayjs](https://day.js.org/): date handling (replacement for momentjs)\

[esbuild](https://esbuild.github.io/): javascript bundler (replacement for webpack)\

[eslint](https://eslint.org/): javascript formatter\

[lodash](https://lodash.com/): utilitary functions\

## [Tailwindcss](https://tailwindcss.com/)
I'm never using anything else to style my apps. Amazing improvement over everything else.

## Others providers

[sentry](https://sentry.io/welcome/)\
[twilio](https://github.com/twilio/twilio-ruby)\
[sendgrid](https://sendgrid.com/)

# Resources & tooling

## Ruby environment

[rbenv](https://github.com/rbenv/rbenv): manager of env for ruby

## Rails init command

To create a new rails project, I use more or less this command:
`rails new . -d postgresql -c tailwind -j esbuild --skip-hotwire`\
Setup everything for rails with tailwind and esbuild.

## Learning resources

[Rails official guides](https://guides.rubyonrails.org/): Amazing doc, everything is in there. Good place to start.\
[Odin project](https://www.theodinproject.com/paths/full-stack-ruby-on-rails): Full course on Ruby and RoR fullstack dev. Looks solid to ramp-up.
