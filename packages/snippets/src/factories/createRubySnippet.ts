import { createSnippet } from './createSnippet'
import { Language } from '../enums/Language'
import { SnippetFactory } from '../interfaces/SnippetFactory'

const createRubySnippet: SnippetFactory = (filepath, code) => createSnippet({
  language: Language.RUBY,
  path: filepath,
  code
})

export { createRubySnippet }
