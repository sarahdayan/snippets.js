import normalizeCode from './normalizeCode'
import Snippet from '../interfaces/Snippet'
import TransformFunction from '../interfaces/TransformFunction'

/**
 * A factory function to create a single Snippet object
 *
 * https://github.com/sarahdayan/snippets.js#snippet
 *
 * @param options.name The name of the snippet
 * @param options.language The language of the snippet
 * @param options.path The path to the original source file
 * @param options.code The code of the snippet
 * @param options.transform A function to transform the original code
 *
 * @returns A Snippet object
 */
const createSnippet: {
  (options: {
    name?: string,
    language: string,
    path?: string,
    code: string,
    transform?: TransformFunction
  }): Snippet
} = ({ name, language, path, code: rawCode, transform = code => code }) => {
  const transformedCode = normalizeCode(transform(rawCode))

  return {
    name,
    language,
    path,
    code: transformedCode,
    markdown: `\`\`\`${language}
${transformedCode}
\`\`\``
  }
}

export default createSnippet
