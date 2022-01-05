<template>
  <div class="adminPage--py">
    <NavCompanyAdminNav :nowPage="nowPage" />
    <div
      class="container-lg pageSubNavContainer--sticky mb-5 d-lg-none"
      :class="{ 'rwdClose--md': rwdSelect === '' }"
    >
      <div class="pageSubNav btnBox">
        <button type="button" class="btn" @click="backToList">
          <i class="jobIcon-sm bi bi-chevron-left me-2"></i>返回
        </button>
      </div>
    </div>
    <div class="container-xl position-relative companyPage">
      <div class="row" v-if="dataReady === true">
        <div class="col-lg-4" :class="{ 'rwdClose--md': rwdSelect !== '' }">
          <div class="sideContentBox pb-3">
            <NavBoxNav
              :nav-list="boxNavList"
              :nav-setting="boxNavSetting"
              v-model:box-nav-state="boxNavState"
            />
            <div class="sideContentBox__header">
              <p class="subTxt">目前共 {{ nowJobList.length }} 個職位</p>
              <div class="sideContentBox__header__btnBox">
                <button type="button" class="btn"><i class="jobIcon bi bi-search"></i></button>
              </div>
            </div>
            <ul class="innerList innerList--company">
              <li
                :class="{ active: item.key === selectItem.key && fullWidth > 992 }"
                :ref="`companyJobList-${item.key}`"
                class="innerList__item putPointer"
                v-for="item in nowJobList"
                :key="item.key"
                @click="selectListItem(item.key)"
              >
                <p class="item__title mb-1">
                  {{ item.jobName }}
                </p>
                <p class="subTxt">更新時間：2021/12/12</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-8" :class="{ 'rwdClose--md': rwdSelect === '' }">
          <div class="adminContentBox pb-3">
            <NavBoxNav
              :nav-list="mainBoxNavList"
              :nav-setting="mainBoxNavSetting"
              v-model:box-nav-state="mainBoxNavState"
            />
            <ul ref="candidateList" v-if="dataReady === true">
              <template v-for="item in mailApplyList" :key="item.key">
                <TalentCard :user="user" :job-data="item" :select-job-key="selectJobKey"/>
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
import NavCompanyAdminNav from '@/components/company/NavCompanyAdminNav.vue';
import PersonPopModal from '@/components/company/PersonPopModal.vue';
import PersonActionModal from '@/components/company/PersonActionModal.vue';
import database from '@/methods/firebaseinit';
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
      dataReady: false,
      nowPage: '應徵管理',
      boxNavState: 1,
      boxNavList: [
        { title: '公司職位', value: 1 },
        { title: '拍照申請職位', value: 2 },
      ],
      boxNavSetting: {
        full: 1,
        style: 1, // jobSeeker 1 company 2
        bg: 0,
      },
      mainBoxNavState: 1,
      mainBoxNavList: [
        { title: '新申請', value: 1 },
        { title: '正在聯絡', value: 2 },
        { title: '邀請面試', value: 3 },
        { title: '已瀏覽', value: 4 },
        { title: '已拒絕', value: 5 },
      ],
      mainBoxNavSetting: {
        full: 1,
        style: 1, // jobSeeker 1 company 2
        bg: 1,
        rounded: 1,
      },
      mainContentList: '',
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      selectItem: {},
      companyJobList: [],
      mailApplyList: [],
      shotJobList: [],
      user: {},
      selectJobKey: '',
      // rwd
      filterOpen: false,
      rwdSelect: '',
    };
  },
  computed: {
    nowJobList() {
      const temArray = [];
      if (this.boxNavState === 1) {
        this.companyJobList.forEach((job) => {
          if (job.is_enabled === true) {
            temArray.push(job);
          }
        });
      } else if (this.boxNavState === 2) {
        this.shotJobList.forEach((job) => {
          if (job.is_enabled === true) {
            temArray.push(job);
          }
        });
      }
      return temArray;
    },
  },
  watch: {
    nowJobList: {
      deep: true,
      handler(newValue) {
        console.log(newValue);
        if (newValue.length > 0) {
          this.selectJobFormJobList(newValue[0].key);
        } else {
          this.selectItem = {};
        }
      },
    },
  },
  methods: {
    selectJobFormJobList(itemId) {
      if (this.boxNavState === 1) {
        this.companyJobList.forEach((item) => {
          if (item.key === itemId) {
            this.selectItem = {};
            this.selectItem = item;
            document.documentElement.scrollTop = 0;
            this.selectJobKey = item.key;
          }
        });
      } else if (this.boxNavState === 2) {
        this.shotJobList.forEach((item) => {
          if (item.key === itemId) {
            this.selectItem = {};
            this.selectItem = item;
            document.documentElement.scrollTop = 0;
            this.selectJobKey = item.key;
          }
        });
      }
    },
    getJobListData() {
      this.companyJobList = [];
      const jobListDataRef = database.ref('company/jobList');
      jobListDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((item) => {
            this.companyJobList.push(data[item]);
          });
        }
      });
    },
    getUserData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = data;
        this.getSelfRecommendList();
        console.log(this.user);
      });
    },
    getShotJobList() {
      this.shotJobList = [];
      const shotJobListRef = database.ref('applyList/otherApplyList/shotList');
      shotJobListRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((item) => {
            // 物件轉陣列
            this.shotJobList.push(data[item]);
          });
          this.dataReady = true;
        }
      });
    },
    getSelfRecommendList() {
      this.mailApplyList = [];
      const mailListDataRef = database.ref('applyList/otherApplyList/mailList');
      mailListDataRef.once('value', (snapshot) => {
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
    selectListItem(itemId) {
      this.selectJobFormJobList(itemId);
      this.processSelectData(itemId);
    },
    async backToList() {
      await this.processSelectData('');
      document.documentElement.scrollTop = 0;
    },
    processSelectData(action) {
      this.rwdSelect = action;
      this.mainContentList = action;
    },
  },
  created() {
    this.getUserData();
    this.getJobListData();
    this.getShotJobList();
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
