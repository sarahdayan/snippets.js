#!/usr/bin/env node

const { createSnippets } = require('snippets.js')
const options = require('./shared/options')

const snippets = createSnippets(options)

let snippetCounter = 0

snippets.on('data', snippet => {
  console.log(snippet)
  snippetCounter++
})

snippets.on('end', () => {
  console.log(
    `\n✨  Parsed ${snippetCounter} snippets.\n`
  )
})
