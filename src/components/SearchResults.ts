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

    const children = results.map(x => {
      const node = document.createElement('div')
      node.className = 'list-group-item'
      node.innerText = x._source.displayId + '\n' + x._source.description
      node.onclick = this.clickSearchResult(`${x._source.subject}/${x._source.displayId}.xml`)
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
