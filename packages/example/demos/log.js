#!/usr/bin/env node

const { snippets } = require('snippets.js')

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
