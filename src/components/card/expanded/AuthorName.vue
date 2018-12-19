<template>
    <div>
        <el-popover
            v-if="containsMoreThanOneAuthor()"
            width="200"
            placement="right-start"
            trigger="hover">
                <span slot="reference" class="tooltip">Vários...</span>
                Autores <br/>
                <span class="authors">{{formatTooltip(normalizedAuthor)}}</span>
         </el-popover>

        <div v-else class="author">
            {{normalizedAuthor}}
        </div>
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
    }
  },
  computed: {
    normalizedAuthor () {
      return this.removeCasa(this.author)
    }
  },
  methods: {
    removeCasa (author) {
      author = author.split(' - ')
      return author.pop()
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
.authors{
  white-space: pre-line;
  word-spacing: 1px;
  font-size: 12px;
}
.author {
    font-size: 15px;
}
.tooltip:hover {
    text-decoration: underline;
}
</style>
