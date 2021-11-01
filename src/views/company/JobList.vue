<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container position-relative companyPage" v-if="dataReady === true">
      <div class="row">
        <div class="col-lg-3 col-12">
          <ul ref="adminSideList" class="admin-sideList list-group admin-sideList--company">
            <li class="sideList__top">
              <div
                class="sideList__top__item sideList__top--50"
                :class="{ active: sideListNav === '刊登中' }"
                @click="this.sideListNav = '刊登中'"
              >
                <p>刊登中</p>
              </div>
              <div
                class="sideList__top__item sideList__top--50"
                :class="{ active: sideListNav === '已關閉' }"
                @click="this.sideListNav = '已關閉'"
              >
                <p>已關閉</p>
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
              <p v-if="item.promotedData.promote" class="sideList__item__subTxt">
                推廣有效期限：20天
              </p>
            </li>
          </ul>
        </div>
        <div class="col-lg-9 col-12">
          <button
            type="button"
            class="applyBackBtn btn btn-light text-dark mt-6 mb-4 d-lg-none"
            @click="backToList"
          >
            <i class="jobIcon--sm bi bi-chevron-left me-2"></i>返回<span
              class="applyBackBtn__title ms-4"
              >{{ selectItem.jobName }}</span
            >
          </button>
          <div ref="adminSelectBox" class="adminSelectBox box--shadow px-0" v-if="selectItem.key">
            <div class="selectBox__section">
              <div class="row">
                <div class="col-lg-3 col-12">
                  <img
                    class="jobImage w-100"
                    :src="selectItem.jobImgUrl.url || 'https://i.imgur.com/I2erb3u.png'"
                    alt="職位圖片"
                  />
                </div>
                <div class="col-md-9 col-12 d-flex flex-column">
                  <h4 class="pageSubTitle mb-1">{{ selectItem.jobName }}</h4>
                  <p class="mb-1">更新時間：2021-12-1</p>
                  <div class="adminSelectBox__btnList w-100 flex-grow-1 align-items-end">
                    <select
                      class="form-select w-auto me-2"
                      @change="changeJobState(allJobList[selectItem.key].key)"
                      v-model="allJobList[selectItem.key].is_enabled"
                    >
                      <option
                        :selected="allJobList[selectItem.key].is_enabled === true"
                        :value="true"
                      >
                        刊登中
                      </option>
                      <option
                        :selected="allJobList[selectItem.key].is_enabled === false"
                        :value="false"
                      >
                        暫停刊登
                      </option>
                    </select>
                    <router-link
                      class="btn btn-outline-gray-line text-dark me-2"
                      :to="`edit-job/${selectItem.key}`"
                    >
                      編輯
                    </router-link>
                    <router-link
                      class="btn btn-outline-gray-line text-dark"
                      :to="`preview-job/${selectItem.key}`"
                    >
                      預覽
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="selectBox__section">
              <h4 class="pageSubTitle">職位系統資訊</h4>
              <ul class="infoList infoList--company">
                <li class="infoList__item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="infoList__item__title">需求人數</p>
                      <p class="infoList__item__content">{{ selectItem.peopleNeed }} 人</p>
                    </div>
                    <button type="button" class="btn btn-outline-gray-line text-dark">
                      推薦人才 20 人
                    </button>
                  </div>
                </li>
                <li class="infoList__item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="infoList__item__title">已應徵人才</p>
                      <p class="infoList__item__content">{{ selectItem.peopleNeed }} 人</p>
                    </div>
                    <div class="d-flex">
                      <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                        新申請 20 人
                      </button>
                      <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                        正在聯絡 10 人
                      </button>
                      <button type="button" class="btn btn-outline-gray-line text-dark">
                        邀請面試 2 人
                      </button>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="infoList__item__title">創建時間</p>
                  <p class="infoList__item__content">2020.01.13 19:38</p>
                </li>
                <li class="infoList__item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="infoList__item__title">職位方案</p>
                      <p class="d-flex align-items-center" v-if="selectItem.promotedData.promote">
                        <span
                          class="jobTag bg-primary text-dark me-2"
                          v-if="selectItem.promotedData.promote"
                        >
                          <i class="jobIcon-sm bi bi-star-fill me-1 text-dark"></i>付費推廣職位
                        </span>
                        期限至
                        <span class="text-companyColor text-decoration-underline mx-1"
                          >2021-12-12 12:30</span
                        >
                        止
                      </p>
                      <p class="jobTag text-dark" v-if="!selectItem.promotedData.promote">
                        一般職位
                      </p>
                    </div>
                    <button
                      type="button"
                      class="btn btn-companyColor text-light"
                      v-if="!selectItem.promotedData.promote"
                    >
                      立即付費推播，提高曝光度!
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-gray-line text-dark"
                      v-if="selectItem.promotedData.promote"
                    >
                      延長時間
                    </button>
                  </div>
                </li>
                <li class="infoList__item list--last" v-if="selectItem.questions.length > 0">
                  <p class="infoList__item__title">應徵問題回答</p>
                  <template v-for="(que, index) in selectItem.questions" :key="index">
                    <div class="d-flex align-items-center mb-2">
                      <p>{{ index + 1 }}.{{ que.content }}</p>
                      <button type="button" class="btn btn-outline-gray-line text-dark ms-4">
                        2 個回答
                      </button>
                    </div>
                  </template>
                </li>
              </ul>
            </div>
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
      sideListNav: '刊登中',
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      nowPage: '公司職位',
      editMode: false,
      formData: {},
      selectItem: {},
      companyJobList: [],
      company: {},
      dataReady: false,
      allJobList: {},
    };
  },
  computed: {
    nowJobList() {
      const temArray = [];
      let nowState = true;
      if (this.sideListNav === '已關閉') {
        nowState = false;
      }
      this.companyJobList.forEach((job) => {
        if (job.is_enabled === nowState) {
          temArray.push(job);
        }
      });
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
    changeJobState(itemId) {
      // 要先建立詢問彈跳視窗
      this.saveJobData(itemId);
      this.companyJobList.forEach((item, index) => {
        if (item.key === this.allJobList[itemId].key) {
          this.companyJobList[index].is_enabled = this.allJobList[itemId].is_enabled;
        }
      });
    },
    saveJobData(itemId) {
      const jobDataRef = database.ref(`company/jobList/${itemId}`);
      jobDataRef.set(this.allJobList[itemId]);
    },
    getJobListData() {
      this.companyJobList = [];
      const jobListDataRef = database.ref('company/jobList');
      jobListDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.allJobList = JSON.parse(JSON.stringify(data)); // 深拷貝
          Object.keys(data).forEach((item) => {
            // 物件轉陣列
            this.companyJobList.push(data[item]);
          });
          this.selectJobFormJobList(this.nowJobList[0].key);
        }
      });
    },
    selectJobFormJobList(itemId) {
      this.companyJobList.forEach((item) => {
        if (item.key === itemId) {
          this.selectItem = {};
          this.selectItem = item;
          document.documentElement.scrollTop = 0;
        }
      });
      this.dataReady = true;
    },
  },
  created() {
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
