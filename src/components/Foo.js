export default class Foo {
  constructor() {
    d3.select('#sample')
      .append('svg')
      .append('circle')
      .attr('fill', 'black')
      .attr('r', 5)
      .attr('cx', 10)
      .attr('cy', 10)
  }
}
