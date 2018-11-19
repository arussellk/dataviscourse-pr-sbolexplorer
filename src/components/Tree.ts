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
        return '/glyphs/aptamer-specification.png' 
      }
      case 'http://identifiers.org/so/SO:0001953': {
        return '/glyphs/'
      }
      // TODO
      //
      // ADD IN ALL CASES !!
      default: {
        console.log("No matching glyph!!??!!")
        return '/glyphs/aptamer-specification.png' 
      }
    }
  }
  
  createTree(){
    let treeDiv = d3.select('#tree-div')

    // clear previous tree
    treeDiv.selectAll('*').remove()

    let treeSVG = treeDiv.append('svg')
      .attr('height', 1200)
      .attr('width', 900)
      .attr('x', 0)
      .attr('y', 0);

    let data = d3.hierarchy(this.treeData)

    let treeMap = d3.tree().size([850, 900])
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
               return "M" + d.x + "," + (d.y- 68) + ' ' + 'L' + d.parent.x + ',' + (d.parent.y+35)
          })

    let nodeDisplay = nodeG.selectAll('g')
           .data(nodes)
           .enter()
           .append('g')
    nodeDisplay.append('image')
            .attr('x', (d) => d.x - 25)
            .attr('y', (d) => d.y - 53)
            .attr('width', '55px')
            .attr('height', '55px')
            .attr('href', (d) => this.assignGlyph(d.data['role']))
            .on('mouseover', (d) => {
              this.div.transition()
                 .duration(200)
                 .style('opacity', .9)

              this.div.html(this.hoverHTML(d))
                 .style("left", (d3.event.pageX) + "px")
                 .style("top", (d3.event.pageY - 25) + "px")
            })
            .on('mouseout', (d) => {
               this.div.style('opacity', 0)
            })
    nodeDisplay.append('text')
           .attr("x", function(d) { return d.x - 32 })
           .attr('y', (d) => d.y - 55)
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
