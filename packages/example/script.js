#!/usr/bin/env node

const { default: stream } = require('snippets')

stream.on('data', ({ markdown }) => {
  console.log(markdown)
})
