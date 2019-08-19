import Snippet from './Snippet'

export default interface SnippetFactory {
  (code: string, filepath?: string): Snippet
}
