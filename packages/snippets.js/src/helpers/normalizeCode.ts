import unindent from 'unindent'

/**
 * Trims and re-indents a piece of code
 *
 * @param code The code to normalize
 *
 * @returns The normalized code
 */
const normalizeCode = (code: string) => unindent(code).trim()

export default normalizeCode
