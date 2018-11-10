export default class TreeNode {
  uri: string
  sequence: string
  children: TreeNode[]
  range: [number, number] | null
  description: string
  version: string
  name: string
  displayId: string
  role: string
  type: string

  constructor(
    uri: string,
    sequence: string,
    children: TreeNode[],
    range: [number, number] | null,
    description: string,
    version: string,
    name: string,
    displayId: string,
    role: string,
    type: string
  ) {
    this.uri = uri
    this.sequence = sequence
    this.children = children
    this.range = range
    this.description = description
    this.version = version
    this.name = name
    this.displayId = displayId
    this.role = role
    this.type = type
  }
}
