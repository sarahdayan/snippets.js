import unindent from 'unindent'
import { Snippet } from './interfaces/Snippet'

const commentRegex = /(?:#|\/\/) ?snippets-start((?:.*|\n)*?)(?:#|\/\/) ?snippets-end/

const createSnippet: {
  (options: {
    language: string,
    path: string,
    code: string,
    transform?: (code: string) => string
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

export { createSnippet }
