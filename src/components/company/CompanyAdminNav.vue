<template>
  <div ref="adminSubHeader" class="admin__subHeader mb-6 box--shadow">
    <div class="container">
      <ul v-if="adminMainSection === '企業中心'" class="admin__subNav admin__subNav--company">
        <li class="d-flex align-items-center d-md-flex d-none">
          <h2 class="admin__subNav__title">企業中心</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('company-over-view')"
          :class="{ active: subTopNav === '總覽' }"
        >
          <p class="admin__subNav__txt me-1">總覽</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('company-info')"
          :class="{ active: subTopNav === '企業資料' }"
        >
          <p class="admin__subNav__txt me-1">企業資料</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('company-page-view')"
          :class="{ active: subTopNav === '公司頁面' }"
        >
          <p class="admin__subNav__txt me-1">公司頁面</p>
        </li>
      </ul>
      <ul
        v-if="adminMainSection === '職位管理'"
        class="admin__subNav admin__subNav--company position-relative w-100"
      >
        <li class="d-md-flex align-items-center d-none">
          <h2 class="admin__subNav__title">{{ `職位管理` }}</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('job-list')"
          :class="{ active: subTopNav === '刊登中職位' }"
        >
          <p class="admin__subNav__txt me-1">刊登中職位</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('close-job-list')"
          :class="{ active: subTopNav === '已關閉職位' }"
        >
          <p class="admin__subNav__txt me-1">已關閉職位</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('application-list')"
          :class="{ active: subTopNav === '應徵管理' }"
        >
          <p class="admin__subNav__txt me-1">應徵管理</p>
        </li>
        <li class="d-flex align-items-center position-absolute end-0 h-100">
          <buttom type="btn" class="btn btn-companyColor text-light"
          @click="goToPageLink('new-job')">新增職位</buttom>
        </li>
      </ul>
      <ul v-if="adminMainSection === '個人帳戶'" class="admin__subNav admin__subNav--company">
        <li class="d-flex align-items-center d-md-flex d-none">
          <h2 class="admin__subNav__title">個人帳戶</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting')"
          :class="{ active: subTopNav === '基本資料' }"
        >
          <p class="admin__subNav__txt me-1">基本資料</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting-career')"
          :class="{ active: subTopNav === '求職意向' }"
        >
          <p class="admin__subNav__txt me-1">求職意向</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting-message-template')"
          :class="{ active: subTopNav === '文字模板' }"
        >
          <p class="admin__subNav__txt me-1">文字模板</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting-account')"
          :class="{ active: subTopNav === '帳號設定' }"
        >
          <p class="admin__subNav__txt me-1">帳號設定</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ['nowPage'],
  data() {
    return {
      subTopNav: '',
      adminMainSection: '',
    };
  },
  watch: {
    nowPage: {
      deep: true,
      handler(newValue) {
        this.subTopNav = newValue;
        this.checkMainSection();
      },
    },
  },
  methods: {
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
    checkMainSection() {
      if (
        this.subTopNav === '總覽'
        || this.subTopNav === '企業資料'
        || this.subTopNav === '公司頁面'
      ) {
        this.adminMainSection = '企業中心';
      } else if (
        this.subTopNav === '刊登中職位'
        || this.subTopNav === '已關閉職位'
        || this.subTopNav === '應徵管理'
      ) {
        this.adminMainSection = '職位管理';
      } else if (
        this.subTopNav === '基本資料'
        || this.subTopNav === '求職意向'
        || this.subTopNav === '文字模板'
        || this.subTopNav === '帳號設定'
      ) {
        this.adminMainSection = '個人帳戶';
      }
    },
  },
  created() {
    this.subTopNav = this.nowPage;
    this.checkMainSection();
  },
};
</script>

<style lang="scss"></style>
