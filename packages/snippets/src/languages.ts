import { LanguageConfig } from './interfaces/config/Language'

const getLanguageOptions = (languagesConfig: LanguageConfig[]) =>
  Object.assign(
    {},
    ...languagesConfig.map(
      ({
        fileType = [],
        language = '',
        transform = code => code
      }) =>
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

export { getLanguageOptions }
