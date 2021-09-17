<template>
  <div class="dropdown">
    <button
      class="btn position-relative"
      type="button"
      :id="`dropdownMenuButton--${menuName}`"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="jobIcon bi bi-three-dots"></i>
    </button>
    <ul class="dropDownMenu dropdown-menu" :aria-labelledby="`dropdownMenuButton--${menuName}`">
      <li class="dropDownMenu__item">編輯</li>
      <li class="dropDownMenu__item">調整排序</li>
      <li class="dropDownMenu__item" @click="deleteData">刪除</li>
    </ul>
  </div>
</template>
<script>
export default {
  emits: ['deleteData'],
  props: ['sendMenuName', 'sendActionName', 'sendIndex'],
  data() {
    return {
      menuName: '',
      actionName: '',
      index: '',
    };
  },
  watch: {
    sendMenuName: {
      deep: true,
      handler(newValue) {
        this.menuName = newValue;
      },
    },
    sendActionName: {
      deep: true,
      handler(newValue) {
        this.actionName = newValue;
      },
    },
    sendIndex: {
      deep: true,
      handler(newValue) {
        this.index = newValue;
      },
    },
  },
  methods: {
    deleteData() {
      const obj = {
        name: this.actionName,
        index: this.index,
      };
      console.log(obj);
      this.$emit('deleteData', obj);
    },
  },
  created() {
    this.index = this.sendIndex;
    this.menuName = this.sendMenuName;
    this.actionName = this.sendActionName;
  },
};
</script>

<style lang="scss"></style>
