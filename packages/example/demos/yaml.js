#!/usr/bin/env node

const camelize = require('camelize')
const groupBy = require('lodash.groupby')
const writeYamlFile = require('write-yaml-file')

const { createSnippets } = require('snippets.js')
const options = require('./shared/options')

const snippets = createSnippets(options)

const collection = []

snippets.on('data', snippet => {
  collection.push(snippet)
})

snippets.on('end', () => {
  const groups = groupBy(
    collection.map(({ path, language, markdown }) => {
      const name = path
        .split('/')
        .slice(-1)[0]
        .split('.')[0]

      return {
        name: camelize(name),
        [language]: markdown
      }
    }),
    'name'
  )

  const data = Object.keys(groups).map(groupName => ({
    [groupName]: Object.assign(
      ...groups[groupName].map(snippet => {
        delete snippet.name

        return snippet
      })
    )
  }))

  data.forEach(group => {
    writeYamlFile(`yaml/${Object.keys(group)[0]}.yaml`, group)
  })

  console.log(
    `\n✨  Wrote ${collection.length} snippets in yaml/.\n`
  )
})
