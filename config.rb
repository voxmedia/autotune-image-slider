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

set :thumbor_security_key, ENV['THUMBOR_SECURITY_KEY']
set :thumbor_server_url, ENV['THUMBOR_SERVER_URL']
set :thumbor_force_no_protocol_in_source_url, ((ENV['THUMBOR_FORCE_NO_PROTOCOL_IN_SOURCE_URL'] || '').downcase == 'true')

helpers do
  # Remove all theme info to reduce payload
  def autotune_data_without_themes
    # Remove all theme_data
    ret = data.autotune.dup
    ret.delete('theme_data')
    ret
  end

  # Process a image url
  #
  # @param [String] Full URL to an image file
  # @param [Hash] Options for cutting the thumb:
  #  :meta => bool - flag that indicates that thumbor should return only
  #                  meta-data on the operations it would otherwise perform;
  #  :crop => [left, top, right, bottom] - Coordinates for manual cropping.
  #  :width => <int> - the width for the thumbnail;
  #  :height => <int> - the height for the thumbnail;
  #  :flip => <bool> - flag that indicates that thumbor should flip
  #                    horizontally (on the vertical axis) the image;
  #  :flop => <bool> - flag that indicates that thumbor should flip vertically
  #                    (on the horizontal axis) the image;
  #  :halign => :left, :center or :right - horizontal alignment that thumbor
  #                                        should use for cropping;
  #  :valign => :top, :middle or :bottom - horizontal alignment that thumbor
  #                                        should use for cropping;
  #  :smart => <bool> - flag indicates that thumbor should use smart cropping;
  # @return [String] Full URL to the thumbnail
  def thumb_url(image_url, options = {})
    return image_url unless image_url.present? && image_url =~ /^http/

    return image_url unless thumbor_security_key.present? && thumbor_server_url.present?

    require 'ruby-thumbor'
    @thumbor_service ||= Thumbor::CryptoURL.new(thumbor_security_key)

    if thumbor_force_no_protocol_in_source_url
      options[:image] = URI.escape(image_url.strip.sub(%r{^http(s|)://}, ''))
    else
      options[:image] = URI.escape(image_url.strip)
    end

    options[:filters] ||= Array.new
    options[:filters] << 'no_upscale()' unless options[:filters].include?('no_upscale()')

    path = @thumbor_service.generate(options)
    host = thumbor_server_url % (Zlib.crc32(path) % 4)
    host + path
  end

  # Generate a src set for img tag
  #
  # @param [String] An absolute image URL
  # @param [Array] A list of widths to include in the set
  # @return [String] A srcset string
  def srcset(image_url, sizes = %w(2000 1600 1200 900 640))
    return '' unless thumbor_security_key.present? && thumbor_server_url.present?
    sizes.map do |w|
      url = thumb_url(image_url, :width => w)
      "#{url} #{w}w"
    end.join(', ')
  end

  # Render a assets and return as a string
  #
  # @param [String] Name of an asset to include
  # @return [String] String of stuff
  def inline_asset(*names)
    old = sprockets.css_compressor, sprockets.js_compressor
    sprockets.js_compressor = :uglifier
    sprockets.css_compressor = :scss
    dat = names.map { |name| sprockets[name].to_s }.reduce(:+)
    sprockets.css_compressor, sprockets.js_compressor = old
    dat.gsub(' !important', '')
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
