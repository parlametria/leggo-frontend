<template>

  <div>
    <el-popover
      width="200"
      placement="right-start"
      trigger="hover"
      :disabled="disabled"
    >
      <span
        slot="reference"
        class="small-text-field small-margin-top">{{ formataAutor() }}</span>
      <span
        class="author"
        v-for="(autor, i) in author"
        :key="i">
        <h5> {{ autor }} </h5>
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
    },
    casa: {
      type: String,
      default: ''
    }
  },
  computed: {
    normalizedAuthor () {
      return this.removeCasa(this.author)
    },
    disabled () {
      return this.author.length === 1
    }
  },
  methods: {
    removeCasa: function (author) {
      return author
    },
    containsMoreThanOneAuthor: function () {
      if (this.normalizedAuthor.includes(', ')) { return true }
      return false
    },
    formatTooltip: function (data) {
      return data.replace(/,/g, '\n')
    },
    formataAutor: function () {
      return this.author.length > 1 ? this.author[0] + ' e ' + this.author.length + ' outros ' : this.author[0]
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
