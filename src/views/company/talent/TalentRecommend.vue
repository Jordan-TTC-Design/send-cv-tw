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
        <div class="col-lg-3" :class="{ 'rwdClose--md': rwdSelect !== '' }">
          <div class="sideContentBox pb-3">
            <div class="sideContentBox__header">
              <p class="subTxt">目前共 {{ nowJobList.length }} 個公司職位</p>
              <div class="sideContentBox__header__btnBox">
                <button type="button" class="btn"><i class="jobIcon bi bi-search"></i></button>
              </div>
            </div>
            <ul class="innerList innerList--company">
              <li
                :class="{ active: item.key === selectItem.key && fullWidth > 992 }"
                class="innerList__item putPointer"
                v-for="item in nowJobList"
                :key="item.key"
                @click="selectList(listName)"
              >
                <p class="item__title mb-1">
                  {{ item.jobName }}
                </p>
                <p class="subTxt">推薦人才：{{ mailApplyList.length }} 人</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-9" :class="{ 'rwdClose--md': rwdSelect === '' }">
          <div class="adminContentBox pb-3">
            <div
              class="
                border-bottom border-gray-line
                px-3
                py-1
                d-flex
                justify-content-between
                align-items-center
              "
            >
              <p class="subTxt">{{ selectItem.jobName }}：{{ mailApplyList.length }} 位推薦人才</p>
              <div class="d-flex align-items-center">
                <button type="button" class="btn me-2"><i class="jobIcon bi bi-search"></i></button>
                <select class="form-select" aria-label="排列方法" id="filterMethod">
                  <option
                    v-for="item in filterData"
                    :value="item.title"
                    :key="item.title"
                    :selected="item.select"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </div>
            </div>
            <ul ref="candidateList">
              <template v-for="item in mailApplyList" :key="item.key">
                <TalentCard :user="user" :job-data="item" :select-job-key="selectJobKey" />
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
import PersonPopModal from '@/components/company/PersonPopModal.vue';
import PersonActionModal from '@/components/company/PersonActionModal.vue';
import database from '@/methods/firebaseinit';
import TalentCard from '@/components/company/TalentCard.vue';

export default {
  components: {
    NavCompanyAdminNav,
    PersonPopModal,
    PersonActionModal,
    TalentCard,
  },
  data() {
    return {
      dataReady: false,
      nowPage: '推薦人才',
      sideListNav: '公司職位',
      mainContentLisr: '',
      selectItem: {},
      companyJobList: [],
      mailApplyList: [],
      shotJobList: [],
      user: {},
      selectJobKey: '',
      filterData: [
        {
          title: '依據時間排序',
          selected: true,
        },
        {
          title: '依據匹配度排序',
          selected: false,
        },
      ],
      // rwd
      rwdSelect: '',
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
    };
  },
  computed: {
    nowJobList() {
      const temArray = [];
      if (this.sideListNav === '公司職位') {
        this.companyJobList.forEach((job) => {
          if (job.is_enabled === true) {
            temArray.push(job);
          }
        });
      } else if (this.sideListNav === '拍照申請職位') {
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
      if (this.sideListNav === '公司職位') {
        this.companyJobList.forEach((item) => {
          if (item.key === itemId) {
            this.selectItem = {};
            this.selectItem = item;
            document.documentElement.scrollTop = 0;
            this.selectJobKey = item.key;
          }
        });
      } else if (this.sideListNav === '拍照申請職位') {
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
    selectList(listName) {
      this.processSelectData(listName);
    },
    async backToList() {
      await this.processSelectData('');
      document.documentElement.scrollTop = 0;
    },
    processSelectData(action) {
      this.rwdSelect = action;
      this.mainContentLisr = action;
    },
  },
  created() {
    this.getJobListData();
    this.getShotJobList();
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
