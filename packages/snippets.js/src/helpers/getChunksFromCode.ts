import normalizeCode from './normalizeCode'
import commentRegex from './commentRegex'
import Chunk from '../interfaces/Chunk'

/**
 * Returns chunks between special comments from a piece of code
 *
 * @param code The code to extract chunks from
 *
 * @returns A collection of chunks
 */
const getChunksFromCode = (code: string): Chunk[] => {
  const matches = [...code.matchAll(commentRegex)]
  const chunks = matches.length
    ? matches.map(([, , name, code]) => ({
      name,
      code: normalizeCode(code)
    }))
    : [{ code, name: undefined }]

  return chunks
}

export default getChunksFromCode
