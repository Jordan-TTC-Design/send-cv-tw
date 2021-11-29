<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container position-relative companyPage">
      <div class="row" v-if="dataReady === true">
        <div class="col-lg-3">
          <div class="sideContentBox">
            <div class="sideContentBox__header d-flex justify-content-between align-items-center">
              <p class="subTxt">篩選</p>
              <div class="sideContentBox__header__btnBox">
                <button type="button" class="btn text-dark">清除條件</button>
              </div>
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
              <div class="form__input mb-0">
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
            </form>
          </div>
        </div>
        <div class="col-lg-9">
          <button
            type="button"
            class="applyBackBtn btn btn-light text-dark mt-6 mb-4 d-lg-none"
            @click="backToList"
          >
            <i class="bi bi-chevron-left me-2"></i>返回
          </button>
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
            <ul ref="candidateList" class="candidateList candidateList--inBox">
              <template v-for="item in mailApplyList" :key="item.key">
                <li class="personCard">
                  <div class="personCard__listBox align-items-start">
                    <div class="me-4 d-flex align-items-center">
                      <div class="personCard__introVideo">
                        <p class="subTxt text-secondary">尚未設定</p>
                      </div>
                      <img
                        class="personCard__personalImg"
                        :src="user.account.userImgUrl"
                        :alt="`${user.account.chineseName}個人求職照片`"
                      />
                    </div>
                    <div class="personCard__infoBox">
                      <div class="d-flex align-items-center mb-3">
                        <p
                          class="personCard__name mb-0 me-2 putPointer"
                          @click="openPersonPopModal('瀏覽人才')"
                        >
                          {{ user.account.chineseName }}
                        </p>
                        <p>{{ user.account.gender }} | {{ `28歲` }}</p>
                      </div>
                      <ul class="personCard__infoBox">
                        <li class="personCard__infoBox__item">
                          <p class="personCard__subTxt">投遞職位</p>
                          <p class="personCard__txt">{{ item.jobName }}</p>
                        </li>
                        <li class="personCard__infoBox__item">
                          <p class="personCard__subTxt">最高學歷</p>
                          <p class="personCard__txt">
                            {{
                              user.educationExp.educations[user.educationExp.educations.length - 1]
                                .educationLevel || '尚未填寫'
                            }}
                          </p>
                        </li>
                        <li class="personCard__infoBox__item">
                          <p class="personCard__subTxt">工作經驗</p>
                          <p class="personCard__txt">
                            {{
                              user.workExp.works[user.workExp.works.length - 1].jobName ||
                              '無工作經驗'
                            }}
                          </p>
                        </li>
                        <li class="personCard__infoBox__item">
                          <p class="personCard__subTxt">最後登入</p>
                          <p class="personCard__txt">{{ $filters.date(item.time) }}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button
                    class="collectBtn btn btn-outline-gray-line position-absolute"
                    type="button"
                  >
                    <i class="jobIcon bi bi-bookmark-fill"></i>
                  </button>
                  <div class="card__btnBox">
                    <button
                      type="button"
                      class="btn btn-outline-companyColor me-2"
                      @click="selectAction('選擇動作')"
                    >
                      選擇動作
                    </button>
                    <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                      聯絡
                    </button>
                    <button type="button" class="btn text-dark">
                      <i class="bi bi-three-dots"></i>
                    </button>
                  </div>
                </li>
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
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import PersonPopModal from '@/components/company/PersonPopModal.vue';
import PersonActionModal from '@/components/company/PersonActionModal.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    CompanyAdminNav,
    PersonPopModal,
    PersonActionModal,
  },
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      nowPage: '歷史面試',
      dataReady: false,
      selectItem: {},
      mailApplyList: [],
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
      searchForm: {
        keyword: '',
        matchJob: '',
      },
    };
  },
  methods: {
    selectAction(action) {
      const obj = {
        action,
        user: this.user,
        key: this.selectJobKey,
      };
      emitter.emit('open-person-action-modal', obj);
    },
    openPersonPopModal(action) {
      const obj = {
        action,
        user: this.user,
        key: this.selectJobKey,
      };
      emitter.emit('open-person-pop-modal', obj);
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
    this.getSelfRecommendList();
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
