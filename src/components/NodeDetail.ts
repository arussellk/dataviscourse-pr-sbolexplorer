import TreeNode from '../models/TreeNode'

export default class NodeDetail {
  private container: HTMLElement

  constructor() {
    this.container = document.getElementById('node-detail')
  }

  clearDetail = () => {
    this.container.innerHTML = ''
  }

  showDetailFor = (treeNode: TreeNode, glyphPath: string) => {
    this.container.innerHTML = `
    <div class="card card-body">
      <h2>${treeNode.name}</h2>
      <p><i>${treeNode.displayId}</i> <br> Version ${treeNode.version}</p>
      <p><image src="${glyphPath}" align="left"></p>
      <p><b>Source: </b>
        <a href="${treeNode.uri}" target="_blank" rel="noopener">${treeNode.uri}</a>
      </p>
      <p><b>Description: </b>${treeNode.description}</p>
      <p><b>Type: </b>${treeNode.type}</p>
      <p><b>Role: </b>${treeNode.role}</p>
      <p><b>Sequence: </b><p>
      <div style="height:250px;width:340px;overflow:auto;">
        ${treeNode.sequence}
      </div>
    </div>
    `
  }
}
