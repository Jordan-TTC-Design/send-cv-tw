<template>
  <div class="adminPage--py">
    <NavAdminNav :nowPage="nowPage" />
     <div class="container-xl pageSubNavContainer--sticky mb-5">
      <NavPageSubNav :nav-list="pageSubNavList" v-model:page-sub-nav-state="pageSubNavState" />
    </div>
    <div class="container-xl">
      <p class="ps-3 mb-6 text-primary" v-if="filterTxt !== ''">
        <span class="text-gray-dark">搜尋條件：</span>{{ filterTxt }}
      </p>
      <div class="row row-cols-lg-2">
        <div class="col" v-if="pageSubNavState === 1">
          <div class="ps-3 mb-3 bg-light rounded p-2">
            <p class="text-secondary fw-normal text-nowrap">
              目前共 {{ nowPageItems.length }} 筆拍照求職紀錄
            </p>
          </div>
          <ul v-if="nowPageItems.length > 0">
            <template v-for="item in nowPageItems" :key="item.key">
              <li
                @click="selectJob(item.key)"
                :data-id="item.key"
                :ref="`jobCard--${item.key}`"
                class="jobCard box--shadow jobCard--apply"
              >
                <div class="tag--new">
                  <p class="tag--new__txt">NEW</p>
                </div>
                <div class="d-flex w-100 flex-md-row flex-column p-md-3">
                  <div class="jobCard__imgBox">
                    <img
                      class="jobImage mt-2"
                      :src="item.data.jobImgUrl[0].url || 'https://i.imgur.com/I2erb3u.png'"
                      :alt="`${item.data.jobName}職位圖片`"
                    />
                    <div class="img-cover d-md-none d-block"></div>
                    <div class="jobCard__logoImgBox">
                      <img
                        class="logoImg"
                        src="https://i.imgur.com/nQacvyB.png"
                        :alt="`${item.data.companyName}logo`"
                      />
                    </div>
                  </div>
                  <div class="jobCard__body p-md-0">
                    <div class="jobCard__txtBox">
                      <p class="strongTxt mb-3 me-md-7">{{ item.data.jobName }}</p>
                      <p class="subTxt mb-3 me-md-7">{{ item.data.companyName }}</p>
                      <p class="subTxt--foil">申請時間：{{ $filters.date(item.data.time) }}</p>
                    </div>
                  </div>
                </div>
                <div class="jobCard__footer pt-md-0 justify-content-end">
                  <p class="jobTag">審核中</p>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="col" v-if="pageSubNavState === 2">
          <div class="ps-3 mb-3 bg-light rounded p-2">
            <p class="text-secondary fw-normal text-nowrap">目前共 3 筆寫郵件SendCV紀錄</p>
          </div>
          <ul v-if="nowPageItems.length > 0">
            <template v-for="item in nowPageItems" :key="item.key">
              <li
                @click="selectJob(item.key)"
                :data-id="item.key"
                :ref="`jobCard--${item.key}`"
                class="jobCard box--shadow jobCard--apply"
              >
                <div class="tag--new">
                  <p class="tag--new__txt">NEW</p>
                </div>
                <div class="d-flex w-100 flex-md-row flex-column p-md-3">
                  <div class="jobCard__imgBox">
                    <img
                      class="jobImage mt-2"
                      :src="'https://i.imgur.com/I2erb3u.png'"
                      :alt="`${item.data.jobName}職位圖片`"
                    />
                    <div class="img-cover d-md-none d-block"></div>
                    <div class="jobCard__logoImgBox">
                      <img
                        class="logoImg"
                        src="https://i.imgur.com/nQacvyB.png"
                        :alt="`${item.data.companyName}logo`"
                      />
                    </div>
                  </div>
                  <div class="jobCard__body p-md-0">
                    <div class="jobCard__txtBox">
                      <p class="strongTxt mb-3 me-md-7">{{ item.data.jobName }}</p>
                      <p class="subTxt mb-3 me-md-7">{{ item.data.companyName }}</p>
                      <p class="subTxt--foil">申請時間：{{ $filters.date(item.data.time) }}</p>
                    </div>
                  </div>
                </div>
                <div class="jobCard__footer pt-md-0 justify-content-end">
                  <p class="jobTag">審核中</p>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="col d-lg-block d-none" v-if="jobItem.key !== ''">
          <div ref="sideJobContainer" class="sideJobContainer sideJobContainer--sticky box--shadow">
            <div class="sideJobContainer__header">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex">
                  <p class="jobTag bg-primary me-2"><i class="jobIcon-sm bi bi-star-fill"></i></p>
                  <button type="button" class="jobTag btn me-2">100%</button>
                </div>
                <button
                  class="btn btn-outline-gray-line btn-bg text-dark d-flex align-items-center me-2"
                  type="button"
                >
                  聯絡
                </button>
              </div>
              <div class="d-flex">
                <div class="sideJobContainer__imgBox">
                  <img
                    class="jobImage mt-3"
                    :src="'https://i.imgur.com/I2erb3u.png'"
                    :alt="`${jobItem.data.jobName}職位圖片`"
                  />
                  <div class="logoImageBox">
                    <img
                      class="logoImage"
                      :src="'https://i.imgur.com/I2erb3u.png'"
                      :alt="`${jobItem.data.companyName}logo`"
                    />
                  </div>
                </div>
                <div class="flex-grow-1">
                  <p class="strongTxt mb-3 d-block">{{ jobItem.data.jobName }}</p>
                  <p class="txtLink subTxt mb-4 d-block" type="button">
                    {{ jobItem.data.companyName }}
                  </p>
                  <p class="me-5 subTxt">
                    <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                    >{{ jobItem.data.addressCity }}，{{ jobItem.data.addressDist }}
                  </p>
                  <p class="subTxt" v-if="!jobItem.data.salaryInterView">
                    <span><i class="jobIcon--sm me-1 bi bi-currency-dollar"></i></span>
                    {{ jobItem.data.salaryInterLow }} / 月薪
                  </p>
                  <p class="subTxt" v-if="jobItem.data.salaryInterView">
                    <span><i class="jobIcon--sm me-1 bi bi-currency-dollar"></i></span>
                    薪資面議
                  </p>
                </div>
              </div>
            </div>
            <ul class="innerNav innerNav--fill innerNav--jobSeeker">
              <li
                class="innerNav__item w--50"
                :class="{ active: innerNav === '申請資料' }"
                @click="changeNav('innerNav', '申請資料')"
              >
                <p>申請資料</p>
              </li>
              <li
                class="innerNav__item w--50"
                :class="{ active: innerNav === '職位內容' }"
                @click="changeNav('innerNav', '職位內容')"
              >
                <p>職位內容</p>
              </li>
            </ul>
            <div v-if="innerNav === '申請資料'">
              <ul>
                <li class="infojobCard">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="infojobCard__title">應徵狀態</p>
                      <p class="infojobCard__content">面試邀請</p>
                    </div>
                    <div class="d-flex">
                      <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                        改時間
                      </button>
                      <button type="button" class="btn btn-gray-light text-dark me-2">婉拒</button>
                      <button type="button" class="btn btn-primary text-dark">同意</button>
                    </div>
                  </div>
                </li>
                <li class="infojobCard">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="infojobCard__title">面試時間</p>
                      <p class="infojobCard__content">2020.01.13 19:38</p>
                    </div>
                  </div>
                </li>
                <li class="infojobCard">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="infojobCard__title">面試地點</p>
                      <p class="infojobCard__content">台北市中山區南京東路二段150號10樓</p>
                    </div>
                    <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                      打開地圖
                    </button>
                  </div>
                </li>
                <li class="infojobCard">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="infojobCard__title">應徵方式</p>
                      <p class="infojobCard__content">sendCV 申請職位</p>
                    </div>
                  </div>
                </li>
                <li class="infojobCard">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="infojobCard__title">應徵時間</p>
                      <p class="infojobCard__content">2020.01.13 19:38</p>
                    </div>
                  </div>
                </li>
                <li class="infojobCard list--last mb-5">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="infojobCard__title">應徵紀錄</p>
                      <p class="infojobCard__content">
                        面試邀請<span class="subTxt">2020.01.13 19:38</span>
                      </p>
                    </div>
                    <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                      查看全部
                    </button>
                  </div>
                </li>
              </ul>
              <ul ref="collapse" class="accordion">
                <!-- <li>應徵文件</li> -->
                <li class="accordion-item bg-gray-light py-2">
                  <p class="text-dark text-center">應徵文件</p>
                </li>
                <li class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#applyDocument-cv"
                      aria-expanded="false"
                      aria-controls="applyDocument-cv"
                    >
                      履歷
                    </button>
                  </h2>
                  <div id="applyDocument-cv" class="accordion-collapse collapse">
                    <div class="accordion-body">
                      <strong>This is the first item's accordion body.</strong> It is shown by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It's also worth noting that
                      just about any HTML can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </li>
                <li class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#applyDocument-coverLetter"
                      aria-expanded="false"
                      aria-controls="applyDocument-coverLetter"
                    >
                      求職信
                    </button>
                  </h2>
                  <div id="applyDocument-coverLetter" class="accordion-collapse collapse">
                    <div class="accordion-body">
                      <strong>This is the second item's accordion body.</strong> It is hidden by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It's also worth noting that
                      just about any HTML can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </li>
                <li class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#applyDocument-selfIntro"
                      aria-expanded="false"
                      aria-controls="applyDocument-selfIntro"
                    >
                      自我介紹影片
                    </button>
                  </h2>
                  <div id="applyDocument-selfIntro" class="accordion-collapse collapse">
                    <div class="accordion-body">
                      <strong>This is the third item's accordion body.</strong> It is hidden by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It's also worth noting that
                      just about any HTML can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </li>
                <li class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#applyDocument-companyAsk"
                      aria-expanded="false"
                      aria-controls="applyDocument-companyAsk"
                    >
                      公司提問
                    </button>
                  </h2>
                  <div id="applyDocument-companyAsk" class="accordion-collapse collapse">
                    <div class="accordion-body">
                      <strong>This is the third item's accordion body.</strong> It is hidden by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It's also worth noting that
                      just about any HTML can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-if="innerNav === '職位內容'">
              <div class="sideJobContainer__body">
                <div class="sideJobContainer__section">
                  <h4 class="sectionTitle--withTag mb-4">
                    <span class="sectionTitleTag--double me-2"></span>
                    職位內容
                  </h4>
                  <div v-if="pageSubNavState === 'shotList'">
                    <div
                      class="sideJobContainer__jobInfoImgBox"
                      v-for="(itemUrl, number) in jobItem.data.jobImgUrl"
                      :key="number"
                    >
                      <img
                        class="sideJobContainer__jobInfoImgBox__img"
                        :src="itemUrl.url"
                        :alt="`${jobItem.data.jobName}職位圖片`"
                      />
                      <p v-if="itemUrl.content" class="mt-2">{{ itemUrl.content }}</p>
                    </div>
                  </div>
                  <p v-if="pageSubNavState === 'mailList'">{{ jobItem.data.jobContent }}</p>
                </div>
                <div class="sideJobContainer__section" v-if="pageSubNavState === 'shotList'">
                  <h4 class="sectionTitle--withTag mb-4">
                    <span class="sectionTitleTag--double me-2"></span>
                    申請方法
                  </h4>
                  <div
                    class="sideJobContainer__jobInfoImgBox"
                    v-for="(itemUrl, number) in jobItem.data.companyImgUrl"
                    :key="number"
                  >
                    <img
                      class="sideJobContainer__jobInfoImgBox__img"
                      :src="itemUrl.url"
                      :alt="`${jobItem.data.jobName}職位圖片`"
                    />
                    <p v-if="itemUrl.content" class="mt-2">{{ itemUrl.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <PagenationModal
      :jobs-list="jobsList"
      @change-page="changePage"
    /> -->
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
</template>

<script>
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import emitter from '@/methods/emitter';
import searchFilter from '@/methods/searchFilter';
import webData from '@/methods/webData';
// import PagenationModal from '@/components/helpers/Pagenation.vue';
import NavAdminNav from '@/components/admin/NavAdminNav.vue';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import database from '@/methods/firebaseinit';
import NavPageSubNav from '@/components/helpers/NavPageSubNav.vue';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default {
  components: {
    // PagenationModal,
    UpTopBtn,
    NavAdminNav,
    NavPageSubNav,
  },
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      nowPage: '自我推薦',
      pageSubNavState: 1,
      pageSubNavList: [
        { title: '拍照申請', value: 1 },
        { title: '寫郵件 SendCV', value: 2 },
      ],
      innerNav: '申請資料',
      jobsList: [],
      jobItem: {
        key: '',
      },
      searchFilterMethods: {},
      searchByJobCategoryState: false,
      pageNumber: 1,
      sortWay: 'time',
      formData: {},
      filterData: {
        keyword: '',
        city: '不限',
        industryCategory: '不限',
        jobCategory: '不限',
        workExp: '不限',
        education: '不限',
        workType: '不限',
        workTime: '不限',
        salaryLow: null,
        salaryHight: null,
        salaryInterView: false,
      },
      // 篩選框顯示與否狀態
      filterBoxState: false,
      filterTxt: '',
      mountState: false,
      otherApplyList: [],
      dataReady: false,
      nowPageItems: [],
      mailList: [],
      shotList: [],
    };
  },
  // watch: {
  //   pageSubNavState: {
  //     deep: true,
  //     handler(newValue, oldValue) {
  //       if (newValue !== oldValue) {
  //         this.pageNumber = 0;
  //       }
  //     },
  //   },
  // },
  methods: {
    // 切換頁面
    changePage(nowPageNum) {
      this.pageNumber = nowPageNum;
      this.getNowPageItems();
    },
    changeSubNav(navName) {
      this.pageSubNavState = navName;
      this.pageNumber = 1;
      this.filterListData(this.pageSubNavState);
    },
    getOtherApplyData() {
      const otherApplyRef = database.ref('applyList/otherApplyList');
      otherApplyRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.otherApplyList = data;
        this.dataReady = true;
        this.filterListData(this.pageSubNavState);
      });
    },
    filterListData(dataName) {
      if (this.otherApplyList[dataName].length !== []) {
        this.jobsList = Object.keys(this.otherApplyList[dataName]).map((itemName) => ({
          data: this.otherApplyList[dataName][itemName].data,
          key: this.otherApplyList[dataName][itemName].key,
        }));
        console.dir(this.jobsList);
      }
      this.getNowPageItems();
    },
    getNowPageItems() {
      const tempList = [];
      const pageFrist = this.pageNumber * 10 - 10;
      console.log(pageFrist);
      this.jobsList.forEach((item, index) => {
        if (pageFrist <= index && index < this.pageNumber * 10) {
          tempList.push(item);
        }
      });
      document.documentElement.scrollTop = 0;
      this.nowPageItems = JSON.parse(JSON.stringify(tempList));
      console.log(this.nowPageItems);
      console.log(this.nowPageItems[0].key);
      setTimeout(() => {
        if (this.nowPageItems.length > 0) {
          this.selectJobFrist(this.nowPageItems[0].key);
        }
      }, 100);
    },
    // 點擊卡片：pc->選擇右側職位，pad->跳轉至該職位頁面
    selectJob(id) {
      if (this.fullWidth > 991) {
        this.nowPageItems.forEach((item) => {
          if (item.key === id) {
            this.jobItem = item;
            this.$refs[`jobCard--${item.key}`].classList.add('active');
          } else if (item.key !== id) {
            this.$refs[`jobCard--${item.key}`].classList.remove('active');
          }
        });
        this.$refs.sideJobContainer.scrollTop = 0;
      } else {
        // this.$router.push(`/products-list/product/${id}`);
      }
    },
    selectJobFrist(id) {
      if (this.fullWidth > 991) {
        this.nowPageItems.forEach((item) => {
          console.log(item.key);
          if (item.key === id) {
            this.jobItem = item;
            this.$refs[`jobCard--${item.key}`].classList.add('active');
          } else if (item.key !== id) {
            this.$refs[`jobCard--${item.key}`].classList.remove('active');
          }
        });
      }
    },
  },
  created() {
    this.getOtherApplyData();
    this.formData = webData;
    this.searchFilterMethods = searchFilter;
    emitter.emit('spinner-open-bg', 1200);
  },
  mounted() {
    this.mountState = true;
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
