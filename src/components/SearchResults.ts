export default class SearchResults {
  container: HTMLElement | null

  constructor() {
    this.container = document.getElementById('search-results')
  }

  updateSearchResults(results) {
    this.clearSearchResults()

    const children = results.map(x => {
      const node = document.createElement('div')
      node.className = 'list-group-item'
      node.innerText = x._source.description
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
}
