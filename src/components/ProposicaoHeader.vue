<template>
    <div >
      <el-row :gutter="20">
        <el-col :span="6">
          <span>
            {{ prop.apelido }}
            <el-tag v-if="prop.em_pauta" type="info" size="mini">Em pauta</el-tag>
          </span>
        </el-col>
        <el-col :span="1" :offset="13">
          <regime-tramitacao :regime="prop.regime_tramitacao"></regime-tramitacao>
        </el-col>
        <el-col :span="2" :offset="0">
          <forma-apreciacao :apreciacao="prop.forma_apreciacao"/>
        </el-col>
        <el-col :span="1" :offset="0">
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
              <el-button type="info" icon="el-icon-bell" size="medium" plain circle></el-button>
            </el-badge>
          </el-popover>
      </el-col>
      </el-row>
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
  }
}
</script>

<style lang="scss" scoped>

</style>
