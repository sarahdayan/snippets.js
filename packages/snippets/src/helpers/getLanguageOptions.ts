import LanguageConfig from '../interfaces/LanguageConfig'
import TransformFunction from '../interfaces/TransformFunction'

const getLanguageOptions: {
  (
    languageConfig: LanguageConfig[]
  ): { [key: string]: { language: string, transform: TransformFunction } }
} = languageConfig =>
    Object.assign(
      {},
      ...languageConfig.map(
        ({ fileType = [], language, transform }) =>
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
