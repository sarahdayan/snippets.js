import Snippet from './Snippet'

/**
 * A curried factory to create a single Snippet object
 */
export default interface SnippetFactory {
  (code: string, filepath?: string): Snippet
}
