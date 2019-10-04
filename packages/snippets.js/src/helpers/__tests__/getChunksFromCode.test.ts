import getChunksFromCode from '../getChunksFromCode'

describe('getChunksFromCode', () => {
  test('returns full code when no comment', () => {
    const rawCode = `index
  .setSettings({ customRanking: ["desc(followers)"] })
  .then(content => {
    console.log(content);
  })
  .catch(err => {
    throw err;
  });`
    const [{ code }] = getChunksFromCode(rawCode)

    expect(code).toBe(rawCode)
  })
  test('only retrieves code between slash comments', () => {
    const rawCode = `index
  .setSettings({ customRanking: ["desc(followers)"] })
  .then(content => {
    // snippets-start
    console.log(content);
    // snippets-end
  })
  .catch(err => {
    throw err;
  });`
    const [{ code }] = getChunksFromCode(rawCode)

    expect(code).toBe('console.log(content);')
  })
  test('only retrieves code between hash comments', () => {
    const rawCode = `index.set_settings({'customRanking': ['desc(followers)']}, {
    # snippets-start
    'forwardToReplicas': True
    # snippets-end
})`
    const [{ code }] = getChunksFromCode(rawCode)

    expect(code).toBe("'forwardToReplicas': True")
  })
  test('works with unspaced comments', () => {
    const rawCode = `
index.set_settings({'customRanking': ['desc(followers)']}, {
    #snippets-start
    'forwardToReplicas': True
    #snippets-end
})`
    const [{ code }] = getChunksFromCode(rawCode)

    expect(code).toBe("'forwardToReplicas': True")
  })
  test('retrieves names when specified', () => {
    const rawCode = `index
  .setSettings({ customRanking: ["desc(followers)"] })
  .then(content => {
    // snippets-start:foo
    console.log(content);
    // snippets-end
  })
  .catch(err => {
    throw err;
  });`
    const [{ name }] = getChunksFromCode(rawCode)

    expect(name).toBe('foo')
  })
  test('retrieves several chunks when there are several comments', () => {
    const rawCode = `index
  .setSettings({ customRanking: ["desc(followers)"] })
  .then(content => {
    // snippets-start:foo
    console.log(content);
    // snippets-end
  })
  .catch(err => {
    // snippets-start:bar
    throw err;
    // snippets-end
  });`
    const chunks = getChunksFromCode(rawCode)

    expect(chunks).toEqual(
      expect.arrayContaining([
        {
          name: 'foo',
          code: 'console.log(content);'
        },
        {
          name: 'bar',
          code: 'throw err;'
        }
      ])
    )
  })
  test('does not support overlapping comments', () => {
    const rawCode = `index.setSettings({ 'customRanking': ['desc(followers)'] }, (err, content) => {
  // snippets-start
  if (err) throw err;

  // snippets-start
  console.log('Done!');
  // snippets-end
  console.log(content);
  // snippets-end
});`
    const [{ code }] = getChunksFromCode(rawCode)

    expect(code).toBe(`if (err) throw err;

// snippets-start
console.log('Done!');`)
  })
})
