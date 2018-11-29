import TreeNode from '../models/TreeNode'

import {
  SBOL2Graph,
  S2Sequence,
  S2ComponentDefinition,
  S2Range,
  S2SequenceAnnotation
} from 'sbolgraph'

export default class TreeService {
  static async createTree(uri: string): Promise<TreeNode>{
    const g: SBOL2Graph = await SBOL2Graph.loadURL(uri)

    const rootCD: S2ComponentDefinition = g.rootComponentDefinitions[0]
    if (!rootCD) {
      return new TreeNode(uri, null, [], null, null, null, null, null, null, null)
    }

    const rootNode: TreeNode = this.postOrder(rootCD, null, null)
    this.assignColors(rootNode)
    return rootNode
  }

  private static postOrder(cd: S2ComponentDefinition, start: number, end: number): TreeNode {
    const uri = cd.uri
    const sequence = this.getSequence(cd)
    const description = cd.description
    const version = cd.version
    const name = cd.name
    const displayId = cd.displayId
    const role = cd.roles[0] || ''
    const type = cd.type

    if (!cd.sequenceAnnotations.length) {
      return new TreeNode(uri, sequence, [], [start, end], description, version, name, displayId, role, type)
    }

    // there are children
    const children = cd.sequenceAnnotations.map((seqAnnotation: S2SequenceAnnotation) => {
      const maybeComponent = seqAnnotation.component
      if (maybeComponent === undefined) {
        // if seqAnnotation does not have a component, it is some other kind of feature
        return null
      }

      const definition = maybeComponent.definition
      const range: S2Range = seqAnnotation.rangeLocations[0]

      return this.postOrder(definition, range.start, range.end)
    })
    .filter(x => x !== null)

    return new TreeNode(uri, sequence, children, [start, end], description, version, name, displayId, role, type)
  }

  private static getSequence(cd: S2ComponentDefinition): string {
    const maybeSequence: S2Sequence|undefined = cd.sequences[0]
    if (maybeSequence) {
      return maybeSequence.elements || ''
    } else {
      return ''
    }
  }

  private static assignColors(node: TreeNode) {
    const it = this.colorIterator()
    node.children.forEach(child => {
      child.color = it.next().value
      this.assignColors(child)
    })
  }

  private static colorIterator = function*() {
    // Each sequence and link will be drawn using these colors.
    // The colors start anew on the left of each node's sequence.
    // These colors were taken from "Points of view: Color blindness" by Bang Wong
    // https://www.nature.com/articles/nmeth.1618?WT.ec_id=NMETH-201106
    // (Figure 2)
    while (true) {
      yield 'rgb(0,0,0)' // black
      yield 'rgb(230,159,0)' // orange
      yield 'rgb(86,180,233)' // sky blue
      yield 'rgb(0,158,115)' // bluish green
      yield 'rgb(240,228,66)' // yellow
      yield 'rgb(0,114,178)' // blue
      yield 'rgb(213,94,0)' // vermillion
      yield 'rgb(204,121,167)' // reddish purple
    }
  }
}
