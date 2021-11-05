<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container position-relative companyPage">
      <div class="row" v-if="dataReady === true">
        <div class="col-lg-8 col-12">
          <button
            type="button"
            class="applyBackBtn btn btn-light text-dark mt-6 mb-4 d-lg-none"
            @click="backToList"
          >
            <i class="bi bi-chevron-left me-2"></i>返回
          </button>
          <div class="admin__mainContent p-0 pb-3">
            <div class="adminContentList">
              <ul class="adminContentNav adminContentNav--fill w-100">
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '新申請' }"
                  @click="subNav = '新申請'"
                >
                  <p>新申請<span class="ms-1">5</span></p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '已瀏覽' }"
                  @click="subNav = '已瀏覽'"
                >
                  <p>已瀏覽</p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '正在聯絡' }"
                  @click="subNav = '正在聯絡'"
                >
                  <p>正在聯絡<span class="ms-1">99</span></p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '邀請面試' }"
                  @click="subNav = '邀請面試'"
                >
                  <p>邀請面試</p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '已錄取' }"
                  @click="subNav = '已錄取'"
                >
                  <p>已錄取</p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '已拒絕' }"
                  @click="subNav = '已拒絕'"
                >
                  <p>已拒絕</p>
                </li>
              </ul>
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
                        <p class="personCard__name mb-0 me-2">{{ user.account.chineseName }}</p>
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
                          <p class="personCard__subTxt">申請時間</p>
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
                      class="btn btn-outline-companyColor text-decoration-underline me-2"
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
</template>

<script>
import emitter from '@/methods/emitter';
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';

import database from '@/methods/firebaseinit';

export default {
  components: {
    CompanyAdminNav,
  },
  data() {
    return {
      nowPage: '自我推薦',
      subNav: '新申請',
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
