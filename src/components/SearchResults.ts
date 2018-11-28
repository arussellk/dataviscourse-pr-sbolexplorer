import * as d3 from 'd3'

export default class SearchResults {
  container: HTMLElement | null
  onClickSearchResult: (uri: string) => void

  constructor(
    onClickSearchResult: (uri: string) => void
  ) {
    this.container = document.getElementById('search-results')
    this.onClickSearchResult = onClickSearchResult
  }

  updateSearchResults(results) {
    this.clearSearchResults()
    
    let maxRelevance = results[0]._score
    let popularityScale = d3.scaleLinear()
                            .domain([0,maxRelevance])
                            .range([0,100])

    const children = results.map(x => {
      const node = document.createElement('div')
      node.className = 'list-group-item'
      node.innerText = x._source.displayId + '\n' + x._source.description
      node.onclick = this.clickSearchResult(`${x._source.subject}/${x._source.displayId}.xml`)

      // relevance/PageRank rectangles
      let canvas = document.createElement('canvas')
      //canvas.style.width='100%'
      //canvas.style.height='100%'
      canvas.width = 110
      canvas.height = 40
      canvas.style.position='absolute'
      canvas.style.left= '330px'
      canvas.style.top= '0'
      canvas.style.zIndex= '100000'

      let draw = canvas.getContext('2d')
      draw.rect(5, 5, popularityScale(x._score), 22)
      draw.fillStyle = 'lightblue'
      draw.fill()
      node.appendChild(canvas)

      return node
    })

    this.container.innerHTML = ''
    children.forEach(x => {
      this.container.appendChild(x)
    })
  }

  clearSearchResults() {
    this.container.innerHTML = ''
  }

  clickSearchResult(uri) {
    return () => {
      this.onClickSearchResult(uri)
    }
  }
}
