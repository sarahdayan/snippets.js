// eslint-disable-next-line import/no-commonjs
module.exports = {
  sourceDir: 'snippets/*',
  ignore: ['snippets/ignore/*'],
  languages: [
    {
      fileType: ['php'],
      transform: code => code.replace('<?php', ''),
    },
    {
      fileType: ['cs'],
      language: 'csharp',
    },
    {
      fileType: ['rb'],
      language: 'ruby',
      transform: code => code.replace('# frozen_string_literal: true', ''),
    },
  ],
};
