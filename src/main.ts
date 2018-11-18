import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.css'

import Search from './components/Search'
import TreeService from './services/TreeService'
import Tree from './components/Tree'

(async () => {
  const treeData = await TreeService.createTree('https://synbiohub.org/public/igem/BBa_K1407008/1/BBa_K1407008.xml')
  console.log(tree)
  // second param indicates whether or not tree is loaded from local json...
  var tree = new Tree(treeData, false)
  // temporary tree display
  tree.createTree()
})()

const search = new Search((uri: string) => {
  console.log(`uri from main: ${uri}`)
})

// temporary data loading
search.input.value = 'green'
search.handleInput({ target: { value: 'green' }})


