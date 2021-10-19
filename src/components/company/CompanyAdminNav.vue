<template>
  <div ref="adminSubHeader" class="admin__subHeader mb-6 box--shadow">
    <div class="container">
      <ul v-if="adminMainSection === '企業中心'"
      class="admin__subNav admin__subNav--company">
        <li class="d-flex align-items-center d-md-flex d-none">
          <h2 class="admin__subNav__title">企業中心</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('company-over-view')"
          :class="{ active: nowPage === '總覽' }"
        >
          <p class="admin__subNav__txt me-1">總覽</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('company-info')"
          :class="{ active: nowPage === '企業資料' }"
        >
          <p class="admin__subNav__txt me-1">企業資料</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('company-page-view')"
          :class="{ active: nowPage === '公司頁面' }"
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
          :class="{ active: nowPage === '刊登中職位' }"
        >
          <p class="admin__subNav__txt me-1">刊登中職位</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('close-job-list')"
          :class="{ active: nowPage === '已關閉職位' }"
        >
          <p class="admin__subNav__txt me-1">已關閉職位</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('application-list')"
          :class="{ active: nowPage === '應徵管理' }"
        >
          <p class="admin__subNav__txt me-1">應徵管理</p>
        </li>
        <li class="d-flex align-items-center position-absolute end-0 h-100">
          <button type="btn" class="btn btn-companyColor text-light"
          @click="goToPageLink('new-job')">新增職位</button>
        </li>
      </ul>
      <ul v-if="adminMainSection === '設定'"
      class="admin__subNav admin__subNav--company position-relative w-100">
        <li class="d-flex align-items-center d-md-flex d-none">
          <h2 class="admin__subNav__title">設定</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting')"
          :class="{ active: nowPage === '我的帳戶' }"
        >
          <p class="admin__subNav__txt me-1">我的帳戶</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting-user-management')"
          :class="{ active: nowPage === '用戶管理' }"
        >
          <p class="admin__subNav__txt me-1">用戶管理</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting-message-template')"
          :class="{ active: nowPage === '文字模板' }"
        >
          <p class="admin__subNav__txt me-1">文字模板</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting-email-bind')"
          :class="{ active: nowPage === '綁定信箱' }"
        >
          <p class="admin__subNav__txt me-1">綁定信箱</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting-notification')"
          :class="{ active: nowPage === '通知設定' }"
        >
          <p class="admin__subNav__txt me-1">通知設定</p>
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
      adminMainSection: '企業中心',
    };
  },
  watch: {
    nowPage: {
      deep: true,
      handler() {
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
        this.nowPage === '總覽'
        || this.nowPage === '企業資料'
        || this.nowPage === '公司頁面'
      ) {
        this.adminMainSection = '企業中心';
      } else if (
        this.nowPage === '刊登中職位'
        || this.nowPage === '已關閉職位'
        || this.nowPage === '應徵管理'
      ) {
        this.adminMainSection = '職位管理';
      } else if (
        this.nowPage === '我的帳戶'
        || this.nowPage === '用戶管理'
        || this.nowPage === '文字模板'
        || this.nowPage === '綁定信箱'
        || this.nowPage === '通知設定'
      ) {
        this.adminMainSection = '設定';
      }
    },
  },
  created() {
    this.checkMainSection();
  },
};
</script>

<style lang="scss"></style>
