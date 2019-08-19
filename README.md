# Snippets.js<!-- omit in toc -->

Snippets helps you extract code snippets from source files so you can use them as text in your own projects.

It's particularly useful in documentation projects, where you need to showcase code snippets but can't either run or lint them to ensure they're correct. Snippets integrates in your workflow and returns a collection of parsed snippets.

> **WARNING:** The API is still unstable. Do not use in production yet.

- [Install](#install)
- [Getting started](#getting-started)
- [Configuration file](#configuration-file)
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

Snippets iterates over your source files, generates snippet objects, and exposes them through a readable stream.

```js
const snippets = require("snippets.js");

snippets.on("data", snippet => {
  console.log(snippet);
});

snippets.on("end", () => {
  console.log("Finished parsing snippets!");
});
```

If you only need to parse a chunk of a longer snippet, you can add special comments to delimit the part you need.

Comments work with `//` and `#`.

```java
public class Factorial {
  public static void main(String[] args) {
    // snippets-start
    int num = 10;
    long factorial = 1;
    for(int i = 1; i <= num; ++i)
    {
        factorial *= i;
    }
    System.out.printf("Factorial of %d = %d", num, factorial);
    // snippets-end
  }
}
```

## Configuration file

A configuration can be defined via a `snippets.config.js` file, at the root of your project.

```js
module.exports = {
  sourceDir: 'path/to/snippets/**/*'
  ignore: ['node_modules']
  languages: [
    {
      fileType: ['php'],
      transform: code => code.replace('<?php', '')
    },
    {
      fileType: ['rb'],
      language: 'ruby',
      transform: code => code.replace('# frozen_string_literal: true', '')
    },
  ]
}
```

### `sourceDir`<!-- omit in toc -->

Type: `string`

The path where to find the source snippets. Supports glob patterns.

```js
module.exports = {
  sourceDir: "path/to/snippets/**/*"
};
```

### `ignore`<!-- omit in toc -->

Type: `string[]`

The paths to ignore. Supports glob patterns.

```js
module.exports = {
  ignore: ["node_modules"]
};
```

### `languages`<!-- omit in toc -->

Type: `{ fileType, language?, transform? }`

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

#### `languages.fileType`<!-- omit in toc -->

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

#### `languages.language`<!-- omit in toc -->

Type: `string`

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

#### `languages.transform`<!-- omit in toc -->

Type: `(code: string) => string`

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

## API

The library exposes two main modules: `snippets` and `createSnippet`.

### `snippets`<!-- omit in toc -->

Type: `NodeJS.ReadableStream`

The `snippets` stream is exposed by default to let you manipulate the received `Snippet` objects. It works along with the [configuration file](#configuration-file), finds and parses your snippets for you, and exposes them through a readable stream.

You can use it to log objects to the console, write them to a file, store them in memory for later usage, anything.

### `createSnippet`<!-- omit in toc -->

Type: `(options: { language, path?, code, transform? }) => Snippet`

The `createSnippet` factory lets you generate `Snippet` objects from source input. This is what the library uses internally to generate snippets from your source files.

```js
const phpSnippet = createSnippet({
  language: "php",
  code: `<?php
echo "Hello world!"`,
  transform: code => code.replace("<?php", "")
});
```

You can use `createSnippet` to create snippets manually as in the example above, or to build your own snippet factories for specific languages. If you're using TypeScript, you can implement the `SnippetFactory` interface.

```js
const createPhpSnippet = code =>
  createSnippet({
    language: "php",
    code,
    transform: code => code.replace("<?php", "")
  });

const code = `<?php
echo "Hello world!"`;

const phpSnippet = createPhpSnippet(code);
```

#### `options.language`<!-- omit in toc -->

Type: `string`

The language of a snippet.

#### `options.path?`<!-- omit in toc -->

Type: `string`

The path of a snippet's source file. This is only useful when you're parsing snippets from source files, and can be ommitted if you're building `Snippet` objects by hand.

#### `options.code`<!-- omit in toc -->

Type: `string`

The raw code of a snippet.

#### `options.transform?`<!-- omit in toc -->

Type: `(code: string) => string`

A function to transform the raw code before returning it.

This is useful when you want to get rid of a piece of code that's necessary in the source file, but that you don't need in the final snippet.

### `Snippet`<!-- omit in toc -->

A `Snippet` object contains all the information about a code snippet. This is what the library returns you when you're either using `createSnippet` manually, or listening for data on `snippets`.

If you're using TypeScript, you can implement the `Snippet` interface.

#### `language`<!-- omit in toc -->

Type: `string`

Get the language of a snippet.

```js
phpSnippet.language; // 'php'
```

#### `path?`<!-- omit in toc -->

Type: `string`

Get the path of a snippet.

This is the original path to the source file. This is only useful when you're parsing snippets from source files, and can be ommitted if you're building `Snippet` objects by hand.

```js
phpSnippet.path; // undefined
```

#### `code`<!-- omit in toc -->

Type: `string`

Get the code of a snippet.

```js
phpSnippet.code; // 'echo "Hello world!"'
```

#### `markdown`<!-- omit in toc -->

Type: `string`

Get the code of a snippet in Markdown format.

````js
phpSnippet.markdown; // '```php\necho "Hello world!"\n```'
````

## FAQ

### Why streams?<!-- omit in toc -->

Snippets was built to work with many snippets, from source files. Reading through a bunch of files and storing lots of objects that potentially contain long chunks of code can become greedy in terms of memory. **Streams are an ideal solution to make sure that memory consumption remains under control.**

If you don't want to use streams, you can reimplement the iteration logic as you see fit and consume the [`createSnippet`](#createsnippet) factory exposed by the library.

### Can I see a demo?<!-- omit in toc -->

Sure! This monorepo exposes a [fully working example](https://github.com/sarahdayan/snippets.js/tree/master/packages/example) in `packages/example/`. Check out the code for inspiration, and follow the README to run the demo.

## License

Snippets is licensed under MIT.
