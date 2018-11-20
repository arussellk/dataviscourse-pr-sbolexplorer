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
    this.div = d3.select('body').append('div')
                  .attr('class', 'tooltip')
                  .style('opacity', 0)

    if (mock){
      this.treeData = json
    }
    else {
      this.treeData = data
    }
 }

  hoverHTML(nodeData : any){
    let htmlName = '<b>Name: ' + nodeData.data['name']  + '</b>' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'  
    let icon = '<image src=' + this.assignGlyph(nodeData.data['role']) + '/><br/><br/><br/>'// 'width=80 height=80 </image><br/><br/><br/><br/>'
    let htmlType = '<b>Type:</b> ' + nodeData.data['type'] + '<br/>'
    let htmlVersion = '<b>Version: </b>' + nodeData.data['version']
    return htmlName + icon + htmlType + htmlVersion
  }

  assignGlyph(role : string){
    // Glyphs based on role
    switch(role){
      case 'http://identifiers.org/so/SO:0000031': {
        return '/glyphs/aptamer.svg' 
      }
      case 'http://identifiers.org/so/SO:0001953': {
        return '/glyphs/assembly-scar.svg'
      }
      case 'http://identifiers.org/so/SO:0001691': {
        return '/glyphs/blunt-restriction-site-specification.png'
      }
      case 'http://identifiers.org/so/SO:0000316': {
        return '/glyphs/cds.svg'
      }
      case 'http://identifiers.org/so/SO:0001956': {
        return '/glyphs/protease-site.svg'
      }
      case 'http://identifiers.org/so/SO:000197': {
        return '/glyphs/ribonuclease-site.svg'
      }
      case 'http://identifiers.org/so/SO:0001688': {
        return '/glyphs/nuclease-site.svg'
      }
      case 'http://identifiers.org/so/SO:0001687': {
        return '/glyphs/nuclease-site.svg'
      }
      case 'http://identifiers.org/so/SO:0001687': {
        return '/glyphs/nuclease-site.svg'
      }
      case 'http://identifiers.org/so/SO:0000804': {
        return '/glyphs/engineered-region.svg'
      }
      case 'http://wiki.synbiohub.org/wiki/Terms/igem#partType/Composite': {
        return '/glyphs/engineered-region.svg'
      }
      case 'http://identifiers.org/so/SO:0001932': {
        return '/glyphs/five-prime-overhang.svg'
      }
      case 'http://identifiers.org/so/SO:0001933': {
        return '/glyphs/three-overhang.svg'
      }
      case 'http://identifiers.org/so/SO:0001975': {
        return '/glyphs/five-prime-sticky-restriction-site.svg'
      }
      case 'http://identifiers.org/so/SO:0001976': {
        return '/glyphs/three-sticky.svg'
      }
      case 'http://identifiers.org/so/SO:0000627': {
        return '/glyphs/insulator.svg'
      }
      case 'http://identifiers.org/so/SO:0000699': {
        return '/glyphs/location-dna.svg'
      }
      case 'http://identifiers.org/so/SO:0001236': {
        return '/glyphs/location-rna.svg'
      }
      case 'http://identifiers.org/so/SO:0001237': {
        return '/glyphs/location-protein.svg'
      }
      case 'http://identifiers.org/so/SO:0001263': {
        return '/glyphs/ncrna.svg'
      }
      case 'http://identifiers.org/so/SO:0000834': {
        return '/glyphs/ncrna.svg'
      }
      case 'http://identifiers.org/so/SO:0000057': {
        return '/glyphs/operator.svg'
      }
      case 'http://identifiers.org/so/SO:0000409': {
        return '/glyphs/operator.svg'
      }
      case 'http://identifiers.org/so/SO:0000296': {
        return '/glyphs/origin-of-replication.svg'
      }
      case 'http://identifiers.org/so/SO:0000724': {
        return '/glyphs/origin-of-transfer.svg'
      }
      case 'http://identifiers.org/so/SO:0000553': {
        return '/glyphs/polyA.svg'
      }
      case 'http://identifiers.org/so/SO:0005850': {
        return '/glyphs/primer-binding-site.svg'
      }
      case 'http://identifiers.org/so/SO:0000167': {
        return '/glyphs/promoter.svg'
      }
      case 'http://identifiers.org/so/SO:0000139': {
        return '/glyphs/ribosome-entry-site.svg'
      }
      case 'http://identifiers.org/so/SO:0001978': {
        return '/glyphs/signature.svg'
      }
      case 'http://identifiers.org/so/SO:0000299': {
        return '/glyphs/specific-recombination-site.svg'
      }
      case 'http://identifiers.org/so/SO:0001955': {
        return '/glyphs/protein-stability-element.svg'
      }
      case 'http://identifiers.org/so/SO:0001546': {
        return '/glyphs/protein-stability-element.svg'
      }
      case 'http://identifiers.org/so/SO:0001979': {
        return '/glyphs/rna-stability-element.svg'
      }
      case 'http://identifiers.org/so/SO:0000141': {
        return '/glyphs/terminator.svg'
      }
      case 'http://identifiers.org/so/SO:0000110': {
        return '/glyphs/replacement-glyph.svg'
      }
      default: {
        console.log("No matching glyph!!??!!")
        return '/glyphs/no-glyph-assigned.svg' 
      }
    }
  }
  
  createTree(){
    let treeDiv = d3.select('#tree-div')

    // clear previous tree
    treeDiv.selectAll('*').remove()

    let treeSVG = treeDiv.append('svg')
      .attr('height', 1200)
      .attr('width', 850)
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
                 .style("left", (d3.event.pageX + 25) + "px")
                 .style("top", (d3.event.pageY - 25) + "px")
            })
            .on('mouseout', (d) => {
               this.div.style('opacity', 0)
            })
    nodeDisplay.append('text')
           .attr("x", function(d) {
             if (d.parent == null){
               return d.x - 55 
             }
             else {
               return d.x - 50
             } 
            })
           .attr('y', function(d) {
             if (d.parent == null){
              return d.y - 55
             }
             else {
               return d.y - 78 
             }
            })
           .classed('node', (d) => d.parent != null)
           .text((d) => {
              if (this.mock){
                return d.data['uri']
              }
              return d.data['displayId']
           })
           .classed('root', (d) => d.parent == null)
           .attr('transform', function(d) {
              if (d.parent == null){
                return 'rotate(0)'
              }
              else {
                let x = d.x - 15
                let y = d.y - 78
                return 'rotate(45,' + x + ',' + y + ')'
              }
           })
    nodeDisplay.on('click', (d) => {
      this.onClickTreeNode(d.data)
    })
    nodeDisplay.append('rect')
          .attr('width', 55)
          .attr('height', 15)
          .attr('x', (d) => d.x - 25)
          .attr('y', (d) => d.y + 10)
          .classed('sequence-rect', true)

    treeG.attr('transform', 'translate(0,100)')
  }
}
