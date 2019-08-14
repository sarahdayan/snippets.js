#!/usr/bin/env node

import * as fs from 'fs'
import path from 'path'
import gs from 'glob-stream'
import program from 'commander'

import { createSnippet } from './createSnippet'

const configPath = path.join(process.cwd(), 'snippets.config.js')
const {
  sourceDir = './',
  ignore = [],
  outputFile: configOutputFile = 'snippets.txt',
  languages: lngs
} = require(configPath)
const snippetsPath = path.join(process.cwd(), sourceDir)

program
  .option('-f, --file [file]', 'Write snippets to a file')
  .option('-l, --log', 'Log snippets to the console')

program.parse(process.argv)

const outputFileName =
  program.file && typeof program.file === 'string'
    ? program.file
    : configOutputFile

let outputFile = fs.createWriteStream(
  path.join(process.cwd(), outputFileName || configOutputFile)
)

const languages = Object.assign(
  {},
  ...lngs.map(
    ({
      fileType,
      language,
      transform
    }: {
      fileType: string[],
      language: string,
      transform: (code: string) => string
    }) =>
      Object.assign(
        {},
        ...fileType.map((type: any) => ({
          [type]: {
            language,
            transform
          }
        }))
      )
  )
)

const getSnippet = (filepath: string) => {
  const code = fs.readFileSync(filepath, 'utf8')
  const extension = filepath.split('.').slice(-1)[0]
  const plugin: { fileType?: string[], language?: string, transform?: (code: string) => string } = languages[extension] || {}
  const { language = extension, transform } = plugin

  return createSnippet({
    path: filepath,
    code,
    language,
    transform
  })
}

const files = gs(snippetsPath, { ignore })

files.on('data', ({ path: filepath }) => {
  const { markdown } = getSnippet(filepath)
  const output = `${markdown.trim()}\n`

  if (program.file) {
    outputFile.write(output, 'utf8')
  }

  if (program.log) {
    console.log(output)
  }
})

files.on('finish', () => {
  outputFile.end()
})

outputFile.on('finish', () => {
  if (program.file) {
    console.log(`✨  Finished writing snippets to %s\n`, outputFileName)
  }

  if (program.log) {
    console.log(`✨  Finished logging snippets to console\n`)
  }
})
