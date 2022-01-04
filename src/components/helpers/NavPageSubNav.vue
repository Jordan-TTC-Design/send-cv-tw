<template>
  <div class="pageSubNav">
    <ul class="innerNav innerNav--fill innerNav--jobSeeker innerNav--single">
      <li
        v-for="listItem in navList"
        :key="listItem"
        class="innerNav__item"
        :class="{ active: this.navListState === listItem.value }"
        @click="changeNavState(listItem.value)"
      >
        <p>{{ listItem.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['navList', 'pageSubNavState'],
  emits: ['update:pageSubNavState'],
  data() {
    return {
      navListState: '',
    };
  },
  methods: {
    changeNavState(state) {
      this.navListState = state;
      this.$emit('update:pageSubNavState', state);
    },
  },
  mounted() {
    this.navListState = this.pageSubNavState;
  },
};
</script>
<style></style>
