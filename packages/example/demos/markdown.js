#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { snippets } = require('snippets.js')

const outputFileName = 'markdown.md'
const outputFile = fs.createWriteStream(path.join(process.cwd(), outputFileName))

let snippetCounter = 0

snippets.on('data', ({ language, path, markdown }) => {
  const snippetName = path.split('/').slice(-1)[0].split('.')[0]

  outputFile.write(`## ${snippetName} in ${language}\n\n${markdown}\n`)
  snippetCounter++
})

snippets.on('end', () => {
  console.log(
    `\n✨  Wrote ${snippetCounter} snippets in ${outputFileName}.\n`
  )
})
