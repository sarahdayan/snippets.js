import createSnippet from '../createSnippet'

const snippetOptions = {
  language: 'java',
  path: 'path/to/snippet',
  code: 'System.out.println("Hello, World");'
}

describe('createSnippet', () => {
  describe('#language', () => {
    test('returns the language', () => {
      const snippet = createSnippet(snippetOptions)

      expect(snippet.language).toBe('java')
    })
  })
  describe('#path', () => {
    test('returns the path', () => {
      const snippet = createSnippet(snippetOptions)

      expect(snippet.path).toBe('path/to/snippet')
    })
  })
  describe('#code', () => {
    test('returns the code', () => {
      const snippet = createSnippet(snippetOptions)

      expect(snippet.code).toBe('System.out.println("Hello, World");')
    })
    test('returns the transformed code', () => {
      const { code } = createSnippet({ ...snippetOptions, transform: code => code.toUpperCase() })

      expect(code).toBe('SYSTEM.OUT.PRINTLN("HELLO, WORLD");')
    })
    test('returns the code in Markdown', () => {
      const snippet = createSnippet(snippetOptions)

      expect(snippet.markdown).toBe(`\`\`\`java
System.out.println("Hello, World");
\`\`\``)
    })
    test('removes blank lines', () => {
      const { code } = createSnippet({
        language: 'php',
        path: 'path/to/snippet',
        code: `
<?php
echo "Hello, world!";`,
        transform: code => code.replace('<?php', '')
      })

      expect(code).toBe('echo "Hello, world!";')
    })
  })
})
