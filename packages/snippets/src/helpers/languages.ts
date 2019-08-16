import LanguageConfig from '../interfaces/LanguageConfig'

const getLanguageOptions = (languagesConfig: LanguageConfig[]) =>
  Object.assign(
    {},
    ...languagesConfig.map(
      ({
        fileType = [],
        language,
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

export default getLanguageOptions
