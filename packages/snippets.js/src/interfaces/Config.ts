import LanguageConfig from './LanguageConfig'

export default interface Config {
  sourceDir?: string
  ignore?: string[]
  languages?: LanguageConfig[]
}
