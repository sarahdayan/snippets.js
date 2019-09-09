import unindent from 'unindent'
import Snippet from '../interfaces/Snippet'
import TransformFunction from '../interfaces/TransformFunction'

const commentRegex = /(?:#|\/\/) ?snippets-start((?:.*|\n)*?)(?:#|\/\/) ?snippets-end/

/**
 * A factory function to create a single Snippet object
 *
 * https://github.com/sarahdayan/snippets.js#snippet
 *
 * @param options.language The language of the snippet
 * @param options.path The path to the original source file
 * @param options.code The code of the snippet
 * @param options.transform A function to transform the original code
 *
 * @returns A Snippet object
 */
const createSnippet: {
  (options: {
    language: string,
    path?: string,
    code: string,
    transform?: TransformFunction
  }): Snippet
} = ({ language, path, code: rawCode, transform = code => code }) => {
  const [, code] = rawCode.match(commentRegex) || ['', rawCode]
  const transformedCode = unindent(transform(code)).trim()

  return {
    language,
    path,
    code: transformedCode,
    markdown: `\`\`\`${language}
${transformedCode}
\`\`\``
  }
}

export default createSnippet
