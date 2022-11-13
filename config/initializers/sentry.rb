Sentry.init do |config|
  config.dsn = 'https://2d827c9adaf24147a63e9a2aa1aeb14a@o191897.ingest.sentry.io/4504141786120192'
  config.breadcrumbs_logger = %i[active_support_logger http_logger]
  config.traces_sample_rate = 1.0
  config.enabled_environments = %w[production]
end
