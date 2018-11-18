import json from '../data/trees/BBa_I7120-with-range.js'
import * as d3 from 'd3'
import TreeNode from '../models/TreeNode'

export default class Tree {
  treeData: TreeNode | object
  mock : boolean
  div : any
  onClickTreeNode: (TreeNode) => void

  constructor(
    data: TreeNode,
    onClickTreeNode: (TreeNode) => void,
    mock: boolean = false
  ) {
    this.mock = mock
    this.onClickTreeNode = onClickTreeNode

    // Define the div for the tooltip
    this.div = d3.select("body").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0)

    if (mock){
      this.treeData = json
    }
    else {
      this.treeData = data
    }
 }

  hoverHTML(nodeData : any){
    let htmlName = '<b>Name: ' + nodeData.data['name']  + '</b>' + '<br/><br/>'
    let htmlType = '<b>Type:</b> ' + nodeData.data['type'] + '<br/>'
    let htmlVersion = '<b>Version: </b>' + nodeData.data['version']
    return htmlName + htmlType + htmlVersion
  }

  assignGlyph(role : string){
    // Glyphs based on role
    switch(role){
      case 'http://identifiers.org/so/SO:0000031': {
        return '/glyphs/aptame-specification.png' 
      }
      default: {
        console.log("No matching glyph!!??!!")
      }
    }
  }
  
  createTree(){
    let treeDiv = d3.select('#tree-div')

    // clear previous tree
    treeDiv.selectAll('*').remove()

    let treeSVG = treeDiv.append('svg')
      .attr('height', 1200)
      .attr('width', 500)
      .attr('x', 0)
      .attr('y', 0);

    let data = d3.hierarchy(this.treeData)

    let treeMap = d3.tree().size([450, 900])
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
          .on('mouseover', (d) => {
            //TODO
            this.div.transition()
                .duration(200)
                .style('opacity', .9)
                .style('visibility', 'visible')

            this.div.html(this.hoverHTML(d))
                .style("left", (d3.event.pageX + 28) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
          })
          .on('mouseout', (d) => {
            // Using visibility: hidden so that the tooltip does not cover nodes
            // to the right and prevent mouseover evens on them. If you only use
            // opacity: 0, then the tooltip will still intercept mouse events
            // even though it is not seen by the user.
            this.div.style('opacity', 0)
                    .style('visibility', 'hidden')
          })
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
    nodeDisplay.on('click', (d) => {
      this.onClickTreeNode(d.data)
    })

    treeG.attr('transform', 'translate(0,100)')
  }
}
