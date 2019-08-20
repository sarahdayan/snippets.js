import Config from '../interfaces/Config'
import LanguageOptions from '../interfaces/LanguageOptions'
import getLanguageOptions from './getLanguageOptions'

/**
 * Returns options from a configuration
 *
 * @param config The configuration to turn into options
 *
 * @returns Options to create Snippet objects
 */
const getOptionsFromConfig = (
  config: Config
): { sourceDir: string, ignore: string[], languages: LanguageOptions } => {
  const {
    sourceDir = process.cwd(),
    ignore = [],
    languages: languagesConfig = []
  } = config
  const languages = getLanguageOptions(languagesConfig)

  return { sourceDir, ignore, languages }
}

export default getOptionsFromConfig
