import Search from './components/Search'

import TreeService from './services/TreeService'

(async () => {
  const tree = await TreeService.createTree('https://synbiohub.org/public/igem/BBa_K1407008/1/BBa_K1407008.xml')
})()

/*
const search = new Search()

// temporary data loading
search.input.value = 'green'
search.handleInput({ target: { value: 'green' }})
*/
