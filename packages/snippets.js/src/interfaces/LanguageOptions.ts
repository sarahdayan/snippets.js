import TransformFunction from './TransformFunction'

/**
 * Language options
 */
export default interface LanguageOptions {
  [key: string]: { language?: string, transform?: TransformFunction }
}
