<template>
  <div
    :ref="`chatRoom__card--`"
    class="list__item chatCard"
  >
    <div class="chatCard__body mb-2">
      <img class="chatCard__img me-2" src="https://i.imgur.com/ZWHoRPi.png" />
      <div class="flex-grow-1">
        <p class="chatCard__title mb-1">名字</p>
        <p class="subTxt mb-1">招募職位：前端工程師</p>
        <p class="subTxt">您好，我們最近看到你在找工作...</p>
      </div>
    </div>
    <div class="chatCard__footer">
      <div class="chatCard__tagList">
        <p class="jobTag me-2">100%</p>
        <p class="jobTag">邀請面試</p>
      </div>
      <p class="subTxt--foil">2021/10/12</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
    };
  },
  mounted() {
    console.log(this.user);
  },
};
</script>
<style></style>
