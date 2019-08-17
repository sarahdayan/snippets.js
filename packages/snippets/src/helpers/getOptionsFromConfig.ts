import Config from '../interfaces/Config'
import getLanguageOptions from './getLanguageOptions'

const getOptionsFromConfig = (config: Config) => {
  const { sourceDir = './', ignore = [], languages: languagesConfig = [] } = config
  const languages = getLanguageOptions(languagesConfig)

  return { sourceDir, ignore, languages }
}

export default getOptionsFromConfig
