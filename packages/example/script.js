#!/usr/bin/env node

const { performance } = require('perf_hooks')
const { default: stream } = require('snippets')

let snippetCounter = 0

const start = performance.now()

stream.on('data', snippet => {
  console.log(snippet)
  snippetCounter++
})

stream.on('end', () => {
  const end = performance.now()
  const processingTime = Math.round(((end - start) / 1000) * 100) / 100

  console.log(
    `\n✨  Parsed ${snippetCounter} snippets in ${processingTime}s.\n`
  )
})
