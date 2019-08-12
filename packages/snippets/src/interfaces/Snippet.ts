import { Language } from '../types/Language';

export interface Snippet {
  language: Language,
  path: string,
  code: string,
  markdown: string
}
