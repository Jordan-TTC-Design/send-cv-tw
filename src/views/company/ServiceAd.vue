<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container">
      <div class="row">
        <div class="col-3">
          <div class="sideCollapse position--sticky--pageTop">
            <div class="accordion-item">
              <p
                class="sideCollapse__list__title sideCollapse__list__title--company"
                :class="{ active: sideBoxList === '首頁廣告' }"
                @click="selectCollapseList('首頁廣告')"
              >
                首頁廣告
                <i v-if="sideBoxList !== '首頁廣告'" class="jobIcon bi bi-chevron-down"></i>
                <i v-if="sideBoxList === '首頁廣告'" class="jobIcon bi bi-chevron-up"></i>
              </p>
              <ul
                class="sideCollapse__innerList pb-5 bg-gray-light"
                v-show="sideBoxList === '首頁廣告'"
              >
                <li
                  class="nav__item"
                  @click="selectListItem('首頁廣告 - 應徵通知')"
                  :class="{ active: sideBoxInnerList === '首頁廣告 - 應徵通知' }"
                >
                  <p class="nav__item__title">應徵通知</p>
                </li>
                <li
                  class="nav__item"
                  @click="selectListItem('首頁廣告 - 聊天室通知')"
                  :class="{ active: sideBoxInnerList === '首頁廣告 - 聊天室通知' }"
                >
                  <p class="nav__item__title">聊天室通知</p>
                </li>
                <li
                  class="nav__item"
                  @click="selectListItem('首頁廣告 - 推薦通知')"
                  :class="{ active: sideBoxInnerList === '首頁廣告 - 推薦通知' }"
                >
                  <p class="nav__item__title">推薦通知</p>
                </li>
                <li
                  class="nav__item"
                  @click="selectListItem('首頁廣告 - 面試提醒通知')"
                  :class="{ active: sideBoxInnerList === '首頁廣告 - 面試提醒通知' }"
                >
                  <p class="nav__item__title">面試提醒通知</p>
                </li>
              </ul>
            </div>
            <div
              class="accordion-item sideCollapse__list--item"
              :class="{ active: sideBoxList === '粉絲專頁廣告' }"
              @click="selectCollapseList('粉絲專頁廣告')"
            >
              <p
                class="sideCollapse__list__title sideCollapse__list__title--company"
                :class="{ active: sideBoxList === '粉絲專頁廣告' }"
              >
                粉絲專頁廣告
              </p>
            </div>
            <div
              class="accordion-item sideCollapse__list--item"
              :class="{ active: sideBoxList === '推廣職位' }"
              @click="selectCollapseList('推廣職位')"
            >
              <p
                class="sideCollapse__list__title sideCollapse__list__title--company"
                :class="{ active: sideBoxList === '推廣職位' }"
              >
                推廣職位
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-9 col-12" v-if="dataReady === true">
          <div v-if="sideBoxList === '首頁廣告'">
            <div class="bg-white rounded box--shadow p-5 mb-4 d-flex justify-content-between">
              <div>
                <h3 class="section__title--sub">
                  <span class="titleTag--doubleCircle--company me-2"></span>大型看板廣告
                </h3>
                <p class="mb-2">剩餘額度：12次</p>
                <p class="subTxt text-secondary">剩餘的額度不夠使用嗎？您可以點擊購買額度立即加入購物車！</p>
              </div>
              <div class="d-flex justify-content-end align-items-end">
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                  購買額度
                </button>
                <button type="button" class="btn btn-companyColor text-light">新增廣告</button>
              </div>
            </div>
            <div class="admin__mainContent p-0 pb-3">
              <div class="adminContentList">
                <ul class="adminContentNav w-100">
                  <li
                    class="adminContentNav__item"
                    :class="{ active: subNav === '廣告說明' }"
                    @click="subNav = '廣告說明'"
                  >
                    <p>廣告說明</p>
                  </li>
                  <li
                    class="adminContentNav__item"
                    :class="{ active: subNav === '刊登中廣告' }"
                    @click="subNav = '刊登中廣告'"
                  >
                    <p>刊登中廣告<span class="ms-1">5</span></p>
                  </li>
                  <li
                    class="adminContentNav__item"
                    :class="{ active: subNav === '審核中廣告' }"
                    @click="subNav = '審核中廣告'"
                  >
                    <p>審核中廣告<span class="ms-1">99</span></p>
                  </li>
                  <li
                    class="adminContentNav__item"
                    :class="{ active: subNav === '審核失敗' }"
                    @click="subNav = '審核失敗'"
                  >
                    <p>審核失敗</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="sideBoxList === '粉絲專頁廣告'">
            <div class="bg-white rounded box--shadow p-5 mb-4 d-flex justify-content-between">
              <div>
                <h3 class="section__title--sub">
                  <span class="titleTag--doubleCircle--company me-2"></span>粉絲專頁廣告
                </h3>
                <p class="mb-2">剩餘額度：12次</p>
                <p class="subTxt text-secondary">剩餘的額度不夠使用嗎？您可以點擊購買額度立即加入購物車！</p>
              </div>
              <div class="d-flex justify-content-end align-items-end">
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                  購買額度
                </button>
                <button type="button" class="btn btn-companyColor text-light">新增廣告</button>
              </div>
            </div>
            <div class="admin__mainContent p-0 pb-3">
              <div class="adminContentList">
                <ul class="adminContentNav w-100">
                  <li
                    class="adminContentNav__item"
                    :class="{ active: subNav === '廣告說明' }"
                    @click="subNav = '廣告說明'"
                  >
                    <p>廣告說明</p>
                  </li>
                  <li
                    class="adminContentNav__item"
                    :class="{ active: subNav === '刊登中廣告' }"
                    @click="subNav = '刊登中廣告'"
                  >
                    <p>刊登中廣告<span class="ms-1">5</span></p>
                  </li>
                  <li
                    class="adminContentNav__item"
                    :class="{ active: subNav === '審核中廣告' }"
                    @click="subNav = '審核中廣告'"
                  >
                    <p>審核中廣告<span class="ms-1">99</span></p>
                  </li>
                  <li
                    class="adminContentNav__item"
                    :class="{ active: subNav === '審核失敗' }"
                    @click="subNav = '審核失敗'"
                  >
                    <p>審核失敗</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="sideBoxList === '推廣職位'">
            <div class="bg-white rounded box--shadow p-5 mb-4 d-flex justify-content-between">
              <div>
                <h3 class="section__title--sub">
                  <span class="titleTag--doubleCircle--company me-2"></span>推廣職位
                </h3>
                <p class="mb-2">剩餘額度：12次</p>
                <p class="subTxt text-secondary">剩餘的額度不夠使用嗎？您可以點擊購買額度立即加入購物車！</p>
              </div>
              <div class="d-flex justify-content-end align-items-end">
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                  購買額度
                </button>
                <button type="button" class="btn btn-companyColor text-light">新增廣告</button>
              </div>
            </div>
            <div class="admin__mainContent p-0 pb-3">
              <div class="adminContentList">
                <ul class="adminContentNav w-100">
                  <li
                    class="adminContentNav__item"
                    :class="{ active: subNav === '廣告說明' }"
                    @click="subNav = '廣告說明'"
                  >
                    <p>廣告說明</p>
                  </li>
                  <li
                    class="adminContentNav__item"
                    :class="{ active: subNav === '推廣中職位' }"
                    @click="subNav = '推廣中職位'"
                  >
                    <p>推廣中職位<span class="ms-1">99</span></p>
                  </li>
                  <li
                    class="adminContentNav__item"
                    :class="{ active: subNav === '推廣紀錄' }"
                    @click="subNav = '推廣紀錄'"
                  >
                    <p>推廣紀錄</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    CompanyAdminNav,
  },
  data() {
    return {
      scrollTop: 0,
      elementTop: 0,
      nowPage: '廣告管理',
      sideBoxList: '首頁廣告',
      sideBoxInnerList: '首頁廣告 - 應徵通知',
      subNav: '',
      meUser: {},
      tempUser: {},
      dataReady: false,
    };
  },
  watch: {
    notify: {
      deep: true,
      handler() {
        this.saveData();
      },
    },
  },
  methods: {
    selectCollapseList(action) {
      this.sideBoxList = action;
      if (action === '首頁廣告') {
        this.sideBoxInnerList = '首頁廣告 - 應徵通知';
      } else if (action === '信箱通知') {
        this.sideBoxInnerList = '信箱通知 - 應徵通知';
      } else if (action === '手機APP通知') {
        this.sideBoxInnerList = '手機APP通知 - 應徵通知';
      }
    },
    selectListItem(action) {
      this.sideBoxInnerList = action;
      this.goAnchor(action);
    },
    // 保存全部用戶資料
    getUserListData() {
      const { key } = this.tempUser;
      const companyUserListRef = database.ref(`company/userList/${key}`);
      companyUserListRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.meUser = data;
        this.notify = this.meUser.notify;
        this.dataReady = true;
      });
    },
    // 保存資料
    saveData() {
      const { key } = this.tempUser;
      const companyUserListRef = database.ref(`company/userList/${key}`);
      companyUserListRef.set(this.meUser);
    },
    // 取得資料
    getMeUserData() {
      const companyUserRef = database.ref('company/myAccount');
      companyUserRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.tempUser = data;
        this.getUserListData();
      });
    },
    goAnchor(action) {
      this.$refs[action].scrollIntoView();
    },
  },
  created() {
    this.getMeUserData();
  },
};
</script>

<style lang="scss"></style>
