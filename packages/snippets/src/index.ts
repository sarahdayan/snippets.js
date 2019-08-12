#!/usr/bin/env node

import * as fs from 'fs'
import path from 'path'
import glob from 'glob'

import { SnippetFactory } from './interfaces/SnippetFactory'
import * as SnippetFactories from './factories'

const configPath = path.join(process.cwd(), 'snippets.config.js')
const { sourceDir, ignore } = require(configPath)
const snippetsPath = path.join(process.cwd(), sourceDir)

const languages: { [key: string]: SnippetFactory } = {
  rb: SnippetFactories.createRubySnippet,
  js: SnippetFactories.createJavaScriptSnippet,
  php: SnippetFactories.createPhpSnippet
}

const getSnippet = (filepath: string) => {
  const code = fs.readFileSync(filepath, 'utf8')
  const extension = filepath.split('.').slice(-1)[0]

  return languages[extension](filepath, code)
}

glob(snippetsPath, { ignore }, (err, files) => {
  if (err) throw err

  return files.map(filepath => getSnippet(filepath))
})
