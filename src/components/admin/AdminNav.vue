<template>
  <div ref="adminSubHeader" class="admin__subHeader mb-6 box--shadow">
    <div class="container">
      <div v-if="adminMainSection === '工作'" class="admin__subNav">
        <li class="d-flex align-items-center d-md-flex d-none">
          <h2 class="admin__subNav__title">工作</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('work-over-view')"
          :class="{ active: subTopNav === '總覽' }"
        >
          <p class="admin__subNav__txt me-1">總覽</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('work-application')"
          :class="{ active: subTopNav === '職位申請' }"
        >
          <p class="admin__subNav__txt me-1">職位申請</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('work-company-read')"
          :class="{ active: subTopNav === '企業來訪' }"
        >
          <p class="admin__subNav__txt me-1">企業來訪</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('work-collection')"
          :class="{ active: subTopNav === '收藏' }"
        >
          <p class="admin__subNav__txt me-1">收藏</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('work-read-record')"
          :class="{ active: subTopNav === '瀏覽紀錄' }"
        >
          <p class="admin__subNav__txt me-1">瀏覽紀錄</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('work-application-review')"
          :class="{ active: subTopNav === '審核紀錄' }"
        >
          <p class="admin__subNav__txt me-1">審核紀錄</p>
        </li>
      </div>
      <div v-if="adminMainSection === '文件'" class="admin__subNav">
        <li class="d-flex align-items-center d-md-flex d-none">
          <h2 class="admin__subNav__title">文件</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('document-cv')"
          :class="{ active: subTopNav === '履歷' }"
        >
          <p class="admin__subNav__txt me-1">履歷</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('document-cover-letter')"
          :class="{ active: subTopNav === '求職信' }"
        >
          <p class="admin__subNav__txt me-1">求職信</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('document-other')"
          :class="{ active: subTopNav === '其他文件' }"
        >
          <p class="admin__subNav__txt me-1">其他文件</p>
        </li>
      </div>
      <div v-if="adminMainSection === '個人帳戶'" class="admin__subNav">
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
          @click="goToPageLink('setting-account')"
          :class="{ active: subTopNav === '帳號設定' }"
        >
          <p class="admin__subNav__txt me-1">帳號設定</p>
        </li>
      </div>
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
        || this.subTopNav === '職位申請'
        || this.subTopNav === '企業來訪'
        || this.subTopNav === '收藏'
        || this.subTopNav === '瀏覽紀錄'
        || this.subTopNav === '審核紀錄'
      ) {
        this.adminMainSection = '工作';
      } else if (
        this.subTopNav === '履歷'
        || this.subTopNav === '求職信'
        || this.subTopNav === '其他文件'
      ) {
        this.adminMainSection = '文件';
      } else if (
        this.subTopNav === '基本資料'
        || this.subTopNav === '求職意向'
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
