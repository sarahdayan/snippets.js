import path from 'path'
import { LanguageConfig } from '../interfaces/LanguageConfig'

const CONFIG_FILE = 'snippets.config.js'
const SOURCE_DIR = './'
const IGNORE: string[] = []
const LANGUAGES: LanguageConfig[] = []

const configPath = path.join(process.cwd(), CONFIG_FILE)
const { sourceDir = SOURCE_DIR, ignore = IGNORE, languages = LANGUAGES } = require(configPath)

export { sourceDir, ignore, languages }
