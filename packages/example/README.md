# Snippets Demo

## Install

### Languages

This demo exposes snippets in three languages:

- JavaScript (Node.js)
- PHP
- Ruby

Make sure you have them all installed on your machine before starting.

### Tools

Each language uses its own set of tools to format and lint its snippets. Most of them are embarked as dependencies, but they still rely on global package managing tools that you must install yourself:

- Yarn (for JavaScript)
- Composer (for PHP)
- Bundler (for Ruby)

### Dependencies

Once you have the languages and package managers installed globally, you can run the following command at the root of the project to install all dependencies:

```js
// @todo
```

## Getting started

This example exposes several demos in the `demos/` directory:

### `log.js`

This demo logs every received `Snippet` object in the console.

```js
yarn run log
```

### `markdown.js`

This demo writes every received `Snippet` into a single Markdown file.

```js
yarn run markdown
```
