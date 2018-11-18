import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.css'

import Search from './components/Search'
import TreeService from './services/TreeService'
import Tree from './components/Tree'
import NodeDetail from './components/NodeDetail'
import TreeNode from './models/TreeNode'

(async () => {
  // temporary tree display
  const treeData = await TreeService.createTree('https://synbiohub.org/public/igem/BBa_K1407008/1/BBa_K1407008.xml')
  var tree = new Tree(treeData)
  tree.createTree()

  nodeDetail.showDetailFor(treeData)
})()

const nodeDetail = new NodeDetail()
nodeDetail.clearDetail()

const search = new Search(async (uri: string) => {
  const treeData: TreeNode = await TreeService.createTree(uri)
  const tree = new Tree(treeData, false)
  tree.createTree()
})

// temporary data loading
const SEARCH_VALUE = 'gfp'
search.input.value = SEARCH_VALUE
search.handleInput({ target: { value: SEARCH_VALUE }})


