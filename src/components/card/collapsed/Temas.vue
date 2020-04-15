<template>
  <div class="tagTemas">
    <div>
      <span class="tag">{{ formataTemas() }}</span>
    </div>
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
