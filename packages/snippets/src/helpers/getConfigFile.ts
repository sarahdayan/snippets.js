import path from 'path'
import Config from '../interfaces/Config'

const getConfigFile = (filename = 'snippets.config.js'): Config =>
  require(path.join(process.cwd(), filename))

export default getConfigFile
