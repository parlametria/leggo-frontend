<template>
<div></div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SeachInput',
  data () {
    return {
      isCollapse: true
    }
  },
  computed: {
    ...mapState({
      nomeProposicaoFilter: state => state.filter.nomeProposicaoFilter
    })
  },
  methods: {
    ...mapMutations([
      'filtraNomeProposicao'
    ])
  }
}
</script>

<style lang="scss" scoped>
form{
  position: relative;
  transform: translate(-50%,-50%);
  transition: all 1s;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 4px solid white;
  padding: 5px;
}

input{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;;
  height: 42.5px;
  line-height: 30px;
  outline: 0;
  border: 1px solid #999;
  display: none;
  font-size: 1em;
  border-radius: 20px;
  padding: 0 20px;
}

.fa{
  box-sizing: border-box;
  padding: 10px;
  width: 42.5px;
  height: 42.5px;
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid #999;
  border-radius: 50%;
  color: #07051a;
  text-align: center;
  font-size: 1.2em;
  transition: all 1s;
}

form{
  width: 200px;
  cursor: pointer;
}

.test{
  display: block;
}

</style>
