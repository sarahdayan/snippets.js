import * as fs from 'fs'
import path from 'path'
import gs from 'glob-stream'
import { Transform } from 'stream'

import { sourceDir, ignore } from './helpers/options'
import createSnippetFromPath from './helpers/createSnippetFromPath'

const transformFiles = (inStream: NodeJS.ReadableStream) => {
  const upperStream = new Transform({
    objectMode: true,
    transform({ path: filepath }, _, callback) {
      fs.lstat(filepath, (err, stats) => {
        if (err) return console.log(err)

        if (stats.isFile()) {
          const snippet = createSnippetFromPath(filepath)
          this.push(snippet)
        }

        callback()
      })
    }
  })

  return inStream.pipe(upperStream)
}

const snippetsPath = path.join(process.cwd(), sourceDir)
const files = gs(snippetsPath, { ignore })

export default transformFiles(files)
