<template>
  <div class="container-fuild">
    <div class="w-100 position-fixed h-100 top-0 bg-dark"></div>
    <div class="row">
      <div class="col-12 d-flex justify-content-center bg-dark">
        <div class="w-100 position-fixed top-50 start-50 translate-middle" ref="svgContainer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import lottie from 'lottie-web';
import * as jsonData from '@/assets/images/404/404.json';

export default {
  // components: {
  //   lottie,
  // },
  data() {
    return {
      anim: {},
    };
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.svgContainer,
      renderer: 'svg',
      loop: true,
      animationData: jsonData.default,
      // assetsPath: '@/assets/images/404/images',
    });
    this.anim.play();
  },
};
</script>

<style lang="scss"></style>
