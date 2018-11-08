import Search from './components/Search.js'

const search = new Search()

// temporary data loading
search.input.value = 'green'
search.handleInput({ target: { value: 'green' }})
