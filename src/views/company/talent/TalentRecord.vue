<template>
  <div class="adminPage--py">
    <NavCompanyAdminNav :nowPage="nowPage" />
    <div class="container-xl position-relative">
      <div class="row" v-if="dataReady === true">
        <div class="col-lg-3">
          <form
            @submit="searchTalent"
            class="sideContentBox rwdSideModal"
            :class="{ active: filterOpen }"
          >
            <div class="sideContentBox__header">
              <p class="subTxt">篩選</p>
              <div class="sideContentBox__header__btnBox">
                <button type="button" class="btn text-dark">清除條件</button>
              </div>
            </div>
            <div class="sideContentBox__body">
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchKeyword" class="labelBox__label form-label">搜尋關鍵字</label>
                </div>
                <input
                  class="form-control"
                  type="text"
                  id="searchKeyword"
                  placeholder="請輸入"
                  v-model="filterData.keyword"
                />
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchKeyword" class="labelBox__label form-label">匹配職位</label>
                </div>
                <select class="form-select" aria-label="matchJob" v-model="filterData.matchJob">
                  <option selected disabled value="">可選擇配對職位</option>
                  <option value="false">不選擇</option>
                  <template v-for="item in companyJobList" :key="item.key">
                    <option :value="item.key">
                      {{ item.jobName }}
                    </option>
                  </template>
                </select>
              </div>
              <div class="form__input mb-0">
                <div class="form__labelBox">
                  <label for="filterMethod" class="labelBox__label form-label">排列方法</label>
                </div>
                <select
                  class="form-select"
                  aria-label="排列方法"
                  id="filterMethod"
                  v-model="filterData.filterMethod"
                >
                  <template v-for="item in filterData.filterMethod" :key="item.title">
                    <option :value="item.title" :selected="item.selected">
                      {{ item.title }}
                    </option>
                  </template>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="col-lg-9">
          <div class="adminContentBox pb-3">
            <div class="adminContentBox__header--sm">
              <p class="subTxt">收藏夾：{{ mailApplyList.length }} 位人才</p>
            </div>
            <ul ref="candidateList">
              <template v-for="item in mailApplyList" :key="item.key">
                <TalentCard :user="user" :job-data="item" :select-job-key="selectJobKey" />
              </template>
            </ul>
          </div>
        </div>
      </div>
      <div class="sideBtnBox d-xl-none">
        <button type="button" class="sideBtn btn btn-light mb-2" @click="filterOpen = !filterOpen">
          <i class="jobIcon bi bi-funnel-fill"></i>
        </button>
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
      nowPage: '瀏覽紀錄',
      selectItem: {},
      mailApplyList: [],
      user: {},
      selectJobKey: '',
      filterData: {
        keyword: '',
        matchJob: '',
        filterMethod: [
          {
            title: '依據時間排序',
            selected: true,
          },
          {
            title: '依據匹配度排序',
            selected: false,
          },
        ],
      },
      // rwd
      filterOpen: false,
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
    };
  },
  methods: {
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
    searchTalent() {
      console.log(this.searchForm);
    },
    getJobListData() {
      this.companyJobList = [];
      const companyJobRef = database.ref('company/jobList');
      companyJobRef.once('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          Object.keys(data).forEach((item) => {
            // 物件轉陣列
            this.companyJobList.push(data[item]);
          });
          this.dataReady = true;
        }
      });
    },
  },
  created() {
    this.getUserData();
    this.getSelfRecommendList();
    this.getJobListData();
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
