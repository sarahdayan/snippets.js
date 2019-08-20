import { lstat } from 'fs'
import gs from 'glob-stream'
import { Transform } from 'stream'
import getOptionsFromConfig from './getOptionsFromConfig'
import createSnippetFromPath from './createSnippetFromPath'
import Config from '../interfaces/Config'

const createSnippets = (config: Config): NodeJS.ReadStream => {
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
            const { language = extension, transform = undefined } = options

            const snippet = createSnippetFromPath(filepath, {
              language,
              transform
            })
            this.push(snippet)
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
