<template>
  <div class="container">
    <p class="brand">
      {{ prop.apelido }}
    </p>
    <div class="end">
      <regime-tramitacao :regime="prop.regime_tramitacao" class="regime_tramitacao"/>
      <forma-apreciacao :apreciacao="prop.forma_apreciacao" class="forma_apreciacao"/>
      <!-- <el-popover
        placement="right"
        width="300"
        trigger="click">
        <ul>
          <li v-for="(evento,i) in eventos" :key="i">
            {{ evento.data }} - {{ evento.evento }} - {{ evento.local }}
          </li>
        </ul>
        <el-badge slot="reference" :value="4">
          <el-button icon="el-icon-bell" size="medium" plain circle></el-button>
        </el-badge>
      </el-popover> -->
    </div>
  </div>
</template>

<script>
import RegimeTramitacao from '@/components/RegimeTramitacao.vue'
import FormaApreciacao from '@/components/FormaApreciacao.vue'

export default {
  name: 'proposicaoheader',
  props: {
    prop: Object
  },
  components: {
    RegimeTramitacao,
    FormaApreciacao
  },
  computed: {
    eventos () {
      return [
        { data: '10-10-2010', evento: 'Audiência pública', local: 'CCJ' },
        { data: '12-10-2010', evento: 'Outro evento', local: 'CAPADR' }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 0;
}
.container > .brand {
  margin-right: auto;
}
.container > .end > * {
  margin: 0 0.5rem;
}
el-propover p {
  border-bottom: 1px solid black;
}

@media only screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>
