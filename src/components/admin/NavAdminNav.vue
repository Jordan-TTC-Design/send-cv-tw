<template>
  <div ref="adminSubHeader" class="adminSubNav adminSubNav--jobSeeker container-fluid">
    <div class="container-xxl">
      <ul v-if="adminMainSection === navData.job.groupName" class="adminSubNav__innerList">
        <li class="d-flex align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">{{ navData.job.groupName }}</h2>
        </li>
        <template v-for="item in navData.job.list" :key="item.title">
          <li
            class="adminSubNav__innerList__item"
            @click="goToPageLink(item.url)"
            :class="{ active: nowPage === item.title }"
          >
            <p class="adminSubNav__innerList__txt">{{ item.title }}</p>
          </li>
        </template>
      </ul>
      <ul v-if="adminMainSection === navData.doc.groupName" class="adminSubNav__innerList">
        <li class="d-flex align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">{{ navData.doc.groupName }}</h2>
        </li>
        <template v-for="item in navData.doc.list" :key="item.title">
          <li
            class="adminSubNav__innerList__item"
            @click="goToPageLink(item.url)"
            :class="{ active: nowPage === item.title }"
          >
            <p class="adminSubNav__innerList__txt">{{ item.title }}</p>
          </li>
        </template>
      </ul>
      <ul v-if="adminMainSection === navData.setting.groupName" class="adminSubNav__innerList">
        <li class="d-flex align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">{{ navData.setting.groupName }}</h2>
        </li>
        <template v-for="item in navData.setting.list" :key="item.title">
          <li
            class="adminSubNav__innerList__item"
            @click="goToPageLink(item.url)"
            :class="{ active: nowPage === item.title }"
          >
            <p class="adminSubNav__innerList__txt">{{ item.title }}</p>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ['nowPage'],
  data() {
    return {
      nowState: '',
      adminMainSection: '',
      navData: {
        job: {
          groupName: '工作',
          list: [
            { title: '用戶總覽', url: 'work-over-view' },
            { title: '職位申請', url: 'work-application' },
            { title: '企業來訪', url: 'work-company-read' },
            { title: '我的收藏', url: 'work-collection' },
            { title: '瀏覽紀錄', url: 'work-read-record' },
            { title: '自我推薦', url: 'work-other-application' },
          ],
        },
        doc: {
          groupName: '文件',
          list: [
            { title: '履歷', url: 'document-cv' },
            { title: '求職信', url: 'document-cover-letter' },
            { title: '其他文件', url: 'document-other' },
          ],
        },
        setting: {
          groupName: '個人帳戶',
          list: [
            { title: '基本資料', url: 'setting' },
            { title: '求職意向', url: 'setting-career' },
            { title: '文字模板', url: 'setting-message-template' },
            { title: '帳號設定', url: 'setting-account' },
          ],
        },
      },
    };
  },
  watch: {
    nowPage: {
      deep: true,
      handler(newValue) {
        this.nowState = newValue;
        this.checkAdminMainSection();
      },
    },
  },
  methods: {
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
    checkAdminMainSection() {
      this.navData.job.list.forEach((item) => {
        if (item.title === this.nowPage) {
          this.adminMainSection = this.navData.job.groupName;
        }
      });
      this.navData.doc.list.forEach((item) => {
        if (item.title === this.nowPage) {
          this.adminMainSection = this.navData.doc.groupName;
        }
      });
      this.navData.setting.list.forEach((item) => {
        if (item.title === this.nowPage) {
          this.adminMainSection = this.navData.setting.groupName;
        }
      });
    },
  },
  created() {
    this.nowState = this.nowPage;
    this.checkAdminMainSection();
  },
};
</script>

<style lang="scss"></style>
