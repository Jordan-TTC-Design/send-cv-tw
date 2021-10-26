<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container position-relative companyPage">
      <div class="row" v-if="dataReady === true">
        <div class="col-lg-4 col-12">
          <ul ref="adminSideList" class="admin-sideList list-group admin-sideList--company">
            <li class="sideList__top">
              <div
                class="sideList__top__item sideList__top--50"
                :class="{ active: sideListNav === '公司職位' }"
                @click="this.sideListNav = '公司職位'"
              >
                <p>公司職位</p>
              </div>
              <div
                class="sideList__top__item sideList__top--50"
                :class="{ active: sideListNav === '拍照申請職位' }"
                @click="this.sideListNav = '拍照申請職位'"
              >
                <p>拍照申請職位</p>
              </div>
            </li>
            <li class="list-group-item p-3 border-bottom border-gray-line">
              <p class="subTxt">目前共 {{ nowJobList.length }} 個職位</p>
            </li>
            <li
              :ref="`companyJobList-${item.key}`"
              :class="{ active: item.key === selectItem.key && fullWidth > 992 }"
              class="sideList__item list-group-item list-group-item-action"
              v-for="item in nowJobList"
              :key="item.key"
              @click="selectJobFormJobList(item.key)"
            >
              <p class="sideList__item__title mb-1">
                {{ item.jobName }}
              </p>
              <p class="sideList__item__subTxt">訂單時間：2021-12-12</p>
            </li>
          </ul>
        </div>
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
              <ul class="adminContentNav w-100">
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
                    <button
                      type="button"
                      class="btn btn-outline-gray-line text-dark me-2"
                      data-action="deleteItem"
                    >
                      聯絡
                    </button>
                    <button type="button" class="btn text-dark" data-action="deleteItem">
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
</template>

<script>
import emitter from '@/methods/emitter';
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import PersonPopModal from '@/components/company/PersonPopModal.vue';

import database from '@/methods/firebaseinit';

export default {
  components: {
    CompanyAdminNav,
    PersonPopModal,
  },
  data() {
    return {
      sideListNav: '公司職位',
      nowPage: '應徵管理',
      subNav: '新申請',
      dataReady: false,
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      selectItem: {},
      companyJobList: [],
      mailApplyList: [],
      shotJobList: [],
      user: {},
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
    openPersonPopModal(action) {
      const obj = {
        action,
        user: this.user,
      };
      emitter.emit('open-person-pop-modal', obj);
    },
    selectJobFormJobList(itemId) {
      if (this.sideListNav === '公司職位') {
        this.companyJobList.forEach((item) => {
          if (item.key === itemId) {
            this.selectItem = {};
            this.selectItem = item;
            document.documentElement.scrollTop = 0;
          }
        });
      } else if (this.sideListNav === '拍照申請職位') {
        this.shotJobList.forEach((item) => {
          if (item.key === itemId) {
            this.selectItem = {};
            this.selectItem = item;
            document.documentElement.scrollTop = 0;
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
            // 物件轉陣列
            this.companyJobList.push(data[item]);
          });
          this.selectJobFormJobList(this.nowJobList[0].key);
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
