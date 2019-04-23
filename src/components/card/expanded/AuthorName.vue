<template>

        <div>
          <el-popover
            width="200"
            placement="right-start"
            trigger="hover">
            <span slot="reference" class="small-text-field small-margin-top">Veja aqui</span>
            <span class="author" v-for="(autor, i) in author" :key="i">
              <h5>{{autor}} </h5>
            </span>
          </el-popover>

        </div>
</template>

<script>
export default {
  name: 'AuthorName',
  props: {
    author: {
      type: String,
      default: 'Autor não encontrado',
      validator: value => {
        return value != null
      }
    },
    casa: String
  },
  computed: {
    normalizedAuthor () {
      return this.removeCasa(this.author)
    }
  },
  methods: {
    removeCasa (author) {
      return author
    },
    containsMoreThanOneAuthor () {
      if (this.normalizedAuthor.includes(', ')) { return true }
      return false
    },
    formatTooltip (data) {
      return data.replace(/,/g, '\n')
    }
  }
}
</script>

<style lang="scss" scoped>
.authors {
  white-space: pre-line;
  word-spacing: 1px;
  font-size: 12px;
}
.casa {
  font-size: 10pt;
  color: gray;
  margin: 0;
}
.author {
    font-size: 15px;
}
.tooltip:hover {
    text-decoration: underline;
}
</style>
