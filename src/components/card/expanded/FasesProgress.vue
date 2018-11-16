<template>
    <div class="container">
        <ul class="progressbar">
            <li v-for="(fase, i) in sortedFases" :key="i" :class="styleFase(fase)"/>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'FasesProgress',
  props: {
    fases: Array
  },
  methods: {
    styleFase (fase) {
      return {
        'active': this.isFinished(fase),
        'future': this.isFuture(fase),
        'jumped': this.isJumpedFase(fase),
        'inProgress': this.isInProgress(fase),
        'senado': fase.local_casa === 'senado',
        'camara': fase.local_casa === 'camara',
        'planalto': fase.local === 'Plenário' && fase.local_casa === 'congresso'
      }
    },
    isInProgress (fase) {
      const now = Date.now()
      return (fase.data_inicio != null && fase.data_fim == null) || new Date(fase.data_fim) > now
    },

    isFinished (fase) {
      const now = Date.now()
      return fase.data_fim != null && new Date(fase.data_fim) < now
    },

    isJumpedFase (fase) {
      const numberOfFases = this.sortedFases.length
      let index = this.sortedFases.indexOf(fase)
      if (this.isFinished(fase)) { return false }
      for (let j = index + 1; j < numberOfFases; j++) {
        if (this.isFinished(this.sortedFases[j])) { return true }
      }

      return false
    },

    isFuture (fase) {
      return fase.data_fim == null && fase.data_inicio == null
    }
  },
  computed: {
    sortedFases () {
      let sortOrder = { 'Comissões - Construção': '1',
        'Plenário - Construção': '2',
        'Comissões - Revisão I': '3',
        'Plenário - Revisão I': '4',
        'Comissões - Revisão II': '5',
        'Plenário - Revisão II': '6',
        'Presidência da República - Sansão/Veto': '7',
        'Congresso - Avaliação dos Vetos': '8' }
      return this.fases.slice().sort((a, b) => {
        let indexA = a.local + ' - ' + a.fase_global
        let indexB = b.local + ' - ' + b.fase_global
        return (sortOrder[indexA] - sortOrder[indexB])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
      width: -webkit-fill-available;
  }
  .progressbar {
      counter-reset: step;
  }
  .progressbar li {
      list-style-type: none;
      width: 12%;
      float: left;
      font-size: 12px;
      position: relative;
      text-align: center;
      text-transform: uppercase;
      color: black;
  }
  // os before fazem as linhas, e os after os circulos

  .progressbar li:before {
      width: 40px;
      height: 40px;
      content: '';
      counter-increment: step;
      display: block;
      margin: 0 auto 10px auto;
      background-position: left;
      background-size: cover;
      transition: transform .2s;
  }

  .progressbar li:after { //linha
      width: 100%;
      height: 2px;
      content: '';
      position: absolute;
      background-color: #DC6060;
      top: 15px;
      left: -50%;
      z-index: -1;
  }
  .progressbar li:first-child:after {
      content: none;
  }
  .camara:before {
    background-image: url('../../../assets/camara.png');
    background-position: left;
    background-size: cover;
  }
  .senado:before {
    background-image: url('../../../assets/senado.png');
  }

  .future:before {
    background-image: url('../../../assets/vazio.png');
  }

  .planalto:before {
    background-image: url('../../../assets/planalto.png');
  }

  .jumped:before {
    background-image: url('../../../assets/vazio.png');
  }
  .progressbar li:hover:before {
    transform: scale(1.5);
  }

</style>
