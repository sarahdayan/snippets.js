import * as fs from 'fs'
import { createSnippet } from '../createSnippet'
import { getLanguageOptions } from './languages'
import { languages } from './options'
import { LanguageConfig } from '../interfaces/LanguageConfig'

const langs = getLanguageOptions(languages)

const createSnippetFromPath = (filepath: string) => {
  const code = fs.readFileSync(filepath, 'utf8')
  const extension = filepath.split('.').slice(-1)[0]
  const plugin: LanguageConfig = langs[extension] || {}
  const { language = extension, transform } = plugin

  return createSnippet({
    path: filepath,
    code,
    language,
    transform
  })
}

export { createSnippetFromPath }
