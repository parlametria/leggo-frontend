<template>
<div class="container">
  <p class="brand">
    {{ prop.apelido }}
  </p>
  <div class="end">
    <regime-tramitacao :regime="prop.regime_tramitacao"></regime-tramitacao>
    <forma-apreciacao :apreciacao="prop.forma_apreciacao"/>
    <el-popover
      placement="right"
      width="400"
      trigger="click">
      <el-table :data="gridData">
        <el-table-column width="100" property="data" label="data"></el-table-column>
        <el-table-column width="200" property="evento" label="notificação"></el-table-column>
        <el-table-column width="100" property="local" label="local"></el-table-column>
      </el-table>
      <el-badge slot="reference" :value="4">
        <el-button icon="el-icon-bell" size="medium" plain circle></el-button>
      </el-badge>
    </el-popover>
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
    gridData () {
      return [
        { data: '10-10-2010', evento: 'correu', local: 'praça' }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-end;
  padding: 0.5rem 0;
}
.container > .brand {
  margin-right: auto;
}
.container > .end > * {
  margin: 0 0.5rem;
}

@media only screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    justify-content: flex-start;
  }
  .container > .brand {
    margin-right: 0;
  }
}
</style>
