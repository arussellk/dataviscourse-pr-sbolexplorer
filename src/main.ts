import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.css'

import Search from './components/Search'
import TreeService from './services/TreeService'
import Tree from './components/Tree'

(async () => {
  // temporary tree display
  const treeData = await TreeService.createTree('https://synbiohub.org/public/igem/BBa_K1407008/1/BBa_K1407008.xml')
  var tree = new Tree(treeData)
  tree.createTree()
})()

const search = new Search(async (uri: string) => {
  const treeData = await TreeService.createTree(uri)
  const tree = new Tree(treeData, false)
  tree.createTree()
})

// temporary data loading
search.input.value = 'green'
search.handleInput({ target: { value: 'green' }})


