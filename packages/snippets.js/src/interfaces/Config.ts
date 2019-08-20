import LanguageConfig from './LanguageConfig'

/**
 * A configuration to create Snippet objects
 */
export default interface Config {
  sourceDir?: string
  ignore?: string[]
  languages?: LanguageConfig[]
}
