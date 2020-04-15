<template>
  <div class="tagTemas">
    <el-tooltip
      placement="top"
      effect="dark"
      :disabled="disabled"
    >
      <div
        slot="content"
        v-for="(tema, i) in temas"
        :key="i">
        <h5> {{ tema }} </h5>
      </div>
      <span class="tag"> 
          {{ formataTemas() }}
      </span>
      
  </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'Temas',
  props: {
    temas: {
      type: Array,
      default () { return [] }
    }
  },
  computed: {
    disabled () {
      return this.temas.length === 1
    }
  },
  methods: {
    formataTemas: function () {
      return this.temas.length > 1 ? this.temas[0] + ' e +' + (this.temas.length - 1) : this.temas[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.tagTemas {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 9pt;
}
.tag {
    margin-left: 10px;
    border-radius: 5%;
}

@media (min-width: 321px) {
  .tagTemas {
    font-size: 12pt;
  }

}

</style>
