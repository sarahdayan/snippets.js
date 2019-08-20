import LanguageConfig from '../interfaces/LanguageConfig'
import LanguageOptions from '../interfaces/LanguageOptions'

/**
 * Returns language options from a language configuration
 *
 * @param languageConfig The language configuration to turn into options
 *
 * @returns Language options
 */
const getLanguageOptions: {
  (languageConfig: LanguageConfig[]): LanguageOptions
} = languageConfig =>
    Object.assign(
      {},
      ...languageConfig.map(({ fileType = [], language, transform }) =>
        Object.assign(
          {},
          ...fileType.map((type: string) => ({
            [type]: {
              language,
              transform
            }
          }))
        )
      )
    )

export default getLanguageOptions
