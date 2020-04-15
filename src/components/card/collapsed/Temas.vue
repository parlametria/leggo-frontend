<template>
  <div class="tagTemas">
    <el-popover
      width="220"
      placement="right-start"
      trigger="hover"
      :disabled="disabled"
    >
      <span slot="reference">{{ formataTemas() }}</span>
      <span
        v-for="(tema, i) in temas"
        :key="i">
        <h5> {{ tema }} </h5>
      </span>
  </el-popover>
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
      return this.temas.length > 1 ? this.temas[0] + ' e +' + this.temas.length : this.temas[0]
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
