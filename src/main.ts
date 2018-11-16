import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.css'

import Search from './components/Search'
import TreeService from './services/TreeService'
import Tree from './components/Tree'

(async () => {
  const treeData = await TreeService.createTree('https://synbiohub.org/public/igem/BBa_K1407008/1/BBa_K1407008.xml')
  console.log(tree)
  // temporary tree data loading from mock
  var tree = new Tree(treeData, true)
  // temporary tree display
  tree.createTree()
})()

const search = new Search()

// temporary data loading
search.input.value = 'green'
search.handleInput({ target: { value: 'green' }})


