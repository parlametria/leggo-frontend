<template>
    <el-card shadow="hover" class="box-card">
        <el-row>
            <el-col :span="6">
                <router-link :to="{ name: 'proposicaoDetails', params: { casa: prop.casa, idExt: prop.id_ext }}">
                {{ prop.apelido }}
                </router-link>
                <br>

                <ul class="fases inline-content">
                    <li
                        v-for="(event, j) in prop.resumo_tramitacao" :key="j"
                        :class="event.casa" :title="event.nome">
                    </li>
                </ul>
            </el-col>
            <el-col :span="6">
                <energy-graphic :date= "date" :visId= "visId" :id= "prop.id_ext" :casa= "prop.casa"/>
            </el-col>
            <el-col id="tags">
                <regime-tramitacao :regime="prop.regime_tramitacao"></regime-tramitacao>
                <forma-apreciacao :apreciacao="prop.forma_apreciacao"></forma-apreciacao>
                <el-tag v-if="prop.em_pauta" type="info" size="mini">Em pauta</el-tag>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import Energy from '@/components/Energy.vue'
import RegimeTramitacao from '@/components/RegimeTramitacao.vue'
import FormaApreciacao from '@/components/FormaApreciacao.vue'
import EnergyGraphic from '@/components/EnergyGraphic'
import { mapState } from 'vuex'

export default {
  name: 'proposicaoitem',
  components: {
    Energy,
    RegimeTramitacao,
    FormaApreciacao,
    EnergyGraphic
  },
  computed: mapState({
    dateFilter: state => state.dateFilter
  }),
  props: {
    prop: Object,
    visId: String,
    date: Date
  }
}
</script>

<style lang="scss">
.fases {
  display: inline-block;
  padding: 0;
  li {
    display: inline-block;
    width: 10px;
    height: 20px;
    margin: 3px;
  }
  .senado {
    background-color: #cbd5e8;
  }
  .camara {
    background-color: #b3e2cd;
  }
}
.box-card {
  width: auto;
}
.inline-content {
  display: inline-block;
}
a {
  text-decoration: none;
}

#tags {
  display: flex;
}

.el-tag {
  margin-right: 3px;
}
</style>
