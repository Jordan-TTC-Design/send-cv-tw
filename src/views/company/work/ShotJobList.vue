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
    <div class="container-xl position-relative">
      <div class="row">
        <div class="col-xl-3 col-lg-4" :class="{ 'rwdClose--md': rwdSelect !== '' }">
          <div class="sideContentBox pb-3">
            <ul class="innerNav innerNav--fill innerNav--company">
              <li
                class="innerNav__item w--50"
                :class="{ active: sideListNav === '刊登中' }"
                @click="this.sideListNav = '刊登中'"
              >
                <p>刊登中</p>
              </li>
              <li
                class="innerNav__item w--50"
                :class="{ active: sideListNav === '已關閉' }"
                @click="this.sideListNav = '已關閉'"
              >
                <p>已關閉</p>
              </li>
            </ul>
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
        <div class="col-xl-9 col-lg-8" :class="{ 'rwdClose--md': rwdSelect === '' }">
          <div ref="adminSelectBox" class="adminContentBox" v-if="selectItem.key">
            <div class="adminContentBox__header">
              <div class="row gy-4">
                <div class="col-md-4">
                  <div class="jobImgBox">
                    <img
                      class="jobImg"
                      :src="selectItem.jobImgUrl[0].url || 'https://i.imgur.com/I2erb3u.png'"
                      alt="職位圖片"
                    />
                  </div>
                </div>
                <div class="col-md-8 d-flex flex-column">
                  <h4 class="pageSubTitle mb-2">{{ selectItem.jobName }}</h4>
                  <p class="text-secondary mb-1">更新時間：2021-12-1</p>
                  <div class="adminContentBox__header__innerBtnList">
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
                      :to="`edit-shot-job/${selectItem.key}`"
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
            <div class="adminContentBox__body">
              <h4 class="pageSubTitle">職位系統資訊</h4>
              <ul class="infoList infoList--company infoList--withBtn">
                <li class="infoList__item">
                  <div class="infoList__item__txtBox">
                    <p class="infoList__item__title">需求人數</p>
                    <p class="infoList__item__content">1人</p>
                  </div>
                  <div class="infoList__btnBox">
                    <button type="button" class="btn btn-outline-gray-line text-dark">
                      推薦人才 20 人
                    </button>
                  </div>
                </li>
                <li class="infoList__item">
                  <div class="infoList__item__txtBox">
                    <p class="infoList__item__title">已應徵人才</p>
                    <p class="infoList__item__content">1 人</p>
                  </div>
                  <div class="infoList__btnBox">
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
                </li>
                <li class="infoList__item">
                  <div class="infoList__item__txtBox">
                    <p class="infoList__item__title">創建時間</p>
                    <p class="infoList__item__content">2020.01.13 19:38</p>
                  </div>
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
      nowPage: '拍照申請職位',
      sideListNav: '刊登中',
      mainContentList: '',
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      editMode: false,
      formData: {},
      selectItem: {},
      shotList: [],
      company: {},
      allJobList: {},
      // rwd
      rwdSelect: '',
    };
  },
  computed: {
    nowJobList() {
      const temArray = [];
      let nowState = true;
      if (this.sideListNav === '已關閉') {
        nowState = false;
      }
      this.shotList.forEach((job) => {
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
      this.shotList.forEach((item, index) => {
        if (item.key === this.allJobList[itemId].key) {
          this.companyJobList[index].is_enabled = this.allJobList[itemId].is_enabled;
        }
      });
    },
    saveJobData(itemId) {
      const shotListDataRef = database.ref(`applyList/otherApplyList/shotList/${itemId}`);
      shotListDataRef.set(this.allJobList[itemId]);
    },
    getShotListData() {
      this.shotList = [];
      const shotListDataRef = database.ref('applyList/otherApplyList/shotList');
      shotListDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.allJobList = JSON.parse(JSON.stringify(data)); // 深拷貝
        if (data) {
          Object.keys(data).forEach((item) => {
            // 物件轉陣列
            this.shotList.push(data[item]);
          });
          this.selectJobFormJobList(this.nowJobList[0].key);
        }
      });
    },
    selectJobFormJobList(itemId) {
      this.nowJobList.forEach((item) => {
        if (item.key === itemId) {
          this.selectItem = {};
          this.selectItem = item;
          document.documentElement.scrollTop = 0;
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
    this.getShotListData();
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
