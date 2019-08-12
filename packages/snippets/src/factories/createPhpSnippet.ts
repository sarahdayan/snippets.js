import { createSnippet } from './createSnippet'
import { Language } from '../enums/Language'
import { SnippetFactory } from '../interfaces/SnippetFactory'

const createPhpSnippet: SnippetFactory = (filepath, code) => createSnippet({
  language: Language.PHP,
  path: filepath,
  code,
  transform: (code: string) => code.replace('<?php', '')
})

export { createPhpSnippet }
