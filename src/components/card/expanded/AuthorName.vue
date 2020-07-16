<template>
  <div>
    <el-popover width="200" placement="right-start" trigger="hover" :disabled="disabled">
      <span slot="reference" class="small-text-field small-margin-top">{{ formataAutores() }}</span>
      <span class="author" v-for="(autor, i) in author" :key="i">
        <h5>{{ formataNomeAutor(autor.autor) }}</h5>
      </span>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'AuthorName',
  props: {
    author: {
      type: Array,
      default: function () { return ['Autor não encontrado'] },
      validator: value => {
        return value != null
      }
    }
  },
  computed: {
    disabled () {
      return this.author.length === 1
    }
  },
  methods: {
    formatTooltip: function (data) {
      return data.replace(/,/g, '\n')
    },
    formataAutores: function () {
      if (this.author.length > 1) {
        return this.formataNomeAutor(this.author[0].autor) + ' e ' + (this.author.length - 1) + ' outros'
        } else {
          return this.formataNomeAutor(this.author[0].autor)
        }
    },
    formataNomeAutor: function (autor) {
      if (autor) {
        if (autor.is_parlamentar == 1) {
          let prefix = ""
          if (autor.casa == "camara") {
            prefix = "Dep."
          } else if (autor.casa == "senado") {
            prefix = "Sen."
          }

          return `${prefix} ${autor.nome} (${autor.partido}/${autor.uf})`
        } else {
          return autor.nome
        }
      } else {
        return "Autor não identificado"
      }
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
.author {
  font-size: 15px;
  white-space: pre-wrap;
  word-break: keep-all;
}
.tooltip:hover {
  text-decoration: underline;
}
</style>
