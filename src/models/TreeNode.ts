export default class TreeNode {
  uri: string
  sequence: string
  children: TreeNode[]
  range: [number, number] | null

  constructor(
    uri: string,
    sequence: string,
    children: TreeNode[],
    range: [number, number] | null
  ) {
    this.uri = uri
    this.sequence = sequence
    this.children = children
    this.range = range
  }
}
