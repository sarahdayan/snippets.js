all:
	make js && make php && make ruby

js:
	cd snippets/javascript && yarn --silent lint

php:
	cd snippets/php && composer --quiet lint

ruby:
	cd snippets/ruby && rubocop --format quiet

.PHONY: php js ruby
