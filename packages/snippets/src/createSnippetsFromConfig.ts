import { lstat } from 'fs'
import gs from 'glob-stream'
import { Transform } from 'stream'
import TransformFunction from './interfaces/TransformFunction'
import createSnippetFromPath from './helpers/createSnippetFromPath'

const createSnippetsFromConfig = ({
  sourceDir,
  ignore,
  languages
}: {
  sourceDir: string,
  ignore: string[],
  languages: {
    [key: string]: { language?: string, transform?: TransformFunction }
  }
}) => {
  const transformFiles = (inStream: NodeJS.ReadableStream) => {
    const upperStream = new Transform({
      objectMode: true,
      transform({ path: filepath }, _, callback) {
        lstat(filepath, (err, stats) => {
          if (err) return console.log(err)

          if (stats.isFile()) {
            const extension = filepath.split('.').slice(-1)[0]
            const { language = extension, transform = undefined } =
              languages[extension] || {}

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

export default createSnippetsFromConfig
