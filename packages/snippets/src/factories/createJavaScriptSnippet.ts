import { createSnippet } from './createSnippet'
import { Language } from '../enums/Language'
import { SnippetFactory } from '../interfaces/SnippetFactory'

const createJavaScriptSnippet: SnippetFactory = (filepath, code) => createSnippet({
  language: Language.JAVASCRIPT,
  path: filepath,
  code
})

export { createJavaScriptSnippet }
