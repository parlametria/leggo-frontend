<template>
  <div>
    <el-tabs>
      <el-tab-pane label="Geral">
        <atores-graphic
          :atores="atores"
          :casa="casa"
          :sigla="sigla"/>
      </el-tab-pane>
      <el-tab-pane
        :label="index"
        v-for="(atores_comissoes, index) in atoresLocaisPercorridos"
        :key="index">
        <atores-graphic :atores="atores_comissoes" />
      </el-tab-pane>
    </el-tabs>
    <router-link :to="linkAtores">
      <el-button class="btn" >Veja mais</el-button>
    </router-link>
  </div>
</template>

<script>
import AtoresGraphic from './AtoresGraphic.vue'
import mixin from '@/mixins/CasaName.js'
import _ from 'lodash'

export default {
  name: 'TabAtoresGraphic',
  mixins: [mixin],
  props: {
    top_atores: {
      type: Array,
      default: undefined
    },
    top_important_atores: {
      type: Array,
      default: undefined
    },
    casa: {
      type: String,
      default: ''
    },
    sigla: {
      type: String,
      default: ''
    },
    id_leggo: {
      type: Number,
      default: -1
    },
    apelido: {
      type: String,
      default: ''
    },
    etapas: {
      type: Array,
      default () { return [] }
    }
  },
  components: {
    AtoresGraphic
  },
  methods: {
    formataLocal (value) {
      if (value.toLowerCase().includes('plen')) {
        return value.replace('PLEN', 'Plenário')
      } else if (/\d/.test(value)) {
        return value.concat(' - ', 'Com. Especial')
      } else {
        return value
      }
    },
    getAtoresComissaoEspecial (atoresLocais) {
      let comEsp
      for (let local of Object.keys(atoresLocais)) {
        if (local.includes('Com. Especial')) {
          comEsp = local
        }
      }
      return comEsp
    }
  },
  computed: {
    atores () {
      if (this.top_atores) {
        return this.top_atores
      }
    },
    linkAtores () {
      return {
        name: 'atores',
        params: {
          id_leggo: this.id_leggo,
          apelido: this.apelido
        }
      }
    },
    comissoesPassadas () {
      let comissoesPassadasGeral = []
      for (let etapa of this.etapas) {
        if (etapa.comissoes_passadas.length > 0) {
          for (let comissaoPassada of _.reverse(etapa.comissoes_passadas)) {
            let formattedCasaName = this.getCasaFormattedName(etapa)
            comissoesPassadasGeral.push(comissaoPassada + ' - ' + formattedCasaName)
          }
        }
      }
      return comissoesPassadasGeral
    },
    atoresLocaisImportantes () {
      let atoresLocais = {}
      if (this.top_important_atores) {
        for (let ator of this.top_important_atores) {
          let siglaLocalFormatada = this.formataLocal(ator.sigla_local_formatada)
          if (Object.keys(atoresLocais).includes(siglaLocalFormatada)) {
            atoresLocais[siglaLocalFormatada].push(ator)
          } else {
            atoresLocais[siglaLocalFormatada] = []
            atoresLocais[siglaLocalFormatada].push(ator)
          }
        }
      }
      // console.log('Locais Atores Importantes:')
      // console.log(atoresLocais)
      return atoresLocais
    },
    atoresLocaisPercorridos () {
      let atoresLocaisPercorridos = {}
      console.log('Comissões Percorridas/A percorrer:' + this.comissoesPassadas)
      console.log('Locais Atores Importantes:' + this.atoresLocaisImportantes)
      for (let etapa of this.etapas) {
        console.log('Etapa:' + etapa.sigla)
        for (let comissao of _.reverse(this.comissoesPassadas)) {
          console.log('Comissão:' + comissao)
          let comissaoPareada = false
          if (comissao.includes('Comissão Especial')) {
            let comEspecial = this.getAtoresComissaoEspecial(this.atoresLocaisImportantes)
            if (comEspecial) {
              atoresLocaisPercorridos[comissao] = this.atoresLocaisImportantes[comissao]
              comissaoPareada = true
              console.log('Comissão pareada!')
            }
          } else {
            for (let local of Object.keys(this.atoresLocaisImportantes)) {
              console.log(local)
              if (comissao === local) {
                atoresLocaisPercorridos[comissao] = this.atoresLocaisImportantes[comissao]
                comissaoPareada = true
                console.log('Comissão pareada!')
              }
            }
          }
          if (!comissaoPareada) {
            console.log('Comissão NÃO pareada!')
            atoresLocaisPercorridos[comissao] = []
          }
        }
        let locaisExtras = Object.keys(this.atoresLocaisImportantes).filter(x => this.comissoesPassadas.includes(x))
        console.log('Locais Extras: ' + locaisExtras)
        for (let localExtra of locaisExtras) {
          atoresLocaisPercorridos[localExtra] = this.atoresLocaisImportantes[localExtra]
        }
      }
      // for (let comissaoPassada of this.comissoesPassadas) {
      //   console.log(comissaoPassada)
      //   if (comissaoPassada.includes('Comissão Especial')) {
      //     let comEspecial = this.getAtoresComissaoEspecial(this.atoresLocaisImportantes)
      //     if (!comEspecial) {
      //       atoresLocaisPercorridos[comissaoPassada] = []
      //     } else {
      //       atoresLocaisPercorridos[comissaoPassada] = this.atoresLocaisImportantes[comEspecial]
      //     }
      //   } else {
      //     if (!Object.keys(this.atoresLocaisImportantes).includes(comissaoPassada)) {
      //       atoresLocaisPercorridos[comissaoPassada] = []
      //     } else {
      //       atoresLocaisPercorridos[comissaoPassada] = this.atoresLocaisImportantes[comissaoPassada]
      //     }
      //   }
      // }
      console.log('Locais Percorridos:')
      console.log(atoresLocaisPercorridos)
      return atoresLocaisPercorridos
    }
  }
}
</script>
