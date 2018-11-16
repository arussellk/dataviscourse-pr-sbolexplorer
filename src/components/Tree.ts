import TreeNode from '../models/TreeNode'
import json from '../data/trees/BBa_I7120-with-range.js'
import * as d3 from 'd3'

export default class Tree {
  treeData: TreeNode | object

  constructor(data: TreeNode, mock: boolean){
    if (mock){
      this.treeData = json
    }
    else {
      this.treeData = data
    }
    //console.log(this.treeData)
  }

  createTree(){
    let treeDiv = d3.select('#tree-div') 

    let treeSVG = treeDiv.append('svg')
      .attr('height', 600)
      .attr('width', 500)
      .attr('x', 0)
      .attr('y', 0);

    let data = d3.hierarchy(this.treeData)
    console.log(data)

    let treeMap = d3.tree().size([800, 300])
  }

}

