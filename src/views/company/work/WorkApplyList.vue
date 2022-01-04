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
                        <p class="talentInfo__item__title">申請時間</p>
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
                    class="collectBtn btn btn-outline-gray-line position-absolute"
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
  <PersonPopModal />
  <PersonActionModal />
</template>

<script>
import emitter from '@/methods/emitter';
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import PersonPopModal from '@/components/company/PersonPopModal.vue';
import PersonActionModal from '@/components/company/PersonActionModal.vue';
import database from '@/methods/firebaseinit';
import NavBoxNav from '@/components/helpers/NavBoxNav.vue';

export default {
  components: {
    CompanyAdminNav,
    PersonPopModal,
    PersonActionModal,
    NavBoxNav,
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
    this.getJobListData();
    this.getShotJobList();
    this.getUserData();
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
