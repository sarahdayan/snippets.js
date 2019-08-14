module.exports = {
  sourceDir: '**/snippets/**/*',
  ignore: ['**/node_modules/**'],
  outputFile: 'all_snippets.txt',
  languages: [
    {
      fileType: ['php'],
      transform: code => code.replace('<?php', '')
    },
    {
      fileType: ['cs'],
      language: 'csharp'
    }
  ]
}
