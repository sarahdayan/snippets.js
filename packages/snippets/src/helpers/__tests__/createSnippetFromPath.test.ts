import path from 'path'
import createSnippetFromPath from '../createSnippetFromPath'

const filePath = path.join(__dirname, '../../__fixtures__/snippets/snippet.rb')

describe('createSnippetFromPath', () => {
  test('sets the code from the file given as filepath', () => {
    const { code } = createSnippetFromPath(filePath, {
      language: 'ruby'
    })

    expect(code).toBe('puts \'Hello, world!\'')
  })
  test('sets the filepath from options', () => {
    const { path: filepath } = createSnippetFromPath(filePath, {
      language: 'ruby'
    })

    expect(filepath).toBe(filePath)
  })
  test('sets the language from options', () => {
    const { language } = createSnippetFromPath(filePath, {
      language: 'ruby'
    })

    expect(language).toBe('ruby')
  })
  test('sets the transform from options', () => {
    const { code } = createSnippetFromPath(filePath, {
      language: 'ruby',
      transform: code => code.toUpperCase()
    })

    expect(code).toBe('PUTS \'HELLO, WORLD!\'')
  })
})
