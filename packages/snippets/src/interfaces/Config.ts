import LanguageConfig from './LanguageConfig'

export default interface ConfigFile {
  sourceDir?: string
  ignore?: string[]
  languages?: LanguageConfig[]
}
