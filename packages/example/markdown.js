#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { default: snippets } = require('snippets')

const outputFileName = 'markdown.md'
const outputFile = fs.createWriteStream(path.join(process.cwd(), outputFileName))

let snippetCounter = 0

snippets.on('data', ({ markdown }) => {
  outputFile.write(`${markdown}\n`)
  snippetCounter++
})

snippets.on('end', () => {
  console.log(
    `\n✨  Wrote ${snippetCounter} snippets in ${outputFileName}.\n`
  )
})
