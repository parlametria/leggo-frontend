<template>
  <div>
    <div v-for="(energia, i) in energias" :key="i">
        {{ energia }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TemaGraphic',
  props: {
      tema: String
  },
  computed: {
    energias() {
        let result = [];
        this.proposicoes.forEach((prop)=>{
            console.log(prop)
            prop.energias.forEach((energia) => {
                result.push({ 
                    id: prop.id_ext,
                    apelido: prop.apelido,
                    energia_recente: energia.energia_recente,
                    periodo: energia.periodo
                })
            })
        })
        return result;
    },
    ...mapState({
        proposicoes: state => {
            console.log(state.proposicoes.proposicoes)
            let result = state.proposicoes.proposicoes.filter((prop) => prop.tema === this.tema)
            result = result.map((prop)=> prop.lastEtapa)
        }
    })
  }
}
</script>

<style>
.vega-actions {
  display: none;
}
</style>
