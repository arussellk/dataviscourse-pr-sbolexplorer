import json from '../data/trees/BBa_I7120-with-range.js'
import * as d3 from 'd3'
import TreeNode from '../models/TreeNode'

export default class Tree {
  treeData: TreeNode | object
  mock : boolean
  div : any
  onClickTreeNode: (TreeNode, string) => void

  constructor(
    data: TreeNode,
    onClickTreeNode: (TreeNode, string) => void,
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
    return `<b>Name: ${nodeData.data.name}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <image src="${this.assignGlyph(nodeData.data.role)}" />
            <br /><br /><br />
            <b>Role:</b> ${nodeData.data.role}
            <br />
            <b>Version: </b> ${nodeData.data.version}`
  }

  assignGlyph(role : string): string {
    // Glyphs based on role
    const roleToGlyph = {
      'http://identifiers.org/so/SO:0000031': '/glyphs/aptamer.svg',
      'http://identifiers.org/so/SO:0001953': '/glyphs/assembly-scar.svg',
      'http://identifiers.org/so/SO:0001691': '/glyphs/blunt-restriction-site-specification.png',
      'http://identifiers.org/so/SO:0000316': '/glyphs/cds.svg',
      'http://wiki.synbiohub.org/wiki/Terms/igem#partType/Coding': '/glyphs/cds.svg',
      'http://identifiers.org/so/SO:0001956': '/glyphs/protease-site.svg',
      'http://identifiers.org/so/SO:000197': '/glyphs/ribonuclease-site.svg',
      'http://identifiers.org/so/SO:0001688': '/glyphs/nuclease-site.svg',
      'http://identifiers.org/so/SO:0001687': '/glyphs/nuclease-site.svg',
      'http://identifiers.org/so/SO:0000804': '/glyphs/engineered-region.svg',
      'http://wiki.synbiohub.org/wiki/Terms/igem#partType/Composite': '/glyphs/engineered-region.svg',
      'http://identifiers.org/so/SO:0001932': '/glyphs/five-prime-overhang.svg',
      'http://identifiers.org/so/SO:0001933': '/glyphs/three-overhang.svg',
      'http://identifiers.org/so/SO:0001975': '/glyphs/five-prime-sticky-restriction-site.svg',
      'http://identifiers.org/so/SO:0001976': '/glyphs/three-sticky.svg',
      'http://identifiers.org/so/SO:0000627': '/glyphs/insulator.svg',
      'http://identifiers.org/so/SO:0000699': '/glyphs/location-dna.svg',
      'http://identifiers.org/so/SO:0001236': '/glyphs/location-rna.svg',
      'http://identifiers.org/so/SO:0001237': '/glyphs/location-protein.svg',
      'http://identifiers.org/so/SO:0001263': '/glyphs/ncrna.svg',
      'http://identifiers.org/so/SO:0000834': '/glyphs/ncrna.svg',
      'http://identifiers.org/so/SO:0000057': '/glyphs/operator.svg',
      'http://identifiers.org/so/SO:0000409': '/glyphs/operator.svg',
      'http://identifiers.org/so/SO:0000296': '/glyphs/origin-of-replication.svg',
      'http://identifiers.org/so/SO:0000724': '/glyphs/origin-of-transfer.svg',
      'http://identifiers.org/so/SO:0000553': '/glyphs/polyA.svg',
      'http://identifiers.org/so/SO:0005850': '/glyphs/primer-binding-site.svg',
      'http://identifiers.org/so/SO:0000167': '/glyphs/promoter.svg',
      'http://wiki.synbiohub.org/wiki/Terms/igem#partType/Regulatory': '/glyphs/promoter.svg',
      'http://identifiers.org/so/SO:0000139': '/glyphs/ribosome-entry-site.svg',
      'http://identifiers.org/so/SO:0001978': '/glyphs/signature.svg',
      'http://identifiers.org/so/SO:0000299': '/glyphs/specific-recombination-site.svg',
      'http://identifiers.org/so/SO:0001955': '/glyphs/protein-stability-element.svg',
      'http://identifiers.org/so/SO:0001546': '/glyphs/protein-stability-element.svg',
      'http://identifiers.org/so/SO:0001979': '/glyphs/rna-stability-element.svg',
      'http://identifiers.org/so/SO:0000141': '/glyphs/terminator.svg',
      'http://wiki.synbiohub.org/wiki/Terms/igem#partType/Terminator': '/glyphs/terminator.svg',
      'http://identifiers.org/so/SO:0000110': '/glyphs/replacement-glyph.svg',
    }

    const maybeGlyph: string|undefined = roleToGlyph[role]
    return maybeGlyph ? maybeGlyph : '/glyphs/no-glyph-assigned.svg'
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

    let treeDivWidth = document.getElementById('tree-div').offsetWidth
    let treeDivHeight = 900 
    let treeMap = d3.tree().size([treeDivWidth, treeDivHeight])
    let tree = treeMap(data)

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
          .attr('stroke', d => (<TreeNode>d.data).color)
          .on('mouseover', this.highlightUpstream)
          .on('mouseout', this.removeHighlights)
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
                 .style('visibility', 'visible')

              this.div.html(this.hoverHTML(d))
                 .style("left", (d3.event.pageX + 25) + "px")
                 .style("top", (d3.event.pageY - 25) + "px")
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
      this.onClickTreeNode(d.data, this.assignGlyph(d.data['role']))
    })

    this.drawSequences(nodeDisplay)

    treeG.attr('transform', 'translate(0,100)')
  }

  private drawSequences(
    nodeDisplay: d3.Selection<d3.BaseType,
                              d3.HierarchyPointNode<{}>,
                              d3.BaseType,
                              {}>
  ) {
    const SEQUENCE_WIDTH = 55
    const SEQUENCE_HEIGHT = 15
    const X_OFFSET = -25
    const Y_OFFSET = 10

    const nodesWithChildren = nodeDisplay
      .filter(d => (<TreeNode>d.data).children.length > 0)
    const completeSequenceRect = nodesWithChildren
      .append('rect')
      .attr('width', SEQUENCE_WIDTH)
      .attr('height', SEQUENCE_HEIGHT)
      .attr('x', (d) => d.x+X_OFFSET)
      .attr('y', (d) => d.y+Y_OFFSET)
      .classed('sequence-rect', true)
    nodesWithChildren.each((d, i, nodes) => {
      const treeNode: TreeNode = (<TreeNode>d.data)
      treeNode.children.forEach((child: TreeNode, j) => {
        const correspondingD3Node = d.children[j]
        const [start, end] = child.range
        const scale = d3.scaleLinear()
                        .domain([0, treeNode.sequence.length])
                        .range([d.x+X_OFFSET, d.x+X_OFFSET+SEQUENCE_WIDTH])
        const subsequenceRects = d3.select(nodes[i])
          // correspondingD3Node is essential for proper highlighting.
          .data([correspondingD3Node])
          .append('rect')
          .classed('subsequence', true)
          .attr('width', () => scale(end)-scale(start))
          .attr('height', SEQUENCE_HEIGHT)
          .attr('x', () => scale(start))
          .attr('y', () => d.y+Y_OFFSET)
          .attr('fill', child.color)

        subsequenceRects.on('mouseover', this.highlightUpstream)
        subsequenceRects.on('mouseout', this.removeHighlights)
      })
    })
  }

  private highlightUpstream(d3Node: d3.HierarchyPointNode<TreeNode>) {
    const links = d3.select('#all-links')
                    .selectAll('path')
    const subsequences = d3.select('#all-nodes')
                           .selectAll('rect.subsequence')

    let src = d3Node
    let parent = src.parent
    while (parent !== null) {
      // highligh link
      links
        .filter((d: d3.HierarchyPointNode<TreeNode>) => {
          return d === src && d.parent === parent
        })
        .style('stroke-opacity', 1)
      // highlight subsequence
      subsequences
        .filter((d: d3.HierarchyPointNode<TreeNode>) => {
          return d === src && d.parent === parent
        })
        .style('opacity', 1)


      // climb
      src = parent
      parent = parent.parent
    }
  }

  private removeHighlights() {
    const links = d3.select('#all-links')
                    .selectAll('path')
                    .style('stroke-opacity', 0.5)
    const subsequences = d3.select('#all-nodes')
                           .selectAll('rect.subsequence')
                           .style('opacity', 0.5)
  }
}
