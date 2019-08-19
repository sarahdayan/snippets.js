import Snippet from '../interfaces/Snippet'

const processSnippets = <T>(
  snippets: NodeJS.ReadableStream,
  fn: (subject: T, data: Snippet) => T,
  initialData: T
): Promise<T> => {
  let subject = initialData

  return new Promise((resolve, reject) => {
    try {
      snippets
        .on('data', chunk => {
          subject = fn(subject, chunk)
        })
        .on('end', () => {
          resolve(subject)
        })
    } catch (err) {
      reject(err)
    }
  })
}

export default processSnippets
