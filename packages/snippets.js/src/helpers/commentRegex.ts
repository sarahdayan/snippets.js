/**
 * The regular expression to parse commented chunks
 */
const commentRegex = /((?:#|\/\/) ?snippets-)start(?::([\w-]+))?([\s\S]*?)(\1)end/g

export default commentRegex
