import getOptionsFromConfig from '../getOptionsFromConfig'

describe('getOptionsFromConfig', () => {
  test('returns options from a config', () => {
    const transform = jest.fn()
    const config = {
      sourceDir: 'snippets/*',
      ignore: ['snippets/ignore/*'],
      languages: [
        {
          fileType: ['php'],
          transform
        },
        {
          fileType: ['cs'],
          language: 'csharp'
        },
        {
          fileType: ['rb'],
          language: 'ruby',
          transform
        }
      ]
    }

    expect(getOptionsFromConfig(config)).toMatchObject({
      sourceDir: 'snippets/*',
      ignore: ['snippets/ignore/*'],
      languages: {
        php: {
          transform
        },
        cs: {
          language: 'csharp'
        },
        rb: {
          language: 'ruby',
          transform
        }
      }
    })
  })
  test('defaults to current directory when sourceDir is not set', () => {
    const { sourceDir } = getOptionsFromConfig({})

    expect(sourceDir).toBe(process.cwd())
  })
  test('defaults to empty when ignore is not set', () => {
    const { ignore } = getOptionsFromConfig({})

    expect(ignore).toEqual([])
  })
  test('defaults to empty when languages is not set', () => {
    const { languages } = getOptionsFromConfig({})

    expect(languages).toMatchObject({})
  })
})
