import { createSnippet } from 'snippets/dist/createSnippet'
import { SnippetFactory } from 'snippets/dist/interfaces/SnippetFactory'

const createPhpSnippet: SnippetFactory = (filepath, code) => createSnippet({
  language: 'php',
  path: filepath,
  code,
  transform: (code: string) => code.replace('<?php', '')
})

export { createPhpSnippet }
