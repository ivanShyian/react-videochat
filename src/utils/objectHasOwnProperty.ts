export default function objectHasOwnProperty(object: Record<string, any>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(object, key)
}