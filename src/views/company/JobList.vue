<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container position-relative companyPage">
      <div class="row">
        <!-- 企業資料 -->
        <div class="col-lg-4 col-12">
          <ul ref="adminSideList" class="admin-sideList list-group admin-sideList--company">
            <li
              class="
                border-bottom border-gray-line
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                bg-white
                p-3
              "
            >
              <p class="subTxt">目前共 {{ companyJobList.length }} 個職位</p>
            </li>
            <li
              :ref="`companyJobList-${item.key}`"
              :class="{ active: item.key === selectItem.key && fullWidth > 992 }"
              class="sideList__item list-group-item list-group-item-action"
              v-for="item in companyJobList"
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
        <div class="col-lg-8 col-12">
          <button
            type="button"
            class="applyBackBtn btn btn-light text-dark mt-6 mb-4 d-lg-none"
            @click="backToList"
          >
            <i class="bi bi-chevron-left me-2"></i>返回<span class="applyBackBtn__title ms-4">{{
              selectItem.jobName
            }}</span>
          </button>
          <div ref="adminSelectBox" class="adminSelectBox box--shadow px-0" v-if="selectItem.key">
            <div class="selectBox__section">
              <div class="row">
                <div class="col-lg-7 col-12">
                  <h4 class="pageSubTitle mb-2">{{ selectItem.jobName }}</h4>
                  <p class="sideList__item__subTxt">更新時間：2021-12-12</p>
                </div>
                <div class="col-md-5 col-12">
                  <div class="adminSelectBox__btnList">
                    <select
                      class="form-select w-auto me-2"
                      @change="changeJobState(selectItem.key)"
                      v-model="selectItem.is_enabled"
                    >
                      <option :selected="selectItem.is_enabled === true" :value="true">
                        刊登中
                      </option>
                      <option :selected="selectItem.is_enabled === false" :value="false">
                        暫停刊登
                      </option>
                    </select>
                    <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                      編輯
                    </button>
                    <button type="button" class="btn btn-outline-gray-line text-dark">
                      預覽
                    </button>
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
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="infoList__item__title">創建時間</p>
                      <p class="infoList__item__content">2020.01.13 19:38</p>
                    </div>
                  </div>
                </li>
                <li
                  class="infoList__item"
                  :class="{ 'list--last': selectItem.questions.length === 0 }"
                >
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="infoList__item__title">職位方案</p>
                      <p class="infoList__item__content">
                        {{ selectItem.promotedData.promote ? '付費推廣職位' : '一般職位' }}
                      </p>
                    </div>
                    <button
                      type="button"
                      class="btn btn-companyColor text-light"
                      v-if="!selectItem.promotedData.promote"
                    >
                      立即付費推播，提高曝光度!
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
import webData from '@/methods/webData';
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    CompanyAdminNav,
  },
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      date: new Date(),
      nowPage: '刊登中職位',
      editMode: false,
      formData: {},
      selectItem: {},
      companyJobList: [],
      company: {},
    };
  },
  watch: {
    date(newValue) {
      const data = Math.ceil(newValue.valueOf() / 1000);
      this.user.account.birthday = data;
      console.log(data);
      console.dir(this.$filters.date(data));
      console.log(data);
    },
  },
  methods: {
    changeJobState(itemId) {
      // 要先建立詢問彈跳視窗
      this.saveJobData(itemId);
    },
    saveJobData(itemId) {
      const jobDataRef = database.ref(`company/jobList/${itemId}`);
      jobDataRef.set(this.selectItem);
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
          this.selectJobFormJobList(this.companyJobList[0].key);
        }
      });
    },
    selectJobFormJobList(itemId) {
      this.companyJobList.forEach((item) => {
        if (item.key === itemId) {
          this.selectItem = {};
          this.selectItem = item;
          console.log(this.selectItem);
          // setTimeout(() => {
          //   this.$refs.adminSelectBox.classList.add('checked');
          //   this.$refs.adminSideList.classList.add('checked');
          //   this.$refs.adminSubHeader.classList.add('checked');
          // }, 400);
          document.documentElement.scrollTop = 0;
        }
      });
    },
    // 切換
    toogleData(dataName) {
      if (this[dataName]) {
        this[dataName] = false;
      } else if (!this[dataName]) {
        this[dataName] = true;
      }
    },
  },
  created() {
    this.getJobListData();
    this.formData = webData;
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
