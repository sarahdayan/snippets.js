import path from 'path'
import Snippet from '../../interfaces/Snippet'
import processSnippets from '../../__helpers__/processSnippets'
import createSnippets from '../createSnippets'

const baseDir = '../../__fixtures__/snippets/'
const sourceDir = path.join(__dirname, baseDir, '**/*')
const ignorePath = path.join(__dirname, baseDir, 'ignore/*')

const snippetsFactory = (extraConfig = {}) =>
  createSnippets({
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

describe('createSnippets', () => {
  test('looks for snippets into `sourceDir` option', async () => {
    const snippets = snippetsFactory()
    const snippetCounter = await createSnippetCounter(snippets)

    expect(snippetCounter).toBe(6)
  })
  test('ignores snippets from `ignore` option', async () => {
    const snippets = snippetsFactory({
      ignore: [ignorePath]
    })
    const snippetCounter = await createSnippetCounter(snippets)

    expect(snippetCounter).toBe(5)
  })
  test('sets the assigned `language` as the snippet language', async () => {
    const snippets = snippetsFactory({
      ignore: [ignorePath],
      languages: [
        {
          fileType: ['rb'],
          language: 'ruby'
        }
      ]
    })

    const snippetCollection = await createSnippetCollection(snippets)

    const { length: rubySnippetCount } = snippetCollection.filter(
      ({ language }) => language === 'ruby'
    )

    expect(rubySnippetCount).toBe(1)
  })
  test('uses the assigned `transform` function', async () => {
    const snippets = snippetsFactory({
      languages: [
        {
          fileType: ['php'],
          transform: code => code.replace('<?php', '')
        }
      ]
    })

    const snippetCollection = await createSnippetCollection(snippets)

    const { code } = snippetCollection.find(
      ({ language }) => language === 'php'
    ) || { code: '' }

    expect(code).toBe('echo "Hello, world!";')
  })
  test('splits multi-chunk snippets before turning them into objects', async () => {
    const snippets = snippetsFactory()
    const snippetCollection = await createSnippetCollection(snippets)

    const javaSnippets = snippetCollection.filter(
      ({ language }) => language === 'java'
    ).map(({ code }) => ({ code }))

    expect(javaSnippets).toEqual(expect.arrayContaining(
      [
        {
          code: 'public class HelloWorld'
        },
        {
          code: `public static void main(String[] args) {
    System.out.println("Hello, World");
}`
        }
      ]
    ))
  })
})
