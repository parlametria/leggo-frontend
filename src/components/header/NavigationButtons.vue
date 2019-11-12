<template>
  <div>
    <div>
      <input
        id="menu-hamburguer"
        type="checkbox"
        v-model="openMenu">
      <label for="menu-hamburguer" >
        <div class="menu" >
          <span class="hamburguer"/>
        </div>
      </label>
    </div>
    <div
      class="menubar"
      :class="{ menuexpanded: openMenu }">
      <router-link
        :to="{ name: 'semanarios' }"><span @click="closeMenu">Semanário</span></router-link>
      <router-link
        :to="{ name: 'ajuda' }"><span @click="closeMenu">Ajuda</span></router-link>
      <router-link
        :to="{ name: 'relatorios' }"><span @click="closeMenu">Relatórios</span></router-link>
      <router-link
        :to="{ name: 'sobre' }"><span @click="closeMenu">Sobre</span></router-link>
    </div>
  </div>

</template>

<script>
export default {
  name: 'NavigationButtons',
  data () {
    return {
      openMenu: false
    }
  },
  methods: {
    checkPage (page) {
      return this.$route.name === page
    },
    closeMenu () {
      this.openMenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.menubar {
  display: flex;
  flex-wrap: wrap;
    * {
        font-family: sans-serif;
        margin-right: 1rem;
        text-transform: uppercase;
        color: grey;
    }
    &:last-child {
        margin-right: 0;
    }
}

.router-link-exact-active {
  font-weight: bold;
}

input {
  display: none;
}

@media screen and (max-width: 450px) {
  .menubar {
    background: wheat;
    flex-wrap: nowrap;
    flex-direction: column;
    z-index: 1;
    position: absolute;
    right: 20px;
    top: 63px;
    width: 170px;
    height: 0px;
    overflow: hidden;
    -webkit-transition: height 1s, font-size 1s; /* For Safari 3.1 to 6.0 */
    transition: height 1s, font-size 1s;
    a {
      font-size: 18px;
      padding: 10px;
      display: block;
      white-space: nowrap;
    }
  }

  .menu {
    background: #fff;
    border-radius: 50%;
    width: 60px;
    height: 30px;
    position: fixed;
    top: 40px;
    right: 10px;
  }

  .hamburguer {
    position: relative;
    display: block;
    background: #000;
    width: 30px;
    height: 2px;
    transition: .5s ease-in-out;
  }

  .hamburguer:before,
  .hamburguer:after {
    background: #000;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    transition: .5s ease-in-out;
  }
  .menuexpanded {
    display: block;
    width: 170px;
    height: 170px;
  }

  .hamburguer:before {
    top: -10px;
  }

  .hamburguer:after {
    bottom: -10px;
  }

  input:checked ~ label .hamburguer {
    transform: rotate(45deg);
  }

  input:checked ~ label .hamburguer:before {
    transform: rotate(90deg);
    top: 0;
  }

  input:checked ~ label .hamburguer:after {
    transform: rotate(90deg);
    bottom: 0;
  }
}
</style>
