# Snippets Demo<!-- omit in toc -->

This repository exposes demos for you to test Snippets and get inspiration to write your own scripts.

It's composed of three individual projects with source code to turn into snippets. Alongside, you have access to ready-made, runnable demos.

- [Project structure](#project-structure)
- [Install](#install)
- [Getting started](#getting-started)

## Project structure

This is what the project looks like. Everything in `snippets/` is independant, and has its own ecosystem which is configured at the directory level.

The `demos/` directory contains JavaScript scripts that consume the `snippets.js` library, crawl your source files, generate snippets out of them, and output them in different ways.

Orchestration scripts are shared between a `Makefile` and `package.json` (Node scripts). The project uses a `snippets.config.js` file to configure how Snippets should behave.

```
example/
├── demos/              // Where the demo scripts live
├── snippets/           // Where all individual projects live
│   ├── javascript/     // The JavaScript snippets
│   ├── php/            // The PHP snippets
│   └── ruby/           // The Ruby snippets
├── Makefile            // The scripts to install and run the demos
├── package.json        // The scripts that orchestrate the project
└── snippets.config.js  // The configuration file for Snippets
```

## Install

### Languages<!-- omit in toc -->

This demo exposes snippets in three languages:

- [Node.js](https://nodejs.org/en/download/)
- [PHP](https://www.php.net/manual/install.php)
- [Ruby](https://www.ruby-lang.org/documentation/installation/)

Make sure you have them all installed on your machine before starting.

If you're using a Unix-based system, you can also install these with [Homebrew](https://brew.sh/).

### Tools<!-- omit in toc -->

Each language uses its own set of tools to format and lint its snippets. Most of them are embarked as dependencies, but they still rely on global package managing tools that you must install yourself:

- [Yarn](https://yarnpkg.com/docs/install/) (for JavaScript)
- [Composer](https://getcomposer.org/download/) (for PHP)
- [Bundler](https://bundler.io/) (for Ruby)

If you're using a Unix-based system, you can also install these with [Homebrew](https://brew.sh/).

### Dependencies<!-- omit in toc -->

Once you have the languages and package managers installed globally, you can run `yarn` at the root of the monorepo all dependencies.

This will try to install the Node.js, PHP and Ruby dependencies. Depending on how you installed the languages and the permission level of your current user, this step may fail. In this case, try to either fix your install, change your permission level, or install dependencies manually in `sudo` mode.

## Getting started

This example exposes several demos in the `demos/` directory:

### `log.js`<!-- omit in toc -->

This demo logs every received `Snippet` object in the console.

```js
yarn run log
```

### `markdown.js`<!-- omit in toc -->

This demo writes every received `Snippet` into a single Markdown file.

```js
yarn run markdown
```
