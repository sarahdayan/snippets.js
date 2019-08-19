module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: {
          node: 'current'
        },
      },
    ],
    '@babel/preset-typescript'
  ],
  plugins: ['add-module-exports'],
  ignore: [
    '**/interfaces/*',
    '**/__tests__/*',
    '**/__helpers__/*',
    '**/unindent.d.ts'
  ]
}
