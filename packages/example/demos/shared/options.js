module.exports = {
  sourceDir: 'snippets/**/snippets/**/*',
  ignore: ['**/node_modules/**'],
  languages: [
    {
      fileType: ['php'],
      transform: code => code.replace('<?php', '')
    },
    {
      fileType: ['cs'],
      language: 'csharp'
    },
    {
      fileType: ['rb'],
      language: 'ruby',
      transform: code => code.replace('# frozen_string_literal: true', '')
    },
  ]
}
