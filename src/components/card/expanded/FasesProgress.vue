<template>
  <div>
    <ul class="progressbar">
      <el-tooltip
        placement="bottom"
        :value="tooltip(i)"
        v-for="(fase, i) in sortedFases"
        :key="i"
        effect="light">

        <div slot="content">
          <span class="title-text-field">Fase: </span>
          {{fase.fase_global}} - {{fase.local}}

          <br/>
          <span class="title-text-field">Casa: </span>
          <span class="casa-text-field">{{fase.local_casa}}</span>
          <br/>

          <span class="title-text-field" v-if="fase.data_inicio">Início: {{fase.data_inicio}}</span>
          <br/>
          <span class="title-text-field" v-if="fase.data_fim">Fim: {{fase.data_fim}}</span>
        </div>

        <li :class="styleFase(fase, i)"/>
      </el-tooltip>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FasesProgress',
  props: {
    fases: Array
  },
  data () {
    return {
      selectedFase: 0
    }
  },
  mounted () {
    this.selectedFase = this.indexOfFaseAtual
    this.inProgressFase = this.indexOfFaseAtual
  },

  methods: {
    styleFase (fase, i) {
      return {
        'active': this.isFinished(fase),
        'future': this.isFuture(fase),
        'jumped': this.isJumpedFase(fase),
        'inProgress': i === this.inProgressFase,
        'senado': fase.local_casa === 'senado',
        'camara': fase.local_casa === 'camara',
        'planalto': fase.local_casa === 'presidência da república' || fase.local_casa === 'congresso',
        'selectedFase': i === this.selectedFase
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
      return fase.pulou
    },

    isFuture (fase) {
      return fase.data_fim == null && fase.data_inicio == null && !this.isJumpedFase(fase)
    },

    tooltip (i) {
      return this.indexOfFaseAtual === i
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
    },
    indexOfFaseAtual () {
      const fases = this.sortedFases
      let result = 0
      while (result !== fases.length) {
        if (this.isFuture(fases[result])) {
          break
        }
        result++
      }
      return --result
    }
  }
}
</script>

<style lang="scss" scoped>
  .progressbar {
      counter-reset: step;
      padding: 0;
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
  // --- os before fazem os circulos, e os after as linhas ---

  .progressbar li:before {
      width: 30px;
      height: 30px;
      content: '';
      position: relative;
      counter-increment: step;
      display: block;
      margin: 0 auto 10px auto;
      background-position: left;
      background-size: cover;
      transition: transform .2s;
      border-style: solid;
      border-width: 1px;
      border-color: white;
      border-radius: 50%;
      cursor: pointer;
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
    opacity: 0.5;
    filter: alpha(opacity=50);
  }

  .planalto:before {
    background-image: url('../../../assets/planalto.png');
  }

  .jumped:before {
    background-image: url('../../../assets/vazio.png');
  }

  .selectedFase:before {
    transform: scale(1.7);
    z-index: 1;
  }
  .title-text-field{
    font-size: 12px;
    text-decoration-color: #000000;
    opacity: 0.5;
  }
  .casa-text-field{
    text-transform: uppercase;
  }

</style>
