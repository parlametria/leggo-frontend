const mixin = {
  data () {
    return {
      expandedDescriptions: []
    }
  },
  methods: {
    formatTextoTramitacao (textoParaSerColapsado, key, maxLength, tamanhoTextoInicial) {
      return this.isShowExpandIcon(textoParaSerColapsado, maxLength, key)
        ? `${textoParaSerColapsado.substring(0, maxLength - tamanhoTextoInicial)}... `
        : textoParaSerColapsado
    },
    toggleCollapseDescription (key) {
      if (!this.isExpanded(key)) {
        this.expandedDescriptions.push(key)
      } else {
        this.expandedDescriptions = this.expandedDescriptions.filter(currentKey => key !== currentKey)
      }
    },
    isExpanded (key) {
      return this.expandedDescriptions.findIndex(currentKey => currentKey === key) !== -1
    },
    isShowExpandIcon (textoParaSerColapsado, maxLength, key) {
      return textoParaSerColapsado.length > maxLength && !this.isExpanded(key)
    }
  }
}
export default mixin
