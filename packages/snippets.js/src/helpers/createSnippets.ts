import { readFileSync } from 'fs'
import { lstat } from 'fs'
import gs from 'glob-stream'
import { Transform } from 'stream'
import getOptionsFromConfig from './getOptionsFromConfig'
import createSnippet from './createSnippet'
import getChunksFromCode from './getChunksFromCode'
import Config from '../interfaces/Config'

/**
 * A factory function to create a stream of Snippet objects
 *
 * @param config A configuration to create Snippet objects
 *
 * @returns A readable stream of Snippet objects
 */
const createSnippets = (config: Config): NodeJS.ReadableStream => {
  const { sourceDir, ignore, languages } = getOptionsFromConfig(config)

  const transformFiles = (inStream: NodeJS.ReadableStream) => {
    const upperStream = new Transform({
      objectMode: true,
      transform({ path: filepath }, _, callback) {
        lstat(filepath, (err, stats) => {
          if (err) throw err

          if (stats.isFile()) {
            const extension = filepath.split('.').slice(-1)[0]
            const options = languages && languages[extension] ? languages[extension] : { language: undefined, transform: undefined }
            const { language = extension, transform } = options

            const code = readFileSync(filepath, 'utf8')
            const chunks = getChunksFromCode(code)

            chunks.forEach(({ code }) => {
              const snippet = createSnippet({
                path: filepath,
                code,
                language,
                transform
              })

              this.push(snippet)
            })
          }

          callback()
        })
      }
    })

    return inStream.pipe(upperStream)
  }

  const files = gs(sourceDir, { ignore })

  return transformFiles(files)
}

export default createSnippets
