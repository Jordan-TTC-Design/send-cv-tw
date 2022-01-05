<template>
  <div class="adminPage--py">
    <NavCompanyAdminNav :nowPage="nowPage" />
    <div class="container-xl position-relative">
      <div class="row justify-content-center" v-if="dataReady === true">
        <div class="col-lg-10">
          <div class="adminContentBox pb-3">
            <NavBoxNav
              :nav-list="boxNavList"
              :nav-setting="boxNavSetting"
              v-model:box-nav-state="boxNavState"
            />
            <ul ref="candidateList">
              <template v-for="item in mailApplyList" :key="item.key">
                <TalentCard :user="user" :job-data="item"/>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PersonPopModal />
  <PersonActionModal />
</template>

<script>
import emitter from '@/methods/emitter';
import NavCompanyAdminNav from '@/components/company/NavCompanyAdminNav.vue';
import database from '@/methods/firebaseinit';
import PersonPopModal from '@/components/company/PersonPopModal.vue';
import PersonActionModal from '@/components/company/PersonActionModal.vue';
import NavBoxNav from '@/components/helpers/NavBoxNav.vue';
import TalentCard from '@/components/company/TalentCard.vue';

export default {
  components: {
    NavCompanyAdminNav,
    PersonPopModal,
    PersonActionModal,
    NavBoxNav,
    TalentCard,
  },
  data() {
    return {
      nowPage: '自我推薦',
      boxNavState: 1,
      boxNavList: [
        { title: '新申請', value: 1 },
        { title: '正在聯絡', value: 2 },
        { title: '邀請面試', value: 3 },
        { title: '已瀏覽', value: 4 },
        { title: '已拒絕', value: 5 },
      ],
      boxNavSetting: {
        full: 1,
        style: 1, // jobSeeker 1 company 2
        bg: 1,
        rounded: 1,
      },
      dataReady: false,
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      selectItem: {},
      companyJobList: [],
      mailApplyList: [],
      user: {},
    };
  },
  methods: {
    getJobListData() {
      this.companyJobList = [];
      const jobListDataRef = database.ref('company/jobList');
      jobListDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((item) => {
            // 物件轉陣列
            this.companyJobList.push(data[item]);
          });
          this.selectJobFormJobList(this.openJobList[0].key);
        }
      });
    },
    getUserData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = data;
        this.getSelfRecommendList();
      });
    },
    getSelfRecommendList() {
      this.mailApplyList = [];
      const maiListDataRef = database.ref('applyList/otherApplyList/mailList');
      maiListDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((item) => {
            // 物件轉陣列
            this.mailApplyList.push(data[item]);
          });
          this.dataReady = true;
        }
      });
    },
  },
  created() {
    this.getJobListData();
    this.getUserData();
    emitter.emit('spinner-open-bg', 800);
  },
  mounted() {
    const vm = this;
    vm.fullWidth = window.innerWidth;
    vm.fullHeight = window.innerHeight;
    window.onresize = () => {
      vm.fullWidth = window.innerWidth;
      vm.fullHeight = window.innerHeight;
    };
  },
};
</script>

<style lang="scss"></style>
