import { readFileSync } from 'fs'
import TransformFunction from '../interfaces/TransformFunction'
import createSnippet from './createSnippet'

/**
 * A factory function to create a single Snippet object from a filepath
 *
 * @param filepath The path of the file to create a Snippet object from
 * @param options.language The language of the snippet
 * @param options.transform A function to transform the original code
 *
 * @returns A Snippet object
 */
const createSnippetFromPath = (filepath: string, { language, transform }: { language: string, transform?: TransformFunction }) => {
  const code = readFileSync(filepath, 'utf8')

  return createSnippet({
    path: filepath,
    code,
    language,
    transform
  })
}

export default createSnippetFromPath
