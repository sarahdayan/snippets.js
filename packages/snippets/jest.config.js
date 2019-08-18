module.exports = {
  rootDir: 'src',
  collectCoverageFrom: [
    '**/*.{ts,js}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/__fixtures__/**',
    '!**/__helpers__/**'
  ]
}
