import path from 'path'
import createSnippetsFromConfig from './helpers/createSnippetsFromConfig'
import getOptionsFromConfig from './helpers/getOptionsFromConfig'

const configFile = require(path.join(process.cwd(), 'snippets.config.js'))

const { sourceDir, ignore, languages } = getOptionsFromConfig(configFile)

const snippets = createSnippetsFromConfig({
  sourceDir: path.join(process.cwd(), sourceDir),
  ignore,
  languages
})

export default snippets
