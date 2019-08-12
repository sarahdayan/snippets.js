import { Snippet } from './Snippet'

export interface SnippetFactory {
  (filepath: string, code: string): Snippet
}
