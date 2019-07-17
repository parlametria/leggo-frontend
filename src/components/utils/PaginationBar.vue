<template>
  <div class="pagination">
    <button
      :class="getClassPrevious()"
      @click="addPageCount">&laquo;</button>
    <button
      v-if="window.initial !== 0"
      @click="backActualToLimit">...</button>
    <button
      v-for="page in getWindow"
      :key="page"
      :class="getClassBtn(page)"
      @click="changeOption(page)"
      v-if="page < window.final"
    >{{ page + 1 }}</button>
    <button
      v-if="size - actual > limit"
      @click="skipActualToLimit">...</button>
    <button
      :class="getClassNext()"
      @click="removePageCount">&raquo;</button>
  </div>
</template>
<script>
export default {
  name: 'PaginationBar',
  props: {
    size: {
      type: Number,
      default: 5
    },
    limit: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      actual: 0,
      window: {
        initial: 0,
        final: this.limit
      }
    }
  },
  methods: {
    getClassBtn (index) {
      return {
        active: index === this.actual,
        option: true
      }
    },
    changeOption (index) {
      this.actual = index
    },
    getClassPrevious () {
      return {
        disable: this.actual === 0,
        previous: true
      }
    },
    getClassNext () {
      return {
        disable: this.actual === this.size - 1,
        next: true
      }
    },
    addPageCount () {
      if (this.actual > 0) {
        this.actual--
      }
    },
    removePageCount () {
      if (this.actual < this.size - 1) {
        this.actual++
      }
    },
    skipActualToLimit () {
      this.actual = this.window.final
    },
    backActualToLimit () {
      this.actual -= this.actual - this.window.initial + 1
    }
  },
  computed: {
    getWindow () {
      let result = []
      for (let i = this.window.initial; i !== Math.min(this.window.final, this.size); i++) {
        result.push(i)
      }
      return result
    }
  },
  watch: {

    actual (newValue, oldValue) {
      if (newValue === this.window.final) {
        this.window.initial = newValue
        this.window.final = newValue + this.limit
      } else if (newValue === this.window.initial - 1) {
        this.window.final = newValue + 1
        this.window.initial = newValue - this.limit + 1
      }
      this.$emit('change', newValue)
    }
  }
}
</script>
<style scoped lang='scss'>
@import "@/base.scss";
.pagination {
  display: flex;
  justify-content: center;
}

.pagination button {
  color: black;
  background-color: white;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  border: 1px solid #ddd;
}

.disable {
  cursor: not-allowed;
  background-color: #ddd !important;
}

.option.active {
  background-color:  $--color-primary;
  color: white;
  border: 1px solid  $--color-primary;
}

.option:hover:not(.active) {
  background-color: #ddd;
  cursor: pointer;
}

.previous {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.next {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
