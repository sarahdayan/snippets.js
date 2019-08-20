/**
 * A transform function for Snippet objects
 */
export default interface TransformFunction {
  (code: string): string
}
