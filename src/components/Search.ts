import SearchService from '../services/SearchService'
import SearchResults from './SearchResults'

const MIN_SEARCH_LENGTH = 3

export default class Search {
  input: HTMLInputElement | null
  searchResults: SearchResults
  onClickSearchResult: (uri: string) => void

  constructor(
    onClickSearchResult: (uri: string) => void
  ) {
    this.input = (<HTMLInputElement> document.getElementById('search-input'))
    this.input.addEventListener('input', this.handleInput.bind(this))

    this.searchResults = new SearchResults(onClickSearchResult)
  }

  async handleInput(e) {
    const value = e.target.value
    if (value && value.length >= MIN_SEARCH_LENGTH) {
      const results = await SearchService.getComponents(value, true)
      this.searchResults.updateSearchResults(results)
    } else {
      this.searchResults.clearSearchResults()
    }
  }
}
