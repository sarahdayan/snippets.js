import normalizeCode from '../normalizeCode'

describe('normalizeCode', () => {
  test('trims spaces around code', () => {
    const code = '  console.log("plop") '

    expect(normalizeCode(code)).toBe('console.log("plop")')
  })
  test('re-indents code', () => {
    const code = `  index.search('foo', (err, content) => {
    if (err) throw err;
    console.log(content);
  });`

    expect(normalizeCode(code)).toBe(`index.search('foo', (err, content) => {
  if (err) throw err;
  console.log(content);
});`)
  })
})
