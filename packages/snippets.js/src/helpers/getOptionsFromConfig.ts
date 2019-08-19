import Config from '../interfaces/Config'
import getLanguageOptions from './getLanguageOptions'

const getOptionsFromConfig = (config: Config) => {
  const { sourceDir = process.cwd(), ignore = [], languages: languagesConfig = [] } = config
  const languages = getLanguageOptions(languagesConfig)

  return { sourceDir, ignore, languages }
}

export default getOptionsFromConfig
