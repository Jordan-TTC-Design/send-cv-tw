<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container">
      <div class="row">
        <div class="col-3">
          <div class="sideCollapse position--sticky--pageTop">
            <div class="accordion-item">
              <p class="p-3">首頁廣告</p>
              <ul class="sideCollapse__innerList pb-5 bg-gray-light">
                <li
                  class="nav__item ps-6"
                  @click="selectInnerListItem('大型版面廣告')"
                  :class="{
                    active: sideBoxInnerList === '大型版面廣告' && sideBoxList === '首頁廣告',
                  }"
                >
                  <p class="nav__item__title">大型版面廣告</p>
                </li>
                <li
                  class="nav__item ps-6"
                  @click="selectInnerListItem('一般版面廣告')"
                  :class="{
                    active: sideBoxInnerList === '一般版面廣告' && sideBoxList === '首頁廣告',
                  }"
                >
                  <p class="nav__item__title">一般版面廣告</p>
                </li>
                <li
                  class="nav__item ps-6"
                  @click="selectInnerListItem('小型版面廣告')"
                  :class="{
                    active: sideBoxInnerList === '小型版面廣告' && sideBoxList === '首頁廣告',
                  }"
                >
                  <p class="nav__item__title">小型版面廣告</p>
                </li>
              </ul>
            </div>
            <div
              class="accordion-item sideCollapse__list--item"
              :class="{ active: sideBoxList === '粉絲專頁廣告' }"
              @click="selectAdSection('粉絲專頁廣告')"
            >
              <p
                class="sideCollapse__list__title sideCollapse__list__title--company"
                :class="{ active: sideBoxList === '粉絲專頁廣告' }"
              >
                粉絲專頁廣告
              </p>
            </div>
            <div
              class="accordion-item sideCollapse__list--item"
              :class="{ active: sideBoxList === '推廣職位' }"
              @click="selectAdSection('推廣職位')"
            >
              <p
                class="sideCollapse__list__title sideCollapse__list__title--company"
                :class="{ active: sideBoxList === '推廣職位' }"
              >
                推廣職位
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-9 col-12" v-if="dataReady === true">
          <div v-if="sideBoxList === '首頁廣告'">
            <div class="bg-white rounded box--shadow p-5 mb-4 d-flex justify-content-between">
              <div>
                <h3 class="section__title--sub">
                  <span class="titleTag--doubleCircle--company me-2"></span>{{ sideBoxInnerList }}
                </h3>
                <p class="mb-2">剩餘額度：{{ company.payService.adTokens }}</p>
                <p class="subTxt text-secondary">
                  剩餘的額度不夠使用嗎？您可以點擊購買額度，可立即加入購物車！
                </p>
              </div>
              <div class="d-flex justify-content-end align-items-end">
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                  購買額度
                </button>
                <button
                  type="button"
                  class="btn btn-companyColor text-light"
                  @click="goToNewAdPage"
                >
                  立即新增廣告
                </button>
              </div>
            </div>
            <div class="adminContentBox--nonPadding">
              <ul class="adminContentNav">
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '廣告說明' }"
                  @click="subNav = '廣告說明'"
                >
                  <p>廣告說明</p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '刊登中' }"
                  @click="subNav = '刊登中'"
                >
                  <p>
                    刊登中<span class="ms-1" v-if="onAdList.length > 0">{{ onAdList.length }}</span>
                  </p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '審核中' }"
                  @click="subNav = '審核中'"
                >
                  <p>
                    審核中<span class="ms-1" v-if="newAdList.length > 0">{{
                      newAdList.length
                    }}</span>
                  </p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '已過期' }"
                  @click="subNav = '已過期'"
                >
                  <p>
                    已過期<span class="ms-1" v-if="offAdList.length > 0">{{
                      offAdList.length
                    }}</span>
                  </p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '審核失敗' }"
                  @click="subNav = '審核失敗'"
                >
                  <p>
                    審核失敗<span class="ms-1" v-if="declineAdList.length > 0">{{
                      declineAdList.length
                    }}</span>
                  </p>
                </li>
              </ul>
              <div class="selectBox__section" v-if="subNav === '廣告說明'">
                <h4 class="pageSubTitle">廣告說明</h4>
                <ul class="infoList infoList--company">
                  <li class="infoList__item">
                    <p class="infoList__item__title">使用時間</p>
                    <p class="infoList__item__content">7 天</p>
                  </li>
                  <li class="infoList__item border-0">
                    <p class="infoList__item__title">使用規則</p>
                    <p class="infoList__item__content">
                      當求職者在使用SendCV搜尋職缺的時候，利用最顯眼的廣告版面向他們曝光，
                      並搭配文案讓您的廣告效益達到最大，假如您有求職的活動頁面，也可以透過點擊廣告前往連結網站。
                    </p>
                  </li>
                </ul>
              </div>
              <div class="selectBox__section" v-if="subNav === '廣告說明'">
                <h4 class="pageSubTitle mb-3">推廣預覽畫面</h4>
                <img class="w-100 rounded" src="https://i.imgur.com/0gQq1A3.png" alt="大型版面預覽畫面">
              </div>
              <div class="selectBox__section pb-5" v-if="subNav === '廣告說明'">
                <h4 class="pageSubTitle mb-4">如何建立廣告</h4>
                <div class="d-flex align-items-start justify-content-between">
                  <p class="me-5">
                    您可以準備合適的廣告宣傳圖，以及闡述徵才活動的文字內容，才能夠清楚地傳遞廣告訊息。
                  </p>
                  <router-link
                    class="btn btn-companyColor text-light"
                    :to="`service-ad/new-ad/web-ad-big`"
                    >立即新增廣告</router-link
                  >
                </div>
              </div>
              <ul class="adminInnerList" v-if="nowAdList.length > 0">
                <template v-for="(item, index) in nowAdList" :key="index">
                  <li class="adminInnerList__item">
                    <img
                      class="adminInnerList__item__img me-3"
                      :src="item.adImgUrl.url"
                      alt="廣告圖片"
                    />
                    <div class="flex-grow-1 me-3">
                      <p
                        class="adminInnerList__item__title mb-2 putPointer"
                        @click="openAdDataModal(item)"
                      >
                        {{ item.adName }}
                      </p>
                      <div class="adminInnerList__item__infoTxt mb-1">
                        <p class="subTxt">刊登日期</p>
                        <p>{{ item.startDate }}</p>
                      </div>
                      <div class="adminInnerList__item__infoTxt">
                        <p class="subTxt">廣告內容</p>
                        <div v-html="item.adContent"></div>
                      </div>
                    </div>
                    <div class="d-flex align-items-end">
                      <button
                        type="button"
                        class="btn btn-outline-gray-line text-dark"
                        v-if="subNav === '刊登中'"
                      >
                        延長時間
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-gray-line text-dark"
                        v-if="subNav === '審核失敗'"
                      >
                        編輯內容
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-gray-line text-dark"
                        v-if="subNav === '已過期'"
                      >
                        重新發佈
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
          <div v-if="sideBoxList === '粉絲專頁廣告'">
            <div class="bg-white rounded box--shadow p-5 mb-4 d-flex justify-content-between">
              <div>
                <h3 class="section__title--sub">
                  <span class="titleTag--doubleCircle--company me-2"></span>粉絲專頁廣告
                </h3>
                <p class="mb-2">剩餘額度：{{ company.payService.bannerTokens }}</p>
                <p class="subTxt text-secondary">
                  剩餘的額度不夠使用嗎？您可以點擊購買額度，可立即加入購物車！
                </p>
              </div>
              <div class="d-flex justify-content-end align-items-end">
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                  購買額度
                </button>
                <router-link
                  class="btn btn-companyColor text-light text-nowrap"
                  :to="`service-ad/new-ad/banner`"
                  >立即新增廣告</router-link
                >
              </div>
            </div>
            <div class="adminContentBox--nonPadding">
              <ul class="adminContentNav w-100">
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '廣告說明' }"
                  @click="subNav = '廣告說明'"
                >
                  <p>廣告說明</p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '刊登中' }"
                  @click="subNav = '刊登中'"
                >
                  <p>
                    刊登中<span class="ms-1" v-if="onAdList.length > 0">{{ onAdList.length }}</span>
                  </p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '審核中' }"
                  @click="subNav = '審核中'"
                >
                  <p>
                    審核中<span class="ms-1" v-if="newAdList.length > 0">{{
                      newAdList.length
                    }}</span>
                  </p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '已過期' }"
                  @click="subNav = '已過期'"
                >
                  <p>
                    已過期<span class="ms-1" v-if="offAdList.length > 0">{{
                      offAdList.length
                    }}</span>
                  </p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '審核失敗' }"
                  @click="subNav = '審核失敗'"
                >
                  <p>
                    審核失敗<span class="ms-1" v-if="declineAdList.length > 0">{{
                      declineAdList.length
                    }}</span>
                  </p>
                </li>
              </ul>
              <div class="selectBox__section" v-if="subNav === '廣告說明'">
                <h4 class="pageSubTitle">廣告說明</h4>
                <ul class="infoList infoList--company">
                  <li class="infoList__item">
                    <p class="infoList__item__title">使用時間</p>
                    <p class="infoList__item__content">無期限</p>
                  </li>
                  <li class="infoList__item border-0">
                    <p class="infoList__item__title">使用規則</p>
                    <p class="infoList__item__content">
                      為您的企業製作精美的徵才廣告文宣，並將廣告文宣刊登於社群平台，讓更多求職者看到您的徵才訊息。
                    </p>
                  </li>
                </ul>
              </div>
              <div class="selectBox__section" v-if="subNav === '廣告說明'">
                <h4 class="pageSubTitle mb-3">推廣預覽畫面</h4>
                <img class="w-100 rounded" src="https://i.imgur.com/ofiQp4a.png" alt="大型版面預覽畫面">
              </div>
              <div class="selectBox__section pb-5" v-if="subNav === '廣告說明'">
                <h4 class="pageSubTitle mb-4">如何建立廣告</h4>
                <div class="d-flex align-items-start justify-content-between">
                  <p class="me-5">
                    只要提供徵才目標的關鍵資訊並交由我們處理，就可以獲得符合職位情況的廣告文宣，您也獲得自由使用該圖片的權利。
                  </p>
                  <button
                    type="button"
                    class="btn btn-companyColor text-light"
                    @click="goToNewAdPage"
                  >
                    立即新增廣告
                  </button>
                </div>
              </div>
              <ul class="adminInnerList" v-if="nowAdList.length > 0">
                <template v-for="(item, index) in nowAdList" :key="index">
                  <li class="adminInnerList__item">
                    <img
                      class="adminInnerList__item__img me-3"
                      :src="item.adImgUrl.url"
                      alt="廣告圖片"
                    />
                    <div class="flex-grow-1 me-3">
                      <p
                        class="adminInnerList__item__title mb-2 putPointer"
                        @click="openAdDataModal(item)"
                      >
                        {{ item.adName }}
                      </p>
                      <div class="adminInnerList__item__infoTxt mb-1">
                        <p class="subTxt">刊登日期</p>
                        <p>{{ item.startDate }}</p>
                      </div>
                      <div class="adminInnerList__item__infoTxt">
                        <p class="subTxt">廣告內容</p>
                        <div v-html="item.adContent"></div>
                      </div>
                    </div>
                    <div class="d-flex align-items-end">
                      <button
                        type="button"
                        class="btn btn-outline-gray-line text-dark"
                        v-if="subNav === '刊登中'"
                      >
                        延長時間
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-gray-line text-dark"
                        v-if="subNav === '審核失敗'"
                      >
                        編輯內容
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-gray-line text-dark"
                        v-if="subNav === '已過期'"
                      >
                        重新發佈
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
          <div v-if="sideBoxList === '推廣職位'">
            <div class="bg-white rounded box--shadow p-5 mb-4 d-flex justify-content-between">
              <div>
                <h3 class="section__title--sub">
                  <span class="titleTag--doubleCircle--company me-2"></span>推廣職位
                </h3>
                <p class="mb-2">剩餘額度：{{ company.payService.jobPromoteTokens }}</p>
                <p class="subTxt text-secondary">
                  剩餘的額度不夠使用嗎？您可以點擊購買額度，可立即加入購物車！
                </p>
              </div>
              <div class="d-flex justify-content-end align-items-end">
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                  購買額度
                </button>
                <router-link class="btn btn-companyColor text-light" :to="`/company-admin/job-list`"
                  >前往設定推廣職位</router-link
                >
              </div>
            </div>
            <div class="adminContentBox--nonPadding">
              <ul class="adminContentNav w-100">
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '廣告說明' }"
                  @click="subNav = '廣告說明'"
                >
                  <p>廣告說明</p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '推廣中' }"
                  @click="subNav = '推廣中'"
                >
                  <p>推廣中<span class="ms-1">99</span></p>
                </li>
              </ul>
              <div class="selectBox__section">
                <h4 class="pageSubTitle">廣告說明</h4>
                <ul class="infoList infoList--company">
                  <li class="infoList__item">
                    <p class="infoList__item__title">使用時間</p>
                    <p class="infoList__item__content">7天</p>
                  </li>
                  <li class="infoList__item border-0">
                    <p class="infoList__item__title">使用規則</p>
                    <p class="infoList__item__content">
                      為您的的徵才職位設定為期一週的推廣活動，在 SendCV
                      的平台首頁中最顯眼的位置展示您的徵才職位，當求職者搜尋相關的職位時，也會將職位標示推薦的符號，讓您的徵才效益最大化。
                    </p>
                  </li>
                </ul>
              </div>
              <div class="selectBox__section">
                <h4 class="pageSubTitle mb-3">推廣預覽畫面</h4>
                <img class="w-100 rounded" src="https://i.imgur.com/edXJc36.png" alt="大型版面預覽畫面">
              </div>
              <div class="selectBox__section pb-5">
                <h4 class="pageSubTitle mb-4">如何設定推廣</h4>
                <div class="d-flex align-items-start justify-content-between">
                  <p class="me-5">
                    選擇最重要或是最緊急的職缺進行推廣，讓所有的求職者都能夠看到企業的徵才訊息。
                  </p>
                  <router-link
                    class="btn btn-companyColor text-light text-nowrap"
                    :to="`/company-admin/job-list`"
                    >前往設定推廣職位</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AdModal />
</template>

<script>
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import database from '@/methods/firebaseinit';
import AdModal from '@/components/company/AdModal.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    CompanyAdminNav,
    AdModal,
  },
  data() {
    return {
      nowPage: '廣告管理',
      sideBoxList: '首頁廣告',
      sideBoxInnerList: '大型版面廣告',
      sideBoxInnerState: '刊登中',
      subNav: '廣告說明',
      allAdList: [],
      dataReady: false,
      company: {},
    };
  },
  computed: {
    nowAdList() {
      const tempArray = this.allAdList.filter((item) => item.adType === this.sideBoxInnerList);
      const stateArray = tempArray.filter((item) => item.adState === this.subNav);
      console.log(stateArray);
      return stateArray;
    },
    newAdList() {
      const tempArray = this.allAdList.filter((item) => item.adType === this.sideBoxInnerList);
      const stateArray = tempArray.filter((item) => item.adState === '審核中');
      console.log(stateArray);
      return stateArray;
    },
    onAdList() {
      const tempArray = this.allAdList.filter((item) => item.adType === this.sideBoxInnerList);
      const stateArray = tempArray.filter((item) => item.adState === '刊登中');
      console.log(stateArray);
      return stateArray;
    },
    offAdList() {
      const tempArray = this.allAdList.filter((item) => item.adType === this.sideBoxInnerList);
      const stateArray = tempArray.filter((item) => item.adState === '已過期');
      console.log(stateArray);
      return stateArray;
    },
    declineAdList() {
      const tempArray = this.allAdList.filter((item) => item.adType === this.sideBoxInnerList);
      const stateArray = tempArray.filter((item) => item.adState === '審核失敗');
      console.log(stateArray);
      return stateArray;
    },
  },
  methods: {
    goToNewAdPage() {
      let routerLink = '';
      if (this.sideBoxInnerList === '大型版面廣告') {
        routerLink = 'service-ad/new-ad/web-ad-big';
      } else if (this.sideBoxInnerList === '一般版面廣告') {
        routerLink = 'service-ad/new-ad/web-ad-md';
      } else if (this.sideBoxInnerList === '小型版面廣告') {
        routerLink = 'service-ad/new-ad/web-ad-sm';
      }
      this.$router.push(routerLink);
    },
    openAdDataModal(item) {
      const obj = {
        action: '檢視廣告',
        data: item,
      };
      emitter.emit('open-ad-modal', obj);
    },
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
    selectAdSection(adSectionType) {
      if (adSectionType === '粉絲專頁廣告') {
        this.sideBoxInnerList = '粉絲專頁廣告';
      } else if (adSectionType === '職位推廣') {
        this.sideBoxInnerList = '職位推廣';
      }
      this.sideBoxList = adSectionType;
      this.subNav = '廣告說明';
    },
    selectInnerListItem(adType) {
      this.selectAdSection('首頁廣告');
      this.sideBoxInnerList = adType;
    },
    getCompanyData() {
      const companyRef = database.ref('company');
      companyRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.company = data;
      });
    },
    getAdListData() {
      this.allAdList = [];
      const companyAdListRef = database.ref('company/payService/adList');
      companyAdListRef.once('value', (snapshot) => {
        const data = snapshot.val();
        Object.keys(data).forEach((item) => {
          // 物件轉陣列
          this.allAdList.push(data[item]);
        });
        this.dataReady = true;
      });
    },
  },
  created() {
    this.getCompanyData();
    this.getAdListData();
  },
};
</script>

<style lang="scss"></style>
