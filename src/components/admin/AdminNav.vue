<template>
  <div ref="adminSubHeader" class="adminSubNav adminSubNav--jobSeeker container-fluid">
    <div class="container-xxl">
      <ul v-if="adminMainSection === '工作'" class="adminSubNav__innerList">
        <li class="d-flex align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">工作</h2>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('work-over-view')"
          :class="{ active: subTopNav === '總覽' }"
        >
          <p class="adminSubNav__innerList__txt me-10">用戶總覽</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('work-application')"
          :class="{ active: subTopNav === '職位申請' }"
        >
          <p class="adminSubNav__innerList__txt me-1">職位申請</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('work-company-read')"
          :class="{ active: subTopNav === '企業來訪' }"
        >
          <p class="adminSubNav__innerList__txt me-1">企業來訪</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('work-collection')"
          :class="{ active: subTopNav === '收藏' }"
        >
          <p class="adminSubNav__innerList__txt me-1">我的收藏</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('work-read-record')"
          :class="{ active: subTopNav === '瀏覽紀錄' }"
        >
          <p class="adminSubNav__innerList__txt me-1">瀏覽紀錄</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('work-other-application')"
          :class="{ active: subTopNav === '自我推薦' }"
        >
          <p class="adminSubNav__innerList__txt me-1">自我推薦</p>
        </li>
      </ul>
      <ul v-if="adminMainSection === '文件'" class="adminSubNav__innerList">
        <li class="d-flex align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">文件</h2>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('document-cv')"
          :class="{ active: subTopNav === '履歷' }"
        >
          <p class="adminSubNav__innerList__txt me-1">履歷</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('document-cover-letter')"
          :class="{ active: subTopNav === '求職信' }"
        >
          <p class="adminSubNav__innerList__txt me-1">求職信</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('document-other')"
          :class="{ active: subTopNav === '其他文件' }"
        >
          <p class="adminSubNav__innerList__txt me-1">其他文件</p>
        </li>
      </ul>
      <ul v-if="adminMainSection === '個人帳戶'" class="adminSubNav__innerList">
        <li class="d-flex align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">個人帳戶</h2>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('setting')"
          :class="{ active: subTopNav === '基本資料' }"
        >
          <p class="adminSubNav__innerList__txt me-1">基本資料</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('setting-career')"
          :class="{ active: subTopNav === '求職意向' }"
        >
          <p class="adminSubNav__innerList__txt me-1">求職意向</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('setting-message-template')"
          :class="{ active: subTopNav === '文字模板' }"
        >
          <p class="adminSubNav__innerList__txt me-1">文字模板</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('setting-account')"
          :class="{ active: subTopNav === '帳號設定' }"
        >
          <p class="adminSubNav__innerList__txt me-1">帳號設定</p>
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
        || this.subTopNav === '職位申請'
        || this.subTopNav === '企業來訪'
        || this.subTopNav === '收藏'
        || this.subTopNav === '瀏覽紀錄'
        || this.subTopNav === '自我推薦'
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
