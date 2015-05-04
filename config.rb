# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end


set :app_name, data.autotune.title

set :title, data.autotune.title
set :slug, data.autotune.slug
set :meta_description, 'Autotune Image Slider'

set :trailing_slashes, true

activate :directory_indexes

set :share_url, data.autotune.share_url
set :tweet_text, data.autotune.tweet_text


configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets
  set :http_prefix, data.autotune.base_url if data.autotune.base_url
end
