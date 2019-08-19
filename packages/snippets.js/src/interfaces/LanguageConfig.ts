import TransformFunction from './TransformFunction'

export default interface LanguageConfig {
  fileType?: string[]
  language?: string
  transform?: TransformFunction
}
