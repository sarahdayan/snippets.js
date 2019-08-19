import path from 'path'
import Snippet from '../../interfaces/Snippet'
import processSnippets from '../../__helpers__/processSnippets'
import createSnippetsFromConfig from '../createSnippetsFromConfig'

const baseDir = '../../__fixtures__/snippets/'
const sourceDir = path.join(__dirname, baseDir, '**/*')
const ignorePath = path.join(__dirname, baseDir, 'ignore/*')

const snippetsFactory = (extraConfig = {}) =>
  createSnippetsFromConfig({
    sourceDir,
    ...extraConfig
  })

const createSnippetCounter = (snippets: NodeJS.ReadableStream) =>
  processSnippets(snippets, counter => counter + 1, 0)

const createSnippetCollection = (snippets: NodeJS.ReadableStream) =>
  processSnippets(
    snippets,
    (collection: Snippet[], data) => {
      collection.push(data)
      return collection
    },
    []
  )

describe('createSnippetsFromConfig', () => {
  test('looks for snippets into `sourceDir` option', async () => {
    const snippets = snippetsFactory()
    const snippetCounter = await createSnippetCounter(snippets)

    expect(snippetCounter).toBe(4)
  })
  test('ignores snippets from `ignore` option', async () => {
    const snippets = snippetsFactory({
      ignore: [ignorePath]
    })
    const snippetCounter = await createSnippetCounter(snippets)

    expect(snippetCounter).toBe(3)
  })
  test('sets the assigned `language` as the snippet language', async () => {
    const snippets = snippetsFactory({
      ignore: [ignorePath],
      languages: {
        rb: {
          language: 'ruby'
        }
      }
    })

    const snippetCollection = await createSnippetCollection(snippets)

    const { length: rubySnippetCount } = snippetCollection.filter(
      ({ language }) => language === 'ruby'
    )

    expect(rubySnippetCount).toBe(1)
  })
  test('uses the assigned `transform` function', async () => {
    const snippets = snippetsFactory({
      languages: {
        php: {
          transform: (code: string) => code.replace('<?php', '')
        }
      }
    })

    const snippetCollection = await createSnippetCollection(snippets)

    const { code } = snippetCollection.find(
      ({ language }) => language === 'php'
    ) || { code: '' }

    expect(code).toBe('echo "Hello, world!";')
  })
})
