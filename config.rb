# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end


set :app_name, data.autotune.title

set :title, data.autotune.title
set :slug, data.autotune.slug
set :meta_description, 'Autotune Image Slider'

set :trailing_slashes, true

activate :directory_indexes

set :share_url, data.autotune.share_url
set :tweet_text, data.autotune.tweet_text

helpers do
  # Remove all theme info to reduce payload
  def autotune_data_without_themes
    # Remove all theme_data
    ret = data.autotune.dup
    ret.delete('theme_data')
    ret
  end
end

# Build-specific configuration
configure :build do
  require 'uri'
  uri = URI(data.autotune.base_url)
  set :absolute_prefix, "#{uri.scheme}://#{uri.host}"

  set :url_prefix, uri.path
  set :http_prefix, data.autotune.base_url

  activate :asset_hash
  activate :minify_javascript
  activate :minify_css
end
