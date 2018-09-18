<template>
  <el-container>
    <el-container>
    <el-aside>
      <el-input id="el-input" placeholder="Pesquisar Projeto de Lei" prefix-icon="el-icon-search" v-model="text_searched"></el-input>
      <nav-menu v-model="text_searched"></nav-menu>
    </el-aside>
      <el-main class="el-main">
        <p v-if="pending.proposicoes">loading posts...</p>
        <p v-if="error.proposicoes">loading failed</p>
        <el-row>
          <el-col v-for="(tema, i) in temas" :key="i" :span="24 / temas.length">
            {{ tema }}
            <el-row :key="j" v-for="(prop,j) in filteredProps.filter((prop) => prop.tema == tema)">
              <proposicao-item :prop= prop />
            </el-row>
          </el-col>
      </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ProposicaoItem from '@/components/ProposicaoItem'
import NavMenu from '@/components/NavMenu'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'proposicoes',
  components: {
    ProposicaoItem,
    NavMenu
  },
  data () {
    return {
      text_searched: '',
      temas: ['Meio Ambiente', 'Agenda Nacional']
    }
  },
  mounted () {
    this.listProposicoes()
  },
  computed: mapState({
    proposicoes: state => state.proposicoes,
    pending: state => state.pending,
    error: state => state.error,
    filteredProps () {
      if (!this.text_searched) {
        return this.proposicoes
      }
      return this.proposicoes.filter((prop) => {
        return prop.apelido.toLowerCase().match(this.text_searched.toLowerCase())
      }
      )
    }
  }),
  methods: {
    ...mapActions([
      'listProposicoes'
    ])
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  margin: auto;
  align-items: center;
}
.el-row {
  margin: 5px;
}
.el-header{
  display: contents;
}
.el-aside{
  margin: 0px;
  padding: 0px;
}
</style>
