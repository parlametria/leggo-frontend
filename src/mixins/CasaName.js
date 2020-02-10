const mixin = {
  methods: {
    capitalizeFirstLetter (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    getCasaFormattedName (etapa) {
      let casa = etapa.casa
      if (casa === 'camara') {
        casa = 'câmara'
      }
      return this.capitalizeFirstLetter(casa)
    }
  }
}
export default mixin
