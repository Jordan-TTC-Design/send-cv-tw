<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
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
    <div class="container position-relative companyPage">
      <div class="row" v-if="dataReady === true">
        <div class="col-lg-3" :class="{ 'rwdClose--md': rwdSelect !== '' }">
          <div class="sideContentBox pb-3 mb-5">
            <div class="sideContentBox__header">
              <p class="subTxt">目前共 2 個收藏夾</p>
              <div class="sideContentBox__header__btnBox">
                <button type="button" class="btn"><i class="jobIcon bi bi-search"></i></button>
              </div>
            </div>
            <ul class="innerList innerList--company">
              <li class="innerList__item putPointer" @click="selectList('預設收藏夾')">
                <p class="item__title mb-1">預設收藏夾</p>
                <p class="subTxt">收藏人才：{{ mailApplyList.length }} 人</p>
              </li>
              <li class="innerList__item putPointer" @click="selectList('老闆喜歡的')">
                <p class="item__title mb-1">老闆喜歡的</p>
                <p class="subTxt">收藏人才：{{ mailApplyList.length }} 人</p>
              </li>
            </ul>
          </div>
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
              <p class="subTxt">收藏夾：{{ mailApplyList.length }} 位人才</p>
            </div>
            <ul ref="candidateList">
              <template v-for="item in mailApplyList" :key="item.key">
                <li class="talentCard talentCard--inner">
                  <div class="talentCard__userImgBox">
                    <div class="talentCard__introVideo">
                      <p class="subTxt text-secondary">尚未設定</p>
                    </div>
                    <img
                      class="talentCard__personalImg"
                      :src="user.account.userImgUrl"
                      :alt="`${user.account.chineseName}個人求職照片`"
                    />
                  </div>
                  <div class="talentCard__body">
                    <div class="talentNameInfo mb-3">
                      <p
                        class="talentNameInfo__name me-2 putPointer"
                        @click="openPersonPopModal('瀏覽人才')"
                      >
                        {{ user.account.chineseName }}
                      </p>
                      <p>{{ user.account.gender }} | {{ `28歲` }}</p>
                    </div>
                    <ul class="talentInfo">
                      <li class="talentInfo__item">
                        <p class="talentInfo__item__title">投遞職位</p>
                        <p>{{ item.jobName }}</p>
                      </li>
                      <li class="talentInfo__item">
                        <p class="talentInfo__item__title">最高學歷</p>
                        <p>
                          {{
                            user.educationExp.educations[user.educationExp.educations.length - 1]
                              .educationLevel || '尚未填寫'
                          }}
                        </p>
                      </li>
                      <li class="talentInfo__item">
                        <p class="talentInfo__item__title">工作經驗</p>
                        <p>
                          {{
                            user.workExp.works[user.workExp.works.length - 1].jobName ||
                            '無工作經驗'
                          }}
                        </p>
                      </li>
                      <li class="talentInfo__item">
                        <p class="talentInfo__item__title">最後登入</p>
                        <p>{{ $filters.date(item.time) }}</p>
                      </li>
                    </ul>
                  </div>
                  <div class="talentCard__btnBox">
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
                  <button
                    class="collectBtn btn btn-outline-gray-line position-absolute bg-light"
                    type="button"
                  >
                    <i class="jobIcon bi bi-bookmark-fill"></i>
                  </button>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sideBtnBox d-lg-none">
    <button type="button" class="sideBtn btn btn-light mb-2" @click="filterOpen = !filterOpen">
      <i class="jobIcon bi bi-funnel-fill"></i>
    </button>
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
      dataReady: false,
      nowPage: '收藏人才',
      mainContentLisr: '',
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
      rwdSelect: '',
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
      console.log(this.filterData);
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
    this.getSelfRecommendList();
    this.getJobListData();
    this.getUserData();
    emitter.emit('spinner-open-bg', 800);
  },
};
</script>

<style lang="scss"></style>
