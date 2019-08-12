import { createSnippet } from '../factories/createSnippet'
import { Language } from '../enums/Language'

let snippet = undefined

const snippetOptions = {
  language: Language.ANDROID,
  path: 'path/to/snippet',
  code: 'System.out.println("Hello, World");'
}

beforeEach(() => {
  snippet = createSnippet(snippetOptions)
})

describe('createSnippet', () => {
  describe('#language', () => {
    test('returns the language ID', () => {
      expect(snippet.language.id).toBe('android')
    })
    test('returns the language code', () => {
      expect(snippet.language.code).toBe('java')
    })
    test('returns the language label', () => {
      expect(snippet.language.label).toBe('Android')
    })
  })
  describe('#path', () => {
    test('returns the path', () => {
      expect(snippet.path).toBe('path/to/snippet')
    })
  })
  describe('#code', () => {
    test('returns the code', () => {
      expect(snippet.code).toBe('System.out.println("Hello, World");')
    })
    test('returns the transformed code', () => {
      const { code } = createSnippet({ ...snippetOptions, transform: code => code.toUpperCase() })

      expect(code).toBe('SYSTEM.OUT.PRINTLN("HELLO, WORLD");')
    })
    test('returns the code in Markdown', () => {
      expect(snippet.markdown).toBe(`
\`\`\`java
System.out.println("Hello, World");
\`\`\``)
    })
    test('removes blank lines', () => {
      const { code } = createSnippet({
        language: Language.PHP,
        path: 'path/to/snippet',
        code: `
<?php
echo "Hello, world!";`,
        transform: code => code.replace('<?php', '')
      })

      expect(code).toBe('echo "Hello, world!";')
    })
    test('only retrieves code between slash comments', () => {
      const { code } = createSnippet({
        language: Language.JAVASCRIPT,
        path: 'path/to/snippet',
        code: `
index.setSettings({ 'customRanking': ['desc(followers)'] }, (err, content) => {
  // snippets-start
   if (err) throw err;

  console.log(content);
  // snippets-end
});`
      })

      expect(code).toBe(`if (err) throw err;

console.log(content);`)
    })
    test('only retrieves code between hash comments', () => {
      const { code } = createSnippet({
        language: Language.PYTHON,
        path: 'path/to/snippet',
        code: `
index.set_settings({'customRanking': ['desc(followers)']}, {
    # snippets-start
    'forwardToReplicas': True
    # snippets-end
})`
      })

      expect(code).toBe('\'forwardToReplicas\': True')
    })
    test('works with unspaced comments', () => {
      const { code } = createSnippet({
        language: Language.PYTHON,
        path: 'path/to/snippet',
        code: `
index.set_settings({'customRanking': ['desc(followers)']}, {
    #snippets-start
    'forwardToReplicas': True
    #snippets-end
})`
      })

      expect(code).toBe('\'forwardToReplicas\': True')
    })
  })
})
