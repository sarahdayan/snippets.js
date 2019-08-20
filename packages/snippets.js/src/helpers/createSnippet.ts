import unindent from 'unindent'
import Snippet from '../interfaces/Snippet'
import TransformFunction from '../interfaces/TransformFunction'

const commentRegex = /(?:#|\/\/) ?snippets-start((?:.*|\n)*?)(?:#|\/\/) ?snippets-end/

const createSnippet: {
  (options: {
    language: string,
    path?: string,
    code: string,
    transform?: TransformFunction
  }): Snippet
} = ({ language, path, code: rawCode, transform = code => code }) => {
  const [, code] = rawCode.match(commentRegex) || [null, rawCode]
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