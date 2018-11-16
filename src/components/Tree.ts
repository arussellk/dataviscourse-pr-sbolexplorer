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
    console.log(this.treeData)
  }

  createTree(){
    let treeSVG = d3.select('#tree').append('svg')
      .attr('height', 600)
      .attr('width', 600)
      .attr('x', 0)
      .attr('y', 0);
  }

}

