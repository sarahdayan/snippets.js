# Snippets.js

Snippets.js helps you extract code snippets from source files so you can use them as text in your own projects.

It's particularly useful in documentation projects, where you need to showcase code snippets but can't either run or lint them to ensure they're correct. Snippets integrates in your workflow and returns a collection of parsed snippets.

- [Snippets.js](#snippetsjs)
  - [Install](#install)
  - [API](#api)
    - [`createSnippet`](#createsnippet)
    - [`Snippet`](#snippet)
    - [`Language`](#language)

## Install

## API

### `createSnippet`

The `createSnippet` factory lets you generate `Snippet` objects from source input. This is what the library uses internally to generate snippets from your source files.

You can use `createSnippet` to build your own snippet factories for specific languages.

```js
const createPhpSnippet = (filepath, code) => createSnippet({
  language: {
    id: 'php',
    code: 'php',
    label: 'PHP'
  },
  path: filepath,
  code,
  transform: code => code.replace('<?php', '')
})
```

If you're using TypeScript, you can implement the `SnippetFactory` interface.

#### `options.language` (`Language`) <!-- omit in toc -->

The language of a snippet.

It should contain an `id`, a `code` and a `label`.

#### `options.path` (`string`) <!-- omit in toc -->

The path of a snippet's source file.

#### `options.code` (`string`) <!-- omit in toc -->

The raw code of a snippet.

#### `options.transform?` (`(code: string) => string`) <!-- omit in toc -->

A function to transform the raw code before returning it.

This is useful when you want to get rid of a piece of code that's necessary in the source file, but that you don't need in the final snippet.

### `Snippet`

A `Snippet` object contains all the information about a code snippet.

If you're using TypeScript, you can implement the `Snippet` interface.

#### `language` (`Language`) <!-- omit in toc -->

Get the language of a snippet.

It contains an `id`, a `code` and a `label`.

#### `path` (`string`) <!-- omit in toc -->

Get the path of a snippet.

This is the original path to the source file.

#### `code` (`string`) <!-- omit in toc -->

Get the code of a snippet.

#### `markdown` (`string`) <!-- omit in toc -->

Get the code of a snippet in Markdown format.

### `Language`

A `Language` object contains all the information about a code snippet's language.

If you're using TypeScript, you can implement the `Language` type.

#### `id` (`string`) <!-- omit in toc -->

The unique identifier of a language.

#### `code` (`string`) <!-- omit in toc -->

The code of a language.

Internally, yhis is used to generate the Markdown version of code snippet with the proper language.

#### `label` (`string`) <!-- omit in toc -->

The label of a language.

This is how the language should be written for display. It's useful when you want to display it on an user interface.
