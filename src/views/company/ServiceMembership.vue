<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container">
      <div class="rounded bg-light box--shadow p-5">
        <div class="row">
          <div class="col-6">
            <h2 class="pageTitle mb-5">成為SendCV的付費用戶，取得完整的服務及支援!</h2>
            <p>依據企業的預算及狀況，選擇最合適的價格方案，解決你的招聘需求。</p>
          </div>
          <div class="col-6"></div>
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
      nowPage: '會員方案',
      sideBoxList: 'sendCV Web通知',
      sideBoxInnerList: 'sendCV Web通知 - 應徵通知',
      notify: {
        web: {
          applys: {
            is_enabled: true,
            useWeb: true,
            useShotToApply: true,
            useEmailToApply: true,
            agreeInterView: true,
            agreeAdmission: true,
            refuse: true,
          },
          chatRoom: { is_enabled: true },
          recommend: { is_enabled: true },
          interView: { is_enabled: true },
        },
        email: {
          applys: {
            is_enabled: true,
            useWeb: true,
            useShotToApply: true,
            useEmailToApply: true,
            agreeInterView: true,
            agreeAdmission: true,
            refuse: true,
          },
          chatRoom: { is_enabled: true },
          recommend: { is_enabled: true },
          jobs: {
            is_enabled: true,
            success: true,
            closed: true,
            restart: true,
            promote: true,
          },
          interView: { is_enabled: true },
        },
        app: {
          applys: {
            is_enabled: true,
            useWeb: true,
            useShotToApply: true,
            useEmailToApply: true,
            agreeInterView: true,
            agreeAdmission: true,
            refuse: true,
          },
          chatRoom: { is_enabled: true },
          recommend: { is_enabled: true },
          jobs: {
            is_enabled: true,
            success: true,
            closed: true,
            restart: true,
            promote: true,
          },
          interView: { is_enabled: true },
        },
      },
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
      if (action === 'sendCV Web通知') {
        this.sideBoxInnerList = 'sendCV Web通知 - 應徵通知';
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
