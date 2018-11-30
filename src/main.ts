import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.css'

import Search from './components/Search'
import TreeService from './services/TreeService'
import Tree from './components/Tree'
import NodeDetail from './components/NodeDetail'
import TreeNode from './models/TreeNode'

(async () => {
  // temporary tree display
  // const COMPONENT_ID = 'BBa_I5610'
  // const TREE_URL = `https://synbiohub.org/public/igem/${COMPONENT_ID}/1/${COMPONENT_ID}.xml`
  // const treeData = await TreeService.createTree(TREE_URL)
  // var tree = new Tree(treeData, nodeDetail.showDetailFor)
  // tree.createTree()

  // nodeDetail.showDetailFor(treeData, '/glyphs/engineered-region.svg')
})()

const nodeDetail = new NodeDetail()
nodeDetail.clearDetail()

const search = new Search(async (uri: string) => {
  const treeData: TreeNode = await TreeService.createTree(uri)
  const tree = new Tree(treeData, nodeDetail.showDetailFor)
  tree.createTree()

  nodeDetail.clearDetail()
})

// temporary data loading
const SEARCH_VALUE = 'rbs'
search.input.value = SEARCH_VALUE
search.handleInput({ target: { value: SEARCH_VALUE }})
