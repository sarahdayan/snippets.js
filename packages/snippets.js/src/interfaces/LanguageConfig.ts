import TransformFunction from './TransformFunction'

/**
 * A language configuration
 */
export default interface LanguageConfig {
  fileType?: string[]
  language?: string
  transform?: TransformFunction
}
