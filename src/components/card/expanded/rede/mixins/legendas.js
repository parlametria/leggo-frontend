export default {
  data () {
    return {
      paddingRight: window.innerWidth <= 414 ? 50 : 30,
      fontSize: window.innerWidth <= 414 ? 10 : 6
    }
  },
  methods: {
    createLegends () {
      const {
        svg,
        width,
        fontSize,
        paddingRight,
        height
      } = this
      svg
        .select('.everything')
        .append('text')
        .style('fill', 'gray')
        .text('Governo')
        .attr('font-family', 'sans-serif')
        .attr('font-size', fontSize)
        .attr('x', width - paddingRight)
        .attr('y', height - 10)

      svg
        .append('text')
        .style('fill', 'gray')
        .text('Oposição')
        .attr('font-family', 'sans-serif')
        .attr('font-size', fontSize)
        .attr('y', height - 10)

      const g = svg
        .append('g')
        .attr('transform', 'translate(' + (width - 30) + ',' + 10 + ')')

      var gradient = svg
        .append('defs')
        .append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%')
        .attr('y1', '50%')
        .attr('x2', '100%')
        .attr('y2', '50%')

      gradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#D9DCEB')
        .attr('stop-opacity', 1)

      gradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#3E1D7E')
        .attr('stop-opacity', 1)

      g.append('rect')
        .attr('height', 4)
        .attr('x', -15)
        .attr('y', 2)
        .attr('width', 40)
        .attr('fill', 'url(#gradient)')

      g.append('text')
        .attr('class', 'caption')
        .attr('y', 1)
        .attr('x', -15)
        .attr('fill', '#000')
        .attr('font-size', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .attr('font-family', 'sans-serif')
        .text('Contribuição do autor')

      g.append('text')
        .attr('class', 'caption')
        .attr('y', 19)
        .attr('x', -15)
        .attr('fill', '#000')
        .attr('font-size', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .attr('font-family', 'sans-serif')
        .text('Influência Política')

      var radios = [1, 2, 3, 4, 5]
      var x0 = -18
      var padding = 2

      g.selectAll('circle')
        .data(radios)
        .enter()
        .append('circle')
        .attr('fill', '#7566ae')
        .attr('cx', r => (x0 = x0 + 2 * r + padding))
        .attr('cy', 25)
        .attr('r', r => r)
    }
  }
}
