<template>
  <el-tooltip :content="`${atualFase.local} - ${atualFase.fase_global}`">
    <span class="fase_atual_block" :class="geraEstilo(atualFase)">
    {{ atualFase.sigla_fase }}
    </span>
  </el-tooltip>
</template>

<script>
export default {
  name: 'FaseAtualBlock',
  props: {
    fases: Array
  },
  methods: {
    geraEstilo (fase) {
      return {
        'faseSenado': fase.local_casa === 'senado',
        'faseCamara': fase.local_casa === 'camara'
      }
    }
  },
  computed: {
    atualFase () {
      let fasesDictionaty = { 'Comissões - Construção': 'C1',
        'Plenário - Construção': 'P1',
        'Comissões - Revisão I': 'C2',
        'Plenário - Revisão I': 'P2',
        'Comissões - Revisão II': 'C3',
        'Plenário - Revisão II': 'P3',
        'Presidência da República - Sansão/Veto': 'PR',
        'Congresso - Avaliação dos Vetos': 'AV' }

      let atualFase = ''

      this.fases.forEach(fase => {
        if (fase.data_inicio) { // TODO: Descomentar isso quando a fase atual tiver data_fim null && fase.data_fim == null){
          atualFase = fase
        }
      })

      atualFase.sigla_fase = fasesDictionaty[atualFase.local + ' - ' + atualFase.fase_global]

      return atualFase
    }
  }
}
</script>

<style lang="scss" scopped>

.fase_atual_block{
  padding: 6px;
  display: inline-block;
  color: #616366;
  border-radius: 4px;
  }
.fase_atual_block.faseSenado{
    background-color: #a6cee3;
}
.fase_atual_block.faseCamara{
    background-color: #b2df8a;
}

</style>
