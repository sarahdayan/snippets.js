import unindent from 'unindent'

import * as languages from '../languages'
import { Snippet } from '../interfaces/Snippet'
import { Language } from '../enums/Language'

const commentRegex = /(?:#|\/\/) ?snippets-start((?:.*|\n)*?)(?:#|\/\/) ?snippets-end/

const createSnippet: {
  (options: {
    language: Language,
    path: string,
    code: string,
    transform?: (code: string) => string
  }): Snippet
} = ({
  language: lng,
  path,
  code,
  transform = code => code
}) => {
  const uncommentedCode = code.match(commentRegex) || []
  const transformedCode = unindent(transform(uncommentedCode[1] || code)).trim()
  const language = languages[lng]

  return {
    language,
    path,
    get code() {
      return transformedCode
    },
    get markdown() {
      return `
\`\`\`${language.code}
${transformedCode}
\`\`\``
    }
  }
}

export { createSnippet }
