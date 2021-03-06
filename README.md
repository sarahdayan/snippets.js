# Snippets.js<!-- omit in toc -->

Snippets.js helps you extract code snippets from source files so you can use them as text in your own projects.

It's particularly useful in documentation projects, where you need to showcase pieces of code but can't either run or lint them to ensure they're correct. Snippets.js integrates in your workflow and returns a collection of parsed snippets.

> **WARNING:** The API is still unstable. Do not use in production yet.

- [Install](#install)
- [Getting started](#getting-started)
- [API](#api)
- [FAQ](#faq)
- [License](#license)

## Install

```sh
npm install snippets.js

# or

yarn add snippets.js
```

## Getting started

Snippets.js iterates over your source files, generates snippet objects, and exposes them through a readable stream.

```js
const { createSnippets } = require("snippets.js");

const snippets = createSnippets({
  sourceDir: "path/to/snippets/*",
  ignore: ["node_modules/*"]
});

snippets.on("data", snippet => {
  console.log(snippet);
});

snippets.on("end", () => {
  console.log("Finished parsing snippets!");
});
```

### Language<!-- omit in toc -->

By default, Snippets.js parses the file extension and sets it as the snippet's language. You can change it in the `languages` setting.

```js
const snippets = createSnippets({
  // ...
  languages: [
    {
      fileType: ["rb"],
      language: "ruby"
    }
  ]
});
```

### Transforming the code<!-- omit in toc -->

You can also transform the raw input code. This is useful when you need to remove a piece of code (think `<?php` in PHP snippets, for instance).

```js
const snippets = createSnippets({
  // ...
  languages: [
    {
      // ...
      transform: code => code.replace("# frozen_string_literal: true", "")
    }
  ]
});
```

### Chunking a larger snippet<!-- omit in toc -->

If you only need to parse a chunk of a longer snippet, you can add special comments to delimit the part you need.

Comments work with `//` and `#`.

```java
public class Factorial {
  public static void main(String[] args) {
    int num = 10;
    long factorial = 1;

    // snippets-start
    for(int i = 1; i <= num; ++i)
    {
        factorial *= i;
    }
    // snippets-end

    System.out.printf("Factorial of %d = %d", num, factorial);
  }
}
```

```python
num = 10
factorial = 1

# snippets-start
for i in range(1,num+1):
    factorial = factorial * i
# snippets-end

print "Factorial of %s = %d" % (num,factorial)
```

You can create several commented parts in a single snippet to chunk it into several snippet objects.

Additionally, you can name snippets by suffixing the start comment with `:<your-name>`. Snippet names can include letters, numbers, hyphens and underscores.

> **Note:** Overlapping and nested comments aren't supported.

```python
num = 10
factorial = 1

# snippets-start
for i in range(1,num+1):
    factorial = factorial * i
# snippets-end

# snippets-start:my-snippet
print "Factorial of %s = %d" % (num,factorial)
# snippets-end
```

## API

The library exposes two main modules: [`createSnippets`](#createsnippets) and [`createSnippet`](#createsnippet).

They both let you generate [`Snippet`](#snippet) objects.

### `createSnippets`<!-- omit in toc -->

Type: `(config: { sourceDir?, ignore?, languages? }) => NodeJS.ReadableStream`

The `createSnippets` factory lets you generate a readable stream of `Snippet` objects from source files.

You can use it to log objects to the console, write them to a file, store them in memory for later usage, anything.

```js
const { createSnippets } = require("snippets.js");

const snippets = createSnippets({
  sourceDir: "path/to/snippets/*",
  ignore: ["node_modules/*"],
  languages: [
    {
      fileType: ["rb"],
      language: "ruby",
      transform: code => code.replace("# frozen_string_literal: true", "")
    }
  ]
});

snippets.on("data", snippet => {
  console.log(snippet);
});

snippets.on("end", () => {
  console.log("Finished parsing snippets!");
});
```

#### `sourceDir?`<!-- omit in toc -->

Type: `string | undefined`

The path where to find the source snippets. Supports [glob patterns](https://en.wikipedia.org/wiki/Glob_(programming)).

```js
module.exports = {
  sourceDir: "path/to/snippets/**/*"
};
```

#### `ignore?`<!-- omit in toc -->

Type: `string[] | undefined`

The paths to ignore. Supports [glob patterns](https://en.wikipedia.org/wiki/Glob_(programming)).

```js
module.exports = {
  ignore: ["node_modules"]
};
```

#### `languages?`<!-- omit in toc -->

Type: `{ fileType, language?, transform? }[] | undefined`

A collection of rules to handle languages. This lets you apply specific treatment to each snippet based on file type.

```js
module.exports = {
  languages: [
    {
      fileType: ["rb", "erb"],
      language: "ruby",
      transform(code) {
        return code.replace("# frozen_string_literal: true", "");
      }
    },
    {
      // ...
    }
  ]
};
```

##### `languages.fileType`<!-- omit in toc -->

Type: `string[]`

The file type(s) on which to apply the rule (based on file extension).

```js
module.exports = {
  languages: [
    {
      fileType: ["rb", "erb"]
    }
  ]
};
```

##### `languages.language?`<!-- omit in toc -->

Type: `string | undefined`

The language slug to assign to the snippet. This is used as language for the Markdown fenced blocks.

If not specified, defaults to the file extension.

```js
module.exports = {
  languages: [
    {
      language: "ruby"
    }
  ]
};
```

##### `languages.transform?`<!-- omit in toc -->

Type: `(code: string) => string | undefined`

A transform function to apply on the code.

```js
module.exports = {
  languages: [
    {
      transform(code) {
        return code.replace("# frozen_string_literal: true", "");
      }
    }
  ]
};
```

### `createSnippet`<!-- omit in toc -->

Type: `(options: { language, path?, code, transform? }) => Snippet`

The `createSnippet` factory lets you generate `Snippet` objects from source input. This is what the library uses internally to generate snippets from your source files.

```js
const { createSnippet } = require("snippets.js");

const phpSnippet = createSnippet({
  name: "my-snippet",
  language: "php",
  code: '<?php\necho "Hello world!"',
  transform: code => code.replace("<?php", "")
});
```

You can use `createSnippet` to manually generate snippets as in the example above, or to build your own snippet factories for specific languages.

```js
const createPhpSnippet = code =>
  createSnippet({
    language: "php",
    code,
    transform: code => code.replace("<?php", "")
  });

const code = '<?php\necho "Hello world!"';

const phpSnippet = createPhpSnippet(code);
```

If you're using TypeScript, you can implement the `SnippetFactory` interface.

```ts
const createPhpSnippet: SnippetFactory = code =>
  createSnippet({
    language: "php",
    code,
    transform: code => code.replace("<?php", "")
  });
```

#### `options.name?`<!-- omit in toc -->

Type: `string | undefined`

The name of the snippet.

#### `options.language`<!-- omit in toc -->

Type: `string`

The language of the snippet.

#### `options.path?`<!-- omit in toc -->

Type: `string | undefined`

The path of the snippet's source file. This is only useful when you're parsing snippets from source files, and can be ommitted if you're building `Snippet` objects by hand.

#### `options.code`<!-- omit in toc -->

Type: `string`

The raw code of the snippet.

#### `options.transform?`<!-- omit in toc -->

Type: `(code: string) => string | undefined`

A function to transform the raw code before returning it.

This is useful when you want to get rid of a piece of code that's necessary in the source file, but that you don't need in the final snippet.

### `Snippet`<!-- omit in toc -->

A `Snippet` object contains all the information about a code snippet. This is what the library returns you when you're either using `createSnippet` manually, or listening for data on `snippets`.

If you're using TypeScript, you can implement the `Snippet` interface.

```ts
const snippet: Snippet = createSnippet({
  language: "php",
  code: '<?php\necho "Hello world!"',
  transform: code => code.replace("<?php", "")
});
```

#### `name`<!-- omit in toc -->

Type: `string | undefined`

Get the name of a snippet.

```js
snippet.name; // 'my-snippet'
```

#### `language`<!-- omit in toc -->

Type: `string`

Get the language of a snippet.

```js
snippet.language; // 'php'
```

#### `path?`<!-- omit in toc -->

Type: `string | undefined`

Get the path of a snippet.

This is the original path to the source file. This is only useful when you're parsing snippets from source files, and can be ommitted if you're building `Snippet` objects by hand.

```js
snippet.path; // 'path/to/original/snippet.php'
```

#### `code`<!-- omit in toc -->

Type: `string`

Get the code of a snippet.

```js
snippet.code; // 'echo "Hello world!"'
```

#### `markdown`<!-- omit in toc -->

Type: `string`

Get the code of a snippet in Markdown format.

````js
snippet.markdown; // '```php\necho "Hello world!"\n```'
````

## FAQ

### Why streams?<!-- omit in toc -->

Snippets.js was built to work with many snippets, from source files. Reading through a bunch of files and storing lots of objects that potentially contain long chunks of code can become greedy in terms of memory. **Streams are an ideal solution to make sure that memory consumption remains under control.**

If you don't want to use streams, you can reimplement the iteration logic as you see fit and consume the [`createSnippet`](#createsnippet) factory exposed by the library.

### Can I see a demo?<!-- omit in toc -->

Sure! This monorepo exposes a [fully working example](https://github.com/sarahdayan/snippets.js/tree/master/packages/example) in `packages/example/`. Check out the code for inspiration, and follow the README to run the demo.

## License

Snippets is licensed under MIT.
