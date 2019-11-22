export default {
  data () {
    return {
      paddingRight: window.innerWidth <= 414 ? 80 : 48,
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
        .text('Centro/Governo')
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

      g.append('rect')
        .attr('height', 30)
        .attr('x', -78)
        .attr('y', -9)
        .attr('width', 107)
        .attr('fill', '#f7f7f7')
        .attr('stroke', 'gray')
        .attr('stroke-width', 0.1)

      var redGradient = svg
        .append('defs')
        .append('linearGradient')
        .attr('id', 'redGradient')
        .attr('x1', '0%')
        .attr('y1', '50%')
        .attr('x2', '100%')
        .attr('y2', '50%')

      redGradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#fc8a6b')
        .attr('stop-opacity', 1)

      redGradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#67000d')
        .attr('stop-opacity', 1)

      var blueGradient = svg
        .append('defs')
        .append('linearGradient')
        .attr('id', 'blueGradient')
        .attr('x1', '0%')
        .attr('y1', '50%')
        .attr('x2', '100%')
        .attr('y2', '50%')

      blueGradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#93c3df')
        .attr('stop-opacity', 1)

      blueGradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#08306b')
        .attr('stop-opacity', 1)

      g.append('rect')
        .attr('height', 4)
        .attr('x', -75)
        .attr('y', 10)
        .attr('width', 45)
        .attr('fill', 'url(#redGradient)')

      g.append('rect')
        .attr('height', 4)
        .attr('x', -75)
        .attr('y', 15)
        .attr('width', 45)
        .attr('fill', 'url(#blueGradient)')

      g.append('text')
        .attr('class', 'caption')
        .attr('y', 1)
        .attr('x', -75)
        .attr('fill', 'gray')
        .attr('font-size', 7)
        .attr('text-anchor', 'start')
        .attr('font-family', 'sans-serif')
        .text('Contribuição')

      g.append('text')
        .attr('class', 'caption')
        .attr('y', 8)
        .attr('x', -75)
        .attr('fill', 'gray')
        .attr('font-size', 7)
        .attr('text-anchor', 'start')
        .attr('font-family', 'sans-serif')
        .text('do autor')

      g.append('text')
        .attr('class', 'caption')
        .attr('y', 1)
        .attr('x', -15)
        .attr('fill', 'gray')
        .attr('font-size', 7)
        .attr('text-anchor', 'start')
        .attr('font-family', 'sans-serif')
        .text('Influência')

      g.append('text')
        .attr('class', 'caption')
        .attr('y', 8)
        .attr('x', -15)
        .attr('fill', 'gray')
        .attr('font-size', 7)
        .attr('text-anchor', 'start')
        .attr('font-family', 'sans-serif')
        .text('política')

      var radios = [1, 2, 3, 4, 5]
      var x0 = -18
      var padding = 2

      g.selectAll('circle')
        .data(radios)
        .enter()
        .append('circle')
        .attr('stroke', '#979899')
        .attr('stroke-width', 0.4)
        .attr('fill', '#f7f7f7')
        .attr('cx', r => (x0 = x0 + 2 * r + padding))
        .attr('cy', 15)
        .attr('r', r => r)
    }
  }
}
