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
                  <span class="titleTag--doubleCircle--company me-2"></span>大型看板廣告
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
                <router-link
                  class="btn btn-companyColor text-light"
                  :to="`service-ad/new-ad/web-ad-big`"
                  >立即新增廣告</router-link
                >
              </div>
            </div>
            <div class="adminSelectBox p-0">
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
                  :class="{ active: subNav === '刊登中廣告' }"
                  @click="subNav = '刊登中廣告'"
                >
                  <p>刊登中廣告<span class="ms-1">5</span></p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '審核中廣告' }"
                  @click="subNav = '審核中廣告'"
                >
                  <p>審核中廣告<span class="ms-1">99</span></p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '審核失敗' }"
                  @click="subNav = '審核失敗'"
                >
                  <p>審核失敗</p>
                </li>
              </ul>
              <div class="selectBox__section">
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
              <div class="selectBox__section">
                <h4 class="pageSubTitle">推廣預覽畫面</h4>
              </div>
              <div class="selectBox__section pb-5">
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
                  :to="`/company-admin/job-list`"
                  >立刻建立廣告</router-link
                >
              </div>
            </div>
            <div class="adminSelectBox p-0">
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
                  :class="{ active: subNav === '刊登中廣告' }"
                  @click="subNav = '刊登中廣告'"
                >
                  <p>刊登中廣告<span class="ms-1">5</span></p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '審核中廣告' }"
                  @click="subNav = '審核中廣告'"
                >
                  <p>審核中廣告<span class="ms-1">99</span></p>
                </li>
                <li
                  class="adminContentNav__item"
                  :class="{ active: subNav === '審核失敗' }"
                  @click="subNav = '審核失敗'"
                >
                  <p>審核失敗</p>
                </li>
              </ul>
              <div class="selectBox__section">
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
              <div class="selectBox__section">
                <h4 class="pageSubTitle">推廣預覽畫面</h4>
              </div>
              <div class="selectBox__section pb-5">
                <h4 class="pageSubTitle mb-4">如何建立廣告</h4>
                <div class="d-flex align-items-start justify-content-between">
                  <p class="me-5">
                    只要提供徵才目標的關鍵資訊並交由我們處理，就可以獲得符合職位情況的廣告文宣，您也獲得自由使用該圖片的權利。
                  </p>
                  <button type="button" class="btn btn-companyColor text-light text-nowrap">
                    立刻建立廣告
                  </button>
                </div>
              </div>
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
            <div class="adminSelectBox p-0">
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
                  :class="{ active: subNav === '推廣中職位' }"
                  @click="subNav = '推廣中職位'"
                >
                  <p>推廣中職位<span class="ms-1">99</span></p>
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
                <h4 class="pageSubTitle">推廣預覽畫面</h4>
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
</template>

<script>
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    CompanyAdminNav,
  },
  data() {
    return {
      nowPage: '廣告管理',
      sideBoxList: '首頁廣告',
      sideBoxInnerList: '大型版面廣告',
      jobPreviewType: '首頁推廣職位',
      subNav: '廣告說明',
      allAdList: [],
      dataReady: false,
      company: {},
    };
  },
  methods: {
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
    selectAdSection(adSectionType) {
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
      const companyAdListRef = database.ref('company/adList');
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
