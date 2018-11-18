import TreeNode from '../models/TreeNode'

export default class NodeDetail {
  private container: HTMLElement

  constructor() {
    this.container = document.getElementById('node-detail')
  }

  clearDetail() {
    this.container.innerHTML = ''
  }

  showDetailFor(treeNode: TreeNode) {
    this.container.innerHTML = `
    <div class="card card-body">
      <h2>${treeNode.name}</h2>
      <p class="font-italics">${treeNode.name} Version ${treeNode.version}</p>
      <p>Source:
        <a href="${treeNode.uri}" target="_blank">${treeNode.uri}</a>
      </p>
    </div>
    `
  }
}
