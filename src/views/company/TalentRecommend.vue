<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container position-relative companyPage">
      <div class="row" v-if="dataReady === true">
        <div class="col-lg-3 col-12">
          <ul ref="adminSideList" class="admin-sideList list-group admin-sideList--company">
            <li class="sideList__top px-3 py-1 justify-content-between align-items-center">
              <p class="subTxt">目前共 {{ nowJobList.length }} 個公司職位</p>
              <button type="button" class="btn"><i class="jobIcon bi bi-search"></i></button>
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
              <p class="sideList__item__subTxt">推薦人才：{{mailApplyList.length}} 人</p>
            </li>
          </ul>
        </div>
        <div class="col-lg-9 col-12">
          <button
            type="button"
            class="applyBackBtn btn btn-light text-dark mt-6 mb-4 d-lg-none"
            @click="backToList"
          >
            <i class="bi bi-chevron-left me-2"></i>返回
          </button>
          <div class="admin__mainContent p-0 pb-3">
            <div
              class="
                border-bottom border-gray-line
                px-3 py-1
                d-flex
                justify-content-between
                align-items-center
              "
            >
              <p class="subTxt">{{ selectItem.jobName }}：{{ mailApplyList.length }} 位推薦人才</p>
              <div class="d-flex align-items-center">
              <button type="button" class="btn me-2"><i class="jobIcon bi bi-search"></i></button>
              <div class="inputGroup--item">
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
            </div></div>
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
      sideListNav: '公司職位',
      nowPage: '推薦人才',
      dataReady: false,
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
