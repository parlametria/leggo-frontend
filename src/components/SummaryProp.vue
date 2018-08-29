<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Resumo da tramitação</span>
        </div>
        {{ resumo }}
    </el-card>
</template>

<script>
export default {
  name: 'SummaryProp',
  // props: ['resumo'],
  data () {
    return {
      resumo: 'A proposta de lei 490 de 2007 foi criada há mais de 11 anos...'
    }
  }
}
</script>
