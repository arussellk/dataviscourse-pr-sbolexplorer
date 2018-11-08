import SearchService from '../services/SearchService.js'
import SearchResults from './SearchResults.js'

const MIN_SEARCH_LENGTH = 3

export default class Search {
  constructor() {
    this.input = document.getElementById('search-input')
    this.input.addEventListener('input', this.handleInput.bind(this))

    this.searchResults = new SearchResults()
  }

  async handleInput(e) {
    const value = e.target.value
    if (value && value.length > MIN_SEARCH_LENGTH) {
      const results = await SearchService.getComponents(value)
      this.searchResults.updateSearchResults(results)
    } else {
      this.searchResults.clearSearchResults()
    }
  }
}
