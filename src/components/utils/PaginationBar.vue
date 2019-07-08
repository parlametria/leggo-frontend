<template>
  <div class="pagination">
    <button :class="getClassPrevious()" @click="addPageCount">&laquo;</button>
    <button
      v-for="(page, i) in size" :key="i"
      :class="getClassBtn(i)"
      @click="changeOption(i)"
    >{{ i + 1 }}</button>
    <button :class="getClassNext()" @click="removePageCount">&raquo;</button>
  </div>
</template>
<script>
export default {
  name: 'PaginationBar',
  props: {
    size: Number
  },
  data () {
    return {
      actual: 0
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
    }
  },
  watch: {
    actual (newValue, oldValue) {
      this.$emit('change', newValue)
    }
  }
}
</script>
<style scoped lang='scss'>
@import "@/base.scss";
.pagination {
  display: inline-block;
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
