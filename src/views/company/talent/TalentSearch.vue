<template>
  <div class="adminPage--py">
    <NavCompanyAdminNav :nowPage="nowPage" />
    <div class="container-xl position-relative">
      <div class="row" v-if="dataReady === true">
        <div class="col-lg-9">
          <form @submit="searchTalent" class="adminContentBox">
            <div class="p-5 border-bottom border-gray-line">
              <h3 class="section__title--sub mb-4">
                <span class="tag--doubleCircle--company me-2"></span>搜尋人才
              </h3>
              <div class="row align-items-end">
                <div class="col-lg-5">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="searchKeyword" class="labelBox__label form-label"
                        >搜尋關鍵字</label
                      >
                    </div>
                    <input
                      class="form-control"
                      type="text"
                      id="searchKeyword"
                      placeholder="請輸入"
                      v-model="searchForm.keyword"
                    />
                  </div>
                </div>
                <div class="col-lg-5">
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
                </div>
                <div class="col">
                  <div class="form__input">
                    <button type="submit" class="btn btn-companyColor text-light w-100">
                      搜尋人才
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-5">
              <div class="row mb-2">
                <div class="col-lg-6">
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
                      <label for="searchEducation" class="labelBox__label form-label"
                        >學歷要求</label
                      >
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
                </div>
                <div class="col-lg-6">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="searchIntroVideo--ok" class="labelBox__label form-label"
                        >自我介紹影片</label
                      >
                    </div>
                    <div class="fakeInput p-0">
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
                          <label for="searchIntroVideo--ok">是 </label>
                        </div>
                      </div>
                      <img style="height: 120px" src="https://i.imgur.com/vY2s0w1.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="searchLanguage" class="labelBox__label form-label"
                        >語言能力</label
                      >
                    </div>
                    <div class="fakeInput flex-column p-4">
                      <input
                        id="searchLanguage"
                        class="form-control d-none"
                        type="text"
                        v-model="searchForm.introVideo"
                      />
                      <img
                        class="rounded-circle border-gray-line border mb-4"
                        style="height: 120px"
                        src="https://i.imgur.com/Fgq4X33.png"
                        alt=""
                      />
                      <button type="button" class="btn btn-gray-light text-dark w-100">設定</button>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="searchLanguage" class="labelBox__label form-label"
                        >專業證照</label
                      >
                    </div>
                    <div class="fakeInput flex-column p-4">
                      <input
                        id="searchLanguage"
                        class="form-control d-none"
                        type="text"
                        v-model="searchForm.introVideo"
                      />
                      <img
                        class="rounded-circle border-gray-line border mb-4"
                        style="height: 120px"
                        src="https://i.imgur.com/L1fvoFN.png"
                        alt="專業證照"
                      />
                      <button type="button" class="btn btn-gray-light text-dark w-100">設定</button>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="searchLanguage" class="labelBox__label form-label"
                        >專業技能</label
                      >
                    </div>
                    <div class="fakeInput flex-column p-4">
                      <input
                        id="searchLanguage"
                        class="form-control d-none"
                        type="text"
                        v-model="searchForm.introVideo"
                      />
                      <img
                        class="rounded-circle border-gray-line border mb-4"
                        style="height: 120px"
                        src="https://i.imgur.com/a3ZWGAy.png"
                        alt="專業技能"
                      />
                      <button type="button" class="btn btn-gray-light text-dark w-100">設定</button>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="searchLanguage" class="labelBox__label form-label"
                        >駕照需求</label
                      >
                    </div>
                    <div class="fakeInput flex-column p-4">
                      <input
                        id="searchLanguage"
                        class="form-control d-none"
                        type="text"
                        v-model="searchForm.introVideo"
                      />
                      <img
                        class="rounded-circle border-gray-line border mb-4"
                        style="height: 120px"
                        src="https://i.imgur.com/3bpJUQ6.png"
                        alt="駕照需求"
                      />
                      <button type="button" class="btn btn-gray-light text-dark w-100">設定</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="border-top border-gray-line pt-5">
                <h4 class="section__title--sub">更多條件</h4>
                <div class="row">
                  <div class="col-12 d-flex align-items-end mb-3">
                    <div class="form__input me-4">
                      <div class="form__labelBox">
                        <label for="salaryRangeLow" class="labelBox__label form-label"
                          >薪資待遇範圍起始</label
                        >
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
                  <div class="col-lg-6">
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="searchLoginTime" class="labelBox__label form-label"
                          >最近登入</label
                        >
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
                  </div>
                  <div class="col-lg-6">
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
                          <label class="form-check-label" for="searchExpat--unlimated">
                            不限
                          </label>
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
                  </div>
                  <div class="col-lg-6">
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="searchMilitaryService" class="labelBox__label form-label"
                          >兵役</label
                        >
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
                  </div>
                  <div class="col-lg-6">
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="searchIdentites" class="labelBox__label form-label"
                          >特殊身份</label
                        >
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
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-lg-3">
          <div class="sideContentBox rwdSideModal pb-3" :class="{ active: historyOpen }">
            <div class="sideContentBox__header">
              <p class="subTxt">搜尋紀錄</p>
              <div class="sideContentBox__header__btnBox">
                <button type="button" class="btn text-dark">清除條件</button>
              </div>
            </div>
            <ul class="innerList innerList--company">
              <li class="innerList__item putPointer">
                <p class="item__title mb-1">前端工程師</p>
                <p class="subTxt">全職、月薪4萬以上、工作經驗 1 年內、更新日期 3天內</p>
              </li>
              <li class="innerList__item putPointer">
                <p class="item__title mb-1">前端工程師</p>
                <p class="subTxt">全職、月薪4萬以上、工作經驗 1 年內、更新日期 3天內</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="sideBtnBox d-lg-none">
      <button type="button" class="sideBtn btn btn-light" @click=" historyOpen = !historyOpen ">
        <i class="jobIcon bi bi-clock-fill"></i>
      </button>
    </div>
  </div>
</template>

<script>
import webData from '@/methods/webData';
import NavCompanyAdminNav from '@/components/company/NavCompanyAdminNav.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    NavCompanyAdminNav,
  },
  data() {
    return {
      dataReady: false,
      nowPage: '搜尋人才',
      companyJobList: [],
      formData: {},
      searchForm: {
        keyword: '',
        matchJob: '',
        workExp: '',
        education: '',
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
      historyOpen: false,
    };
  },
  methods: {
    searchTalent() {
      console.log(this.searchForm);
      this.$router.push('talent-search-result/?keyword=123&city=123&jobCategory=123');
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
    this.formData = webData;
    this.getJobListData();
  },
};
</script>

<style lang="scss"></style>
