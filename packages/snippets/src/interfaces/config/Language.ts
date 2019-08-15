export interface LanguageConfig {
  fileType?: string[]
  language?: string
  transform?: (code: string) => string
}
