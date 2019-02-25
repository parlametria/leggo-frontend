<template>
  <div v-click-outside="hide">
    <button type="button" v-show="!open" class="open-btn" @click="open = true">
      <i class="el-icon el-icon-menu"></i>
    </button>
    <div :class="{ collapsed: !open }" class="collapsable-menu">
      <button
        type="button"
        class="close-btn"
        aria-label="Close"
        @click="hide">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>
      <el-menu mode="vertical">
        <el-menu-item index="1" class="menu-route-link">
          <router-link :to="{ name: 'sobre' }">Sobre</router-link>
        </el-menu-item>

        <el-menu-item index="2" class="menu-route-link">
          <router-link :to="{ name: 'proposicoes' }">Proposições</router-link>
        </el-menu-item>
      </el-menu>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      open: false
    }
  },
  methods: {
    hide () {
      this.open = false
    },
  }
}
</script>

<style lang="scss" scopped>
@import "@/base.scss";

.close-btn, .open-btn {
  display: none;
}
.collapsable-menu {
    min-width: 300px;
    transition: all 1s;
}
@media (max-width: $nav-menu-break-width) {
  .collapsable-menu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: white;
    overflow-y: auto;
    height: 100vh;
    padding: 0;
    padding-top: 55px;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px black;
  }
  .collapsed {
    transform: translateX(-110%);
  }
  .close-btn {
    display: block;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 30px;
  }
  .open-btn {
    display: block;
    position: fixed;
    right: 0;
    width: 40px;
    height: 40px;
    padding: 0;
    margin: 0;
    border: 0;
    font-size: 30px;
    z-index: 90;
    cursor: pointer;
    background: white;
  }
}
.menu-route-link {
  a {
    outline: none;
    transition: all .3s;
    font-size: 14pt;
  }
  .router-link-active {
    padding-left: 1em;
  }
}
</style>
