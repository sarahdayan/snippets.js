import getLanguageOptions from '../getLanguageOptions'

describe('getLanguageOptions', () => {
  test('turns a language configuration into language options', () => {
    const transform = jest.fn()
    const options = getLanguageOptions([
      {
        fileType: ['rb'],
        language: 'ruby',
        transform
      },
      {
        fileType: ['js', 'ts'],
        transform
      }
    ])

    expect(options).toMatchObject({
      rb: {
        language: 'ruby',
        transform
      },
      js: {
        transform
      },
      ts: {
        transform
      }
    })
  })
  test('does not return a config if filetype is empty', () => {
    const options = getLanguageOptions([
      {
        fileType: [],
        language: 'ruby'
      }
    ])

    expect(options).toMatchObject({})
  })
  test('does not return a config if filetype is undefined', () => {
    const options = getLanguageOptions([
      {
        fileType: undefined,
        language: 'ruby'
      }
    ])

    expect(options).toMatchObject({})
  })
  test('defaults to undefined when language is not set', () => {
    const { rb } = getLanguageOptions([
      {
        fileType: ['rb']
      }
    ])

    expect(rb.language).toBeUndefined()
  })
  test('defaults to undefined when transform is not set', () => {
    const { rb } = getLanguageOptions([
      {
        fileType: ['rb']
      }
    ])

    expect(rb.transform).toBeUndefined()
  })
})
