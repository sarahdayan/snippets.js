import createSnippetsFromConfig from './helpers/createSnippetsFromConfig'
import getOptionsFromConfig from './helpers/getOptionsFromConfig'
import getConfigFile from './helpers/getConfigFile'

const configFile = getConfigFile()

const { sourceDir, ignore, languages } = getOptionsFromConfig(configFile)

const snippets = createSnippetsFromConfig({
  sourceDir,
  ignore,
  languages
})

export default snippets
