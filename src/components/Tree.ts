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
    
    let nodeDisplay = treeG.selectAll('g')
           .data(nodes)
           .enter()
           .append('g')
    nodeDisplay.append('circle')
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y)
          .classed('node', true)
    nodeDisplay.append('text')
           .attr("dy", ".35em")
           .attr("x", function(d) { return d.children ? d.x + 13 : d.x - 13; })
           .attr('y', (d) => d.y)
           .classed('node', true)
           .text((d) => {
              if (this.mock){
                return d.data['uri']
              }
              return d.data['name']
           }) 

    let linkG = treeG.append('g');
    let linkDisplay = linkG.selectAll('path')
            .data(links)
            .enter()
            .append('path')
            .classed('link', true)
            .attr("d", function(d) {
               return "M" + d.x + "," + d.y + ' ' + 'L' + d.parent.x + ',' + d.parent.y
          })

    treeG.attr('transform', 'translate(0,25)')
  }

}

