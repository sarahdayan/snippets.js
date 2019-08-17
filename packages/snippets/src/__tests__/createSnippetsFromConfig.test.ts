import path from 'path'
import Snippet from '../interfaces/Snippet'
import createSnippetsFromConfig from '../createSnippetsFromConfig'

let snippets: NodeJS.ReadableStream

const baseDir = '../__fixtures__/snippets/'
const sourceDir = path.join(__dirname, baseDir, '**/*')
const ignorePath = path.join(__dirname, baseDir, 'ignore/*')

const snippetsFactory = (extraConfig = {}) =>
  createSnippetsFromConfig({
    sourceDir,
    ...extraConfig
  })

const processSnippets = <T>(
  fn: (subject: T, data: Snippet) => T,
  data: T
): Promise<T> => {
  let subject = data

  return new Promise(resolve => {
    snippets.on('data', data => {
      subject = fn(subject, data)
    })
    snippets.on('end', () => {
      resolve(subject)
    })
  })
}

describe('createSnippetsFromConfig', () => {
  test('looks for snippets into config.sourceDir', async () => {
    snippets = snippetsFactory()
    const snippetCounter = await processSnippets(counter => counter + 1, 0)

    expect(snippetCounter).toBe(4)
  })
  test('ignores snippets from config.ignore', async () => {
    snippets = snippetsFactory({
      ignore: [ignorePath]
    })
    const snippetCounter = await processSnippets(counter => counter + 1, 0)

    expect(snippetCounter).toBe(3)
  })
  test('sets the assigned language as the snippet language', async () => {
    snippets = snippetsFactory({
      ignore: [ignorePath],
      languages: {
        rb: {
          language: 'ruby'
        }
      }
    })

    const snippetCollection: Snippet[] = await processSnippets(
      (collection, data) => {
        collection.push(data)
        return collection
      },
      []
    )

    const rubySnippet = snippetCollection.filter(
      ({ language }) => language === 'ruby'
    )

    expect(rubySnippet.length).toBe(1)
  })
  test('uses the assigned transform function', async () => {
    snippets = snippetsFactory({
      languages: {
        php: {
          transform: (code: string) => code.replace('<?php', '')
        }
      }
    })

    const snippetCollection: Snippet[] = await processSnippets(
      (collection, data) => {
        collection.push(data)
        return collection
      },
      []
    )

    const { code } = snippetCollection.find(
      ({ language }) => language === 'php'
    )

    expect(code).toBe('echo "Hello, world!";')
  })
})
