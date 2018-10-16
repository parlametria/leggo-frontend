<template>
    <div >
      <el-row :gutter="20" type="flex" justify="space-between">
        <el-col :xs="5" :sm="10" :md="10" :lg="10">
          <div>
            {{ prop.apelido }}
          </div>
        </el-col>
        <el-col :xs="{span:1 ,offset: 1}" :sm="{span: 1, offset: 2}" :md="{span: 1, offset: 6}" :lg="{span: 2, offset: 14}">
            <regime-tramitacao :regime="prop.regime_tramitacao"></regime-tramitacao>
        </el-col>
        <el-col :xs="1" :sm="1" :md="1" :lg="2" >
          <forma-apreciacao :apreciacao="prop.forma_apreciacao"/>
        </el-col>
        <el-col :xs="1" :sm="2" :md="4" :lg="2" >
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
