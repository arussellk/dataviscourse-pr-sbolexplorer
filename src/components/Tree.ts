import json from '../data/trees/BBa_I7120-with-range.js'
import * as d3 from 'd3'
import TreeNode from '../models/TreeNode'

export default class Tree {
  treeData: TreeNode | object
  mock : boolean

  constructor(data: TreeNode, mock: boolean){
    this.mock = mock
    if (mock){
      this.treeData = json
    }
    else {
      this.treeData = data
    }
 }

  // TODO: Try tree generation based on TreeNode object/non mock!!!
  createTree(){
    let treeDiv = d3.select('#tree-div') 

    let treeSVG = treeDiv.append('svg')
      .attr('height', 600)
      .attr('width', 500)
      .attr('x', 0)
      .attr('y', 0);

    let data = d3.hierarchy(this.treeData)

    let treeMap = d3.tree().size([450, 550])
    let tree = treeMap(data)
    console.log(tree)

    let treeG = treeSVG.append('g').attr('id', 'tree-group')
    let nodes = tree.descendants()
    let links = tree.descendants().slice(1)
    let nodeG = treeG.append('g').attr('id', 'all-nodes')
    let linkG = treeG.append('g').attr('id', 'all-links')

    let linkDisplay = linkG.selectAll('g')
          .data(links)
          .enter()
          .append('g')
    linkDisplay.append('path')
          .classed('link', true)
          .attr("d", function(d) {
               return "M" + d.x + "," + (d.y- 18) + ' ' + 'L' + d.parent.x + ',' + (d.parent.y-5)
          })

    let nodeDisplay = nodeG.selectAll('g')
           .data(nodes)
           .enter()
           .append('g')
    nodeDisplay.append('circle')
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y)
          .classed('node', true)
    nodeDisplay.append('text')
           .attr("x", function(d) { return d.x - 40 })
           .attr('y', (d) => d.y - 10)
           .classed('node', true)
           .text((d) => {
              if (this.mock){
                return d.data['uri']
              }
              return d.data['displayId']
           }) 

    treeG.attr('transform', 'translate(0,25)')
  }

}

