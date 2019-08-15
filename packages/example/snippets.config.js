module.exports = {
  sourceDir: '**/snippets/**/*',
  ignore: ['**/node_modules/**'],
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
