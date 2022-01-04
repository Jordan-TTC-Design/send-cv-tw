<template>
  <ul
    class="innerNav"
    :class="{
      'innerNav--jobSeeker': !navSetting.style,
      'innerNav--company': navSetting.style,
      'innerNav--fill': navSetting.full,
      'innerNav--bgColor':navSetting.bg,
      'innerNav--nonRound':!navSetting.rounded,
    }"
  >
    <li
      v-for="listItem in navList"
      :key="listItem"
      class="innerNav__item"
      :class="{
        active: navListState === listItem.value,
        'w--50': navList.length === 2 && navSetting.full,
      }"
      @click="changeNavState(listItem.value)"
    >
      <p>{{ listItem.title }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['navList', 'boxNavState', 'navSetting'],
  emits: ['update:boxNavState'],
  data() {
    return {
      navListState: '',
    };
  },
  methods: {
    changeNavState(state) {
      this.navListState = state;
      this.$emit('update:boxNavState', state);
    },
  },
  mounted() {
    this.navListState = this.boxNavState;
  },
};
</script>
<style></style>
