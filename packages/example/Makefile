install:
	make install-js && make install-php && make install-ruby

run:
	make run-js && make run-php && make run-ruby

install-js:
	cd snippets/javascript && yarn

install-php:
	cd snippets/php && composer install

install-ruby:
	cd snippets/ruby && bundle install

run-js:
	cd snippets/javascript && yarn --silent lint

run-php:
	cd snippets/php && composer --quiet lint

run-ruby:
	cd snippets/ruby && rubocop --format quiet
