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
