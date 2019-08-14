all:
	make js && make php && make ruby

js:
	cd javascript && yarn lint

php:
	cd php && composer lint

ruby:
	cd ruby && rubocop

.PHONY: php js ruby
