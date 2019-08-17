import { readFileSync } from 'fs'
import TransformFunction from '../interfaces/TransformFunction'
import createSnippet from '../createSnippet'

const createSnippetFromPath = (filepath: string, { language, transform }: { language: string, transform: TransformFunction | undefined }) => {
  const code = readFileSync(filepath, 'utf8')

  return createSnippet({
    path: filepath,
    code,
    language,
    transform
  })
}

export default createSnippetFromPath
