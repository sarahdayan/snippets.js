# frozen_string_literal: true

require 'rubygems'
require 'algoliasearch'
require 'uri'
require 'net/http'
require 'json'

# snippets-start
client = Algolia::Client.new(
  application_id: 'GZV6PDPKZY',
  api_key: 'xxxxxxxxxx'
)
# snippets-end

index = Algolia::Index.new('demo_ecommerce')

url = 'https://alg.li/doc-ecommerce.json'

# snippets-start:products
products = JSON.parse(
  Net::HTTP.get_response(
    URI.parse(url).host,
    URI.parse(url).path
  )
)
# snippets-end

index.add_objects(products)
