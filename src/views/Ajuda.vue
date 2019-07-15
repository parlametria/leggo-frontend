<template>
  <div>
    <div class="ajuda-sm">
      <img
        :src="require(`@/assets/ajuda_mobile.png`)"
        class="responsive"
        alt="">
    </div>
    <div class="ajuda-lg">

      <template>
        <div class="block">
          <el-carousel
            height="500px"
            :interval="5000"
            arrow="always"
            :autoplay="false"
            :loop="false">
            <el-carousel-item
              v-for="item in 5"
              :key="item">
              <img
                :src="require(`@/assets/ajuda0${item}.jpg`)"
                class="responsive"
                alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </template>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Ajuda'
}
</script>

<style lang="scss" scoped>
@import "@/base.scss";
.responsive {
  width: 100%;
  height: auto;
}
.center {
  text-align: center;
}
@media screen and (max-width: 1270px) {
  .ajuda {
    margin: 0 1rem;
  }
}
@media (min-width: 576px) {
  .ajuda-sm {
    display: none;
  }
  .ajuda-lg {
    display: block;
  }
}
@media (max-width: 575.98px) {
  .ajuda-sm {
    display: block;
  }
  .ajuda-lg {
    display: none;
  }
}
</style>
