<template>
  <div class="adminPage--py">
    <NavCompanyAdminNav :nowPage="nowPage" />
    <div class="container position-relative companyPage">
      <div class="row" v-if="dataReady === true">
        <div class="col-xxl-3 col-xl-4">
          <div
            class="sideContentBox sideContentBox--filter rwdSideModal"
            :class="{ active: filterOpen }"
          >
            <div class="sideContentBox__header py-1">
              <p class="subTxt">搜尋條件</p>
              <button type="button" class="btn btn-outline-gray-line text-dark">清除</button>
            </div>
            <form @submit="searchTalent" class="sideContentBox__body">
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchKeyword" class="labelBox__label form-label">搜尋關鍵字</label>
                </div>
                <input
                  class="form-control"
                  type="text"
                  id="searchKeyword"
                  placeholder="請輸入"
                  v-model="searchForm.keyword"
                />
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchKeyword" class="labelBox__label form-label">匹配職位</label>
                </div>
                <select class="form-select" aria-label="matchJob" v-model="searchForm.matchJob">
                  <option selected disabled value="">可選擇配對職位</option>
                  <option value="false">不選擇</option>
                  <template v-for="item in companyJobList" :key="item.key">
                    <option :value="item.key">
                      {{ item.jobName }}
                    </option>
                  </template>
                </select>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchWorkExp" class="labelBox__label form-label">工作經驗</label>
                </div>
                <select
                  id="searchWorkExp"
                  class="form-select"
                  aria-label="workExp"
                  v-model="searchForm.workExp"
                >
                  <template v-for="(item, index) in formData.workExp" :key="index">
                    <option :value="item" :selected="searchForm.workExp === item">
                      {{ item }}
                    </option>
                  </template>
                </select>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchEducation" class="labelBox__label form-label">學歷要求</label>
                </div>
                <select
                  id="searchEducation"
                  class="form-select"
                  aria-label="education"
                  v-model="searchForm.education"
                >
                  <template v-for="(item, index) in formData.education" :key="index">
                    <option :value="item" :selected="searchForm.education === item">
                      {{ item }}
                    </option>
                  </template>
                </select>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchIntroVideo" class="labelBox__label form-label">語言能力</label>
                </div>
                <div class="fakeInput p-4">
                  <img
                    class="rounded-circle border-gray-line border"
                    style="height: 48px"
                    src="https://i.imgur.com/vY2s0w1.png"
                    alt="自我介紹影片"
                  />
                  <div class="d-flex px-3">
                    <div class="form-check me-4">
                      <input
                        id="searchIntroVideo--ok"
                        class="form-check-input"
                        type="radio"
                        :value="false"
                        v-model="searchForm.introVideo"
                      />
                      <label for="searchIntroVideo--ok">不限</label>
                    </div>
                    <div class="form-check">
                      <input
                        id="searchIntroVideo--ok"
                        class="form-check-input"
                        type="radio"
                        :value="true"
                        v-model="searchForm.introVideo"
                      />
                      <label for="searchIntroVideo--ok">需要</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchLanguage" class="labelBox__label form-label">語言能力</label>
                </div>
                <div class="fakeInput p-4">
                  <input
                    id="searchLanguage"
                    class="form-control d-none"
                    type="text"
                    v-model="searchForm.introVideo"
                  />
                  <img
                    class="rounded-circle border-gray-line border"
                    style="height: 48px"
                    src="https://i.imgur.com/Fgq4X33.png"
                    alt=""
                  />
                  <button type="button" class="btn btn-gray-light text-dark">設定</button>
                </div>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchLanguage" class="labelBox__label form-label">專業證照</label>
                </div>
                <div class="fakeInput p-4">
                  <input
                    id="searchLanguage"
                    class="form-control d-none"
                    type="text"
                    v-model="searchForm.introVideo"
                  />
                  <img
                    class="rounded-circle border-gray-line border"
                    style="height: 48px"
                    src="https://i.imgur.com/L1fvoFN.png"
                    alt="專業證照"
                  />
                  <button type="button" class="btn btn-gray-light text-dark">設定</button>
                </div>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchLanguage" class="labelBox__label form-label">專業技能</label>
                </div>
                <div class="fakeInput p-4">
                  <input
                    id="searchLanguage"
                    class="form-control d-none"
                    type="text"
                    v-model="searchForm.introVideo"
                  />
                  <img
                    class="rounded-circle border-gray-line border"
                    style="height: 48px"
                    src="https://i.imgur.com/a3ZWGAy.png"
                    alt="專業技能"
                  />
                  <button type="button" class="btn btn-gray-light text-dark">設定</button>
                </div>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchLanguage" class="labelBox__label form-label">駕照需求</label>
                </div>
                <div class="fakeInput p-4">
                  <input
                    id="searchLanguage"
                    class="form-control d-none"
                    type="text"
                    v-model="searchForm.introVideo"
                  />
                  <img
                    class="rounded-circle border-gray-line border"
                    style="height: 48px"
                    src="https://i.imgur.com/3bpJUQ6.png"
                    alt="駕照需求"
                  />
                  <button type="button" class="btn btn-gray-light text-dark">設定</button>
                </div>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <div class="form__labelBox">
                    <label for="salaryRangeLow" class="labelBox__label form-label"
                      >薪資待遇範圍起始</label
                    >
                  </div>
                </div>
                <input
                  type="number"
                  class="form-control"
                  id="salaryRangeLow"
                  placeholder="請輸入最低"
                  aria-describedby="薪資待遇範圍起始"
                  v-model="searchForm.salaryRange.salaryLow"
                />
              </div>
              <div class="d-flex align-items-end mb-4">
                <div class="form__input me-4">
                  <div class="form__labelBox">
                    <label for="salaryRangeHeight" class="labelBox__label form-label"
                      >薪資待遇範圍結束</label
                    >
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    id="salaryRangeHeight"
                    placeholder="請輸入最高"
                    aria-describedby="薪資待遇範圍結束"
                    v-model="searchForm.salaryRange.salaryHeight"
                  />
                </div>
                <div class="form-check mb-0">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="salaryRangeInterview"
                    v-model="searchForm.salaryRange.salaryInterView"
                  />
                  <label class="form-check-label" for="salaryRangeInterview"> 接受面議 </label>
                </div>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchLoginTime" class="labelBox__label form-label">最近登入</label>
                </div>
                <div class="d-flex flex-wrap">
                  <div class="form-check me-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      :value="0"
                      id="searchLoginTime--0"
                      :checked="searchForm.loginTime === 0"
                      v-model="searchForm.loginTime"
                    />
                    <label class="form-check-label" for="searchLoginTime--0"> 不限 </label>
                  </div>
                  <div class="form-check me-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      :value="3"
                      id="searchLoginTime--3"
                      :checked="searchForm.loginTime === 3"
                      v-model="searchForm.loginTime"
                    />
                    <label class="form-check-label" for="searchLoginTime--3"> 3天內 </label>
                  </div>
                  <div class="form-check me-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      :value="3"
                      id="searchLoginTime--7"
                      :checked="searchForm.loginTime === 7"
                      v-model="searchForm.loginTime"
                    />
                    <label class="form-check-label" for="searchLoginTime--7"> 7天內 </label>
                  </div>
                  <div class="form-check me-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      :value="14"
                      id="searchLoginTime--14"
                      :checked="searchForm.loginTime === 14"
                      v-model="searchForm.loginTime"
                    />
                    <label class="form-check-label" for="searchLoginTime--14"> 14天內 </label>
                  </div>
                  <div class="form-check me-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      :value="30"
                      id="searchLoginTime--30"
                      :checked="searchForm.loginTime === 30"
                      v-model="searchForm.loginTime"
                    />
                    <label class="form-check-label" for="searchLoginTime--30"> 30天內 </label>
                  </div>
                </div>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchExpat" class="labelBox__label form-label">外派出差</label>
                </div>
                <div class="d-flex flex-wrap">
                  <div class="form-check me-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      :value="false"
                      id="searchExpat--unlimated"
                      :checked="!searchForm.expat"
                      v-model="searchForm.expat"
                    />
                    <label class="form-check-label" for="searchExpat--unlimated"> 不限 </label>
                  </div>
                  <div class="form-check me-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      :value="true"
                      id="searchExpat--true"
                      :checked="searchForm.expat"
                      v-model="searchForm.expat"
                    />
                    <label class="form-check-label" for="searchExpat--true"> 接受 </label>
                  </div>
                </div>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchMilitaryService" class="labelBox__label form-label">兵役</label>
                </div>
                <div class="d-flex flex-wrap">
                  <div class="form-check me-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      :value="0"
                      id="searchMilitaryService--unlimated"
                      :checked="searchForm.militaryService === 0"
                      v-model="searchForm.militaryService"
                    />
                    <label class="form-check-label" for="searchMilitaryService--unlimated">
                      不限
                    </label>
                  </div>
                  <div class="form-check me-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      :value="1"
                      id="searchMilitaryService--true"
                      :checked="searchForm.militaryService === 1"
                      v-model="searchForm.militaryService"
                    />
                    <label class="form-check-label" for="searchMilitaryServicet--true">
                      役畢
                    </label>
                  </div>
                  <div class="form-check me-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      :value="2"
                      id="searchMilitaryService--false"
                      :checked="searchForm.militaryService === 2"
                      v-model="searchForm.militaryService"
                    />
                    <label class="form-check-label" for="searchMilitaryServicet--false">
                      尚未服役
                    </label>
                  </div>
                </div>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchIdentites" class="labelBox__label form-label">特殊身份</label>
                </div>
                <div class="d-flex">
                  <div class="form-check me-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="searchIdentites--1"
                      value="原住民"
                      v-model="searchForm.identities"
                    />
                    <label class="form-check-label text-nowrap" for="searchIdentites--1">
                      原住民
                    </label>
                  </div>
                  <div class="form-check me-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="searchIdentites--2"
                      value="身心障礙者"
                      v-model="searchForm.identities"
                    />
                    <label class="form-check-label text-nowrap" for="searchIdentites--2">
                      身心障礙者
                    </label>
                  </div>
                  <div class="form-check me-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="searchIdentites--3"
                      value="中低收入戶"
                      v-model="searchForm.identities"
                    />
                    <label class="form-check-label text-nowrap" for="searchIdentites--3">
                      中低收入戶
                    </label>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-companyColor text-light w-100">搜尋人才</button>
            </form>
          </div>
        </div>
        <div class="col-xxl-9 col-xl-8">
          <p class="ps-4 mb-4">搜尋條件：</p>
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
              <p class="subTxt">收藏夾：{{ mailApplyList.length }} 位人才</p>
              <div class="form__input mb-0">
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
    <div class="sideBtnBox d-xl-none">
      <button type="button" class="sideBtn btn btn-light mb-2" @click="filterOpen = !filterOpen">
        <i class="jobIcon bi bi-funnel-fill"></i>
      </button>
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
import webData from '@/methods/webData';
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
      nowPage: '搜尋人才',
      fullWidth: 0,
      fullHeight: 0,
      formData: {},
      selectItem: {},
      mailApplyList: [],
      user: {},
      selectJobKey: '',
      filterQuery: {},
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
      searchForm: {
        keyword: '',
        matchJob: '',
        workExp: '不限',
        education: '不限',
        introVideo: false,
        language: [],
        lincense: [],
        skill: [],
        driver: [],
        salaryRange: {
          salaryLow: null,
          salaryHight: null,
          salaryInterView: false,
        },
        loginTime: 0,
        expat: false,
        militaryService: 0,
        identities: [],
      },
      // rwd
      filterOpen: false,
      rwdSelect: '',
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
        }
      });
    },
  },
  created() {
    this.getSelfRecommendList();
    this.getJobListData();
    this.formData = webData;
    this.getUserData();
    this.filterQuery = this.$route.query;
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
