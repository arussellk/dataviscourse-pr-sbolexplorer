import TreeNode from '../models/TreeNode'
import json from '../data/trees/BBa_I7120-with-range.json'

import {
  SBOL2Graph,
  S2Sequence,
  S2ComponentDefinition,
  S2Range,
  S2SequenceAnnotation
} from 'sbolgraph'

export default class TreeService {
  static async createTree(uri: string, mock: boolean): Promise<TreeNode>{
    if (mock){
      return json;
    }
    else { 
      const g: SBOL2Graph = await SBOL2Graph.loadURL(uri)

      const rootCD: S2ComponentDefinition = g.rootComponentDefinitions[0]
      if (!rootCD) {
        return new TreeNode(uri, null, [], null, null, null, null, null, null, null)
      }

      return this.postOrder(rootCD, null, null)
    }
  }

  private static postOrder(cd: S2ComponentDefinition, start: number, end: number): TreeNode {
    const uri = cd.uri
    const sequence = this.getSequence(cd)
    const description = cd.description
    const version = cd.version
    const name = cd.name
    const displayId = cd.displayId
    const role = cd.roles[0] ||	''
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
}
