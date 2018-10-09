<template>
    <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :xs="20" :sm="12" :md="8" :lg="8" :xl="6" > 
            <el-row v-for="(tema, i) in temas" :key="i">
                <router-link :to="`/temas/${tema}`">
                    <el-card >
                    {{ tema }}
                    </el-card>
                </router-link>
            </el-row>
        </el-col>
    </el-row>
</template>


<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'temas',
  data () {
    return {
      temas: ['Meio Ambiente', 'Agenda Nacional']
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
