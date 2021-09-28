<template>
  <div class="page--pt pt-0">
    <div class="container-fuild">
      <!-- 搜尋banner -->
      <div class="mainBanner position-relative">
        <div class="mainBanner__bgBox">
          <div class="mainBanner__bgBox__bg bg-dark mainBanner__bgBox__bg--left"></div>
          <div class="mainBanner__bgBox__bg bg-primary mainBanner__bgBox__bg--right"></div>
        </div>
        <img class="mainBanner__img" src="https://i.imgur.com/FP1Aa4K.png" alt="找工作在這裡" />
        <div class="container">
          <div class="row justify-content-end">
            <div class="col-lg-5">
              <div class="mainBanner__innerBox bg-white rounded">
                <h2 class="mainBanner__title text-dark mb-4">搜尋職位</h2>
                <form class="mainBanner__searchBar" @submit="toSearchJob">
                  <div class="inputGroup--item mb-3">
                    <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                      >關鍵字</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="searchFilterTop-keyword"
                      placeholder="職位關鍵字"
                      aria-describedby="關鍵字"
                      v-model="filterData.keyword"
                    />
                  </div>
                  <div
                    class="
                      d-flex
                      justify-content-between
                      align-items-md-end align-items-stretch
                      flex-grow-1 flex-md-row flex-column
                    "
                  >
                    <div class="inputGroup--item flex-grow-1 me-md-4 mb-3">
                      <label for="searchFilterTop-city" class="form-label inputItem__title"
                        >地區</label
                      >
                      <select
                        class="form-select"
                        aria-label="地區"
                        id="searchFilterTop-city"
                        v-model="filterData.city"
                      >
                        <option disabled>請選擇地區</option>
                        <option selected value="不限">不限</option>
                        <option
                          v-for="(item, index) in formData.city"
                          :value="item"
                          :key="`地區${index}`"
                        >
                          {{ item }}
                        </option>
                      </select>
                    </div>
                    <div class="inputGroup--item flex-grow-1 mb-3">
                      <label for="searchFilterTop-city" class="form-label inputItem__title"
                        >職位類別</label
                      >
                      <select
                        class="form-select"
                        aria-label="地區"
                        id="searchFilterTop-city"
                        v-model="filterData.jobCategory"
                      >
                        <option disabled>請選擇職位類別</option>
                        <option selected value="不限">不限</option>
                        <option
                          v-for="(item, index) in formData.jobCategory"
                          :value="item"
                          :key="`職位類別${index}`"
                        >
                          {{ item }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="d-flex mb-4">
                    <p class="subTxt text-nowrap me-2 mt-1">推薦關鍵字：</p>
                    <ul class="mainBanner__searchBar__tagList">
                      <li class="jobTag">UIDesigner</li>
                      <li class="jobTag">前端工程師</li>
                      <li class="jobTag">營銷經理</li>
                      <li class="jobTag">店長</li>
                      <li class="jobTag">土木技師</li>
                      <li class="jobTag">機構工程</li>
                      <li class="jobTag">食品管理</li>
                    </ul>
                  </div>
                  <div
                    class="
                      d-flex
                      justify-content-between
                      align-items-md-end align-items-stretch
                      flex-grow-1 flex-md-row flex-column
                    "
                  >
                  <button class="btn btn-outline-gray-line text-dark" type="button">近期搜尋</button>
                  <button class="btn btn-primary" type="submit">搜尋職位</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <!-- 熱門職位 -->
        <div ref="sectionHotJob" class="sectionHotJob section--py border-bottom border-gray-line">
          <div class="titleBox--tag">
            <h3 class="titleBox__title">熱門職位</h3>
            <p class="titleBox__tag">推薦</p>
          </div>
          <div class="row flex-wrap">
            <div class="col-lg-6 col-12 mb-lg-0 mb-4">
              <router-link
                class="card--hotJob card--lg putPointer"
                v-if="this.sortHotJobs[0]"
                :style="{ 'background-image': `url(${sortHotJobs[0]['imageUrl']} )` }"
                :to="`/products-list/product/${sortHotJobs[0].id}`"
              >
                <div class="card__btnBox">
                  <button
                    class="collectBtn btn btn-outline-light"
                    :class="{ collected: sortHotJobs[0].jobCollectCheck }"
                    type="button"
                    @click.prevent="collectJob(sortHotJobs[0])"
                  >
                    <i class="jobIcon bi bi-bookmark-fill"></i>
                  </button>
                </div>
                <div class="txtBox">
                  <router-link
                    class="card__title mb-3 d-block putPointer"
                    :to="`/products-list/product/${sortHotJobs[0].id}`"
                    >{{ sortHotJobs[0].title }}</router-link
                  >
                  <router-link
                    class="card__txt mb-3 d-block putPointer"
                    :to="`/products-list/company/${sortHotJobs[0].options.company.companyLink}`"
                    >{{ sortHotJobs[0].options.company.companyName }}</router-link
                  >
                  <div class="d-flex align-items-center">
                    <p class="jobTag me-2">100%</p>
                    <p
                      class="card__subTxt text-light"
                      v-if="!sortHotJobs[0].options.job.salaryInterView"
                    >
                      {{ sortHotJobs[0].price }} / 月薪
                    </p>
                    <p
                      class="card__subTxt text-light"
                      v-if="sortHotJobs[0].options.job.salaryInterView"
                    >
                      薪資面議
                    </p>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="col-lg-6 col-12">
              <div class="row">
                <template v-for="(item, index) in sortHotJobs" :key="item.id">
                  <div
                    class="col-md-6 col-12 mb-4"
                    :class="{ 'mb-lg-0': index > 2 }"
                    v-if="index >= 1 && index <= 4"
                  >
                    <router-link
                      class="card--hotJob card--sm"
                      v-if="sortHotJobs[index]"
                      :style="{ 'background-image': `url(${sortHotJobs[index]['imageUrl']} )` }"
                      :to="`/products-list/product/${sortHotJobs[index].id}`"
                    >
                      <div class="card__btnBox">
                        <button
                          class="collectBtn btn btn-outline-light"
                          :class="{ collected: sortHotJobs[index].jobCollectCheck }"
                          type="button"
                          @click.prevent="collectJob(item)"
                        >
                          <i class="jobIcon bi bi-bookmark-fill"></i>
                        </button>
                      </div>
                      <div class="txtBox">
                        <router-link
                          class="card__title d-block putPointer"
                          :to="`/products-list/product/${sortHotJobs[index].id}`"
                          >{{ sortHotJobs[index].title }}</router-link
                        >
                        <router-link
                          class="card__txt d-block putPointer"
                          :to="`/products-list/company/
                            ${sortHotJobs[index].options.company.companyLink}`"
                          >{{ sortHotJobs[index].options.company.companyName }}</router-link
                        >
                        <div class="d-flex align-items-center">
                          <p class="jobTag me-2">100%</p>
                          <p
                            class="card__subTxt text-light"
                            v-if="!sortHotJobs[index].options.job.salaryInterView"
                          >
                            {{ sortHotJobs[index].price }} / 月薪
                          </p>
                          <p
                            class="card__subTxt text-light"
                            v-if="sortHotJobs[index].options.job.salaryInterView"
                          >
                            薪資面議
                          </p>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新職位 -->
        <div class="section--newJob section--py">
          <div class="d-flex align-items-center mb-4">
            <div class="titleBox--tag mb-0">
              <h3 class="titleBox__title">最新職位</h3>
            </div>
            <button type="button" class="btn btn-primary">
              <i class="jobIcon text-dark bi bi-camera"></i>
              立即拍照上傳您身邊職位，我們就幫您聯繫求職！
            </button>
          </div>
          <swiper
            :slides-per-view="swiperNum"
            :space-between="20"
            :autoplay="swiperDetail.autoPlay"
            :pagination="swiperDetail.pagination"
            :navigation="swiperDetail.navigation"
            v-if="dataOk"
          >
            <swiper-slide v-for="item in sortNewJobs" :key="item.id">
              <GoodJobCard :good-job="item"></GoodJobCard>
            </swiper-slide>
            <div class="swiper-button-prev swiper-custom">
              <button type="button" class="btn btn-lg rounded-circle iconBtnBox">
                <i class="bi bi-arrow-left actionIcon"></i>
              </button>
            </div>
            <div class="swiper-button-next swiper-custom">
              <button type="button" class="btn btn-lg rounded-circle iconBtnBox">
                <i class="bi bi-arrow-right actionIcon"></i>
              </button>
            </div>
          </swiper>
        </div>
      </div>
      <div class="bg-white">
        <div class="container">
          <div class="section--py border-bottom border-gray-line">
            <div class="titleBox--tag justify-content-center">
              <h3 class="titleBox__title">如何使用拍照申請功能？</h3>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="card--howTo">
                  <img src="@/assets/images/howto/snapJob-howto-1.png" alt="拍照申請說明圖" />
                  <div class="card__txtBox">
                    <h5>路過看到好工作</h5>
                    <p>上班途中經過看到心愛的咖啡店在徵人，先拍下來！</p>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card--howTo">
                  <img src="@/assets/images/howto/snapJob-howto-2.png" alt="拍照申請說明圖" />
                  <div class="card__txtBox">
                    <h5>上傳 sendCV</h5>
                    <p>選擇搭配已經建立好的 sendCV 履歷，環保省時。</p>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card--howTo">
                  <img src="@/assets/images/howto/snapJob-howto-3.png" alt="拍照申請說明圖" />
                  <div class="card__txtBox">
                    <h5>幫你投遞履歷</h5>
                    <p>經過 sendCV 審核，讓企業接受度 up up！</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="recommendCardList section--py">
            <div class="titleBox--tag">
              <h3 class="titleBox__title">興趣職位推薦</h3>
              <div class="recommendTagList">
                <button
                  type="button"
                  class="recommendTagList__btn btn btn-outline-gray-line active"
                >
                  根據個人興趣
                </button>
                <button
                  type="button"
                  class="
                    recommendTagList__btn recommendTagList__btn--new
                    btn btn-outline-companyColor
                  "
                >
                  <i class="jobIcon--sm bi bi-plus-lg me-1"></i>新增興趣推薦條件
                </button>
              </div>
            </div>
            <ul class="row" v-if="sortHotJobs.length > 0">
              <template v-for="(jobItem, index) in sortHotJobs" :key="jobItem.id">
                <li class="col-lg-6 col-12" v-if="index < recommendCardList">
                  <div :ref="`list__item--${jobItem.id}`" class="list__item">
                    <button
                      class="collectBtn btn btn-outline-gray-line position-absolute"
                      :class="{ collected: jobItem.jobCollectCheck }"
                      type="button"
                      @click.stop="collectJob(jobItem)"
                    >
                      <i class="jobIcon bi bi-bookmark-fill"></i>
                    </button>
                    <div class="list__item__tagBox mb-3">
                      <button type="button" class="jobTag btn me-2">100%</button>
                      <button type="button" class="jobTag btn" @click="searchByJobCategory">
                        {{ jobItem.category }}
                      </button>
                    </div>
                    <div class="d-flex w-100 flex-md-row flex-column">
                      <div class="list__item__imgBox">
                        <img
                          class="jobImage"
                          :src="jobItem.imageUrl"
                          :alt="`${jobItem.title}職位圖片`"
                        />
                        <div class="img-cover d-md-none d-block"></div>
                        <div class="list__item__logoImgBox">
                          <img
                            class="logoImg"
                            :src="jobItem.options.company.companyLogoUrl"
                            :alt="`${jobItem.options.company.companyName}logo`"
                          />
                        </div>
                      </div>
                      <div
                        class="
                          list__item__txtBox
                          mb-0
                          flex-grow-1
                          d-flex
                          flex-column
                          justify-content-between
                        "
                      >
                        <div class="mb-3 d-flex flex-column align-items-start">
                          <router-link
                            class="list__item__title mb-3 me-7"
                            :to="`/products-list/product/${jobItem.id}`"
                            >{{ jobItem.title }}</router-link
                          >
                          <router-link
                            class="page__link subTxt mb-2 me-7"
                            :to="`/products-list/company/${jobItem.options.company.companyLink}`"
                            >{{ jobItem.options.company.companyName }}</router-link
                          >
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                          <p class="text-dark" v-if="!jobItem.options.job.salaryInterView">
                            {{ jobItem.price }} / 月薪
                          </p>
                          <p class="text-dark" v-if="jobItem.options.job.salaryInterView">
                            薪資面議
                          </p>
                          <p class="subTxt text-secondary">
                            {{ $filters.date(jobItem.options.job.create) }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </template>
            </ul>
            <div class="d-flex justify-content-center mt-3">
              <button
                type="button"
                class="btn btn-gray-light"
                @click="showMore('recommendCardList')"
                v-if="recommendCardList < 12"
              >
                顯示更多
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="section--py">
          <div class="titleBox--tag justify-content-center">
            <h3 class="titleBox__title">如何使用寫郵件sendCV功能？</h3>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="card--howTo card--howTo--email">
                <img
                  src="@/assets/images/howto/write-email-send-cv-1.jpg"
                  alt="寫郵件SendCV說明圖"
                />
                <div class="card__txtBox">
                  <h5>路過看到好工作</h5>
                  <p>好想去好公司，不知道有沒有職缺？</p>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card--howTo card--howTo--email">
                <img
                  src="@/assets/images/howto/write-email-send-cv-2.jpg"
                  alt="寫郵件SendCV說明圖"
                />
                <div class="card__txtBox">
                  <h5>上傳 sendCV</h5>
                  <p>使用sendCV 統整好自己的履歷與經歷! 找到心儀公司的信箱！</p>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card--howTo card--howTo--email">
                <img
                  src="@/assets/images/howto/write-email-send-cv-3.jpg"
                  alt="寫郵件SendCV說明圖"
                />
                <div class="card__txtBox">
                  <h5>幫你投遞履歷</h5>
                  <p>不論有沒有職位， 我們都幫你投履歷，不放過任何機會！</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white">
        <div class="container">
          <!-- 熱門職位類別 -->
          <div class="hotCategory section--py">
            <div class="titleBox--tag">
              <h3 class="titleBox__title">熱門職位類別</h3>
            </div>
            <ul class="row hotCategoryList">
              <template
                v-for="(categoryItem, index) in sortJobCategory"
                :key="categoryItem.categoryName"
              >
                <li
                  class="list__item putPointer"
                  v-if="index < 7"
                  :class="{
                    'col-lg-6 col-12': index === 0,
                    'col-lg-3 col-6': index > 0,
                    'mb-4': index < 3,
                    'mb-lg-0 mb-4': index >= 3,
                  }"
                  @click="searchByJobCategory(categoryItem.categoryName)"
                >
                  <div class="hotCategoryBox p-md-5 p-3 d-flex">
                    <div class="d-flex flex-column justify-content-between">
                      <p class="mb-3">
                        {{ categoryItem.categoryName }}
                      </p>
                      <p class="subTxt mb-md-6 mb-3">目前共： {{ categoryItem.jobNum }} 職位</p>
                      <p class="seeMoreBtn">
                        查看更多職位 <i class="jobIcon ms-2 bi bi-arrow-right-circle"></i>
                      </p>
                    </div>
                    <img
                      :class="{ 'd-none': index > 0 }"
                      src="https://storage.googleapis.com/vue-course-api.appspot.com/jordanttcdesign/1629385120434.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=c%2BJjXYSstri27f1pLSo%2F7FIdCUatiOT64v9CwBWVyU5QlZao84N9H7BqaSSndTcZQGfiOuqXF9oCQPQhEsGzYCium4PqHPN%2BMU4mAluTcDrpmutUsnwHtg4b%2ByyhltEQsNHmoLAQqjP84IJ%2FNi66BuqmjJ%2BPm8kpng%2B8U60gXQRcW6RVxNqXi4m%2FJBsbAO5wQRaIx1Ndb%2Bh2C2IPAgcwmsPftOqR8%2BKCKAHBwmzQbUXRKe4gmX1kinU1VoqSW0hj1Ae2NRPz1j2PllGf%2B3YZ4dgG62QlSGLSXcU%2BMJSeMfOJSP7M2UxMAdoHHT6Ux6FEK5MfdOEr2G%2F8vrilTG39wg%3D%3D"
                      alt="圖片-根據職位類別搜尋"
                    />
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
  <JobCollect ref="JobCollectModal" @return-job-collection="getJobCollect" />
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import GoodJobCard from '@/components/front/GoodJobCard.vue';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import JobCollect from '@/components/helpers/JobCollect.vue';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default {
  components: {
    GoodJobCard,
    Swiper,
    SwiperSlide,
    UpTopBtn,
    JobCollect,
  },
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      products: [],
      jobsList: [],
      sortWay: 'time',
      dataOk: false,
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
      swiperNum: 1,
      swiperDetail: {
        autoPlay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        slidesPerView: this.swiperNum,
      },
      companySwiperDetail: {
        autoPlay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        pagination: {
          clickable: true,
        },
      },
      jobCollectionList: [],
      recommendCardList: 4,
    };
  },
  watch: {
    fullWidth(newValue) {
      if (newValue > 991.75) {
        this.swiperNum = 3;
      } else if (newValue > 767) {
        this.swiperNum = 2;
      } else {
        this.swiperNum = 1;
      }
    },
  },
  computed: {
    weeklyCompany() {
      const temArray = this.sortCompany.filter((company) => company.title === '台北健身宮');
      const weeklyCompany = { ...temArray[0], jobsList: [] };
      weeklyCompany.jobsList = this.jobsList.filter(
        (job) => job.options.company.companyName === '台北健身宮',
      );
      return weeklyCompany;
    },
    sortCompany() {
      const temCompanyArray = [];
      if (this.products.length > 1) {
        this.products.forEach((item) => {
          if (item.description === '企業') {
            temCompanyArray.push(item);
          }
        });
      }
      return temCompanyArray;
    },
    sortHotJobs() {
      const temHotArray = [];
      if (this.jobsList.length > 0) {
        const temGoodJob = this.jobsList.filter((item) => item.options.job.promote === 1);
        const arr = new Set([]);
        for (let index = 0; arr.size < 6; index += 1) {
          const num = Math.floor(Math.random() * temGoodJob.length);
          arr.add(num);
        }
        arr.forEach((i) => {
          temHotArray.push(temGoodJob[i]);
        });
      }
      return temHotArray;
    },
    sortNewJobs() {
      const temNewArray = [];
      if (this.jobsList.length > 0) {
        for (let index = 0; index < 6; index += 1) {
          temNewArray.push(this.jobsList[index]);
        }
      }
      return temNewArray;
    },
    sortJobCategory() {
      const categoryArray = [];
      this.formData.jobCategory.forEach((item) => {
        const obj = {
          categoryName: item,
          jobNum: 0,
        };
        categoryArray.push(obj);
      });
      if (categoryArray.length > 0) {
        this.jobsList.forEach((job) => {
          categoryArray.forEach((item, index) => {
            if (job.category === item.categoryName) {
              categoryArray[index].jobNum += 1;
            }
          });
        });
      }
      categoryArray.sort((a, b) => b.jobNum - a.jobNum);
      return categoryArray;
    },
  },
  methods: {
    goToPage(pageUrl) {
      this.$router.push(pageUrl);
    },
    // 職位收藏功能
    getJobCollect(collection) {
      this.jobCollectionList = JSON.parse(JSON.stringify(collection));
      this.checkJobCollect();
    },
    // 判斷職位是否收藏
    checkJobCollect() {
      if (this.jobsList.length > 0 && this.jobCollectionList.length > 0) {
        this.jobsList.forEach((temItem, index) => {
          let check = false;
          this.jobCollectionList.forEach((folder) => {
            folder.jobs.forEach((item) => {
              if (item.id === temItem.id) {
                check = true;
              }
            });
          });
          this.jobsList[index].jobCollectCheck = check;
        });
      }
    },
    collectJob(item) {
      emitter.emit('open-collect-modal', item);
    },
    // 搜尋方法
    // 直接搜尋
    toSearchJob() {
      const keyword = this.filterData.keyword || '不限';
      const { city } = this.filterData;
      const { jobCategory } = this.filterData;
      this.$router.push(`/search/?keyword=${keyword}&city=${city}&jobCategory=${jobCategory}`);
    },
    // 依據職位類別搜尋
    searchByJobCategory(jobCategory) {
      const keyword = '不限';
      const city = '不限';
      this.$router.push(`/search/?keyword=${keyword}&city=${city}&jobCategory=${jobCategory}`);
    },
    // 更改職位排序
    changeJobSort() {
      if (this.sortWay === 'time') {
        this.jobsList.sort((a, b) => b.options.job.create - a.options.job.create);
      } else if (this.sortWay === 'money') {
        this.jobsList.sort((a, b) => b.price - a.price);
      }
    },
    // 找出職位
    classifyJob() {
      this.products.forEach((item) => {
        if (item.description === '職位') {
          const Obj = item;
          this.sortCompany.forEach((temCompany) => {
            if (Obj.options.company.companyName === temCompany.title) {
              Obj.options.company.companyLink = temCompany.id;
            }
          });
          this.jobsList.push(Obj);
        }
      });
      console.log(this.jobsList);
      this.changeJobSort();
      this.checkJobCollect();
      this.dataOk = true;
    },
    // 抓全部資料
    getOgData() {
      this.cleanList();
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.classifyJob();
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 清除陣列
    cleanList() {
      this.jobsList = [];
    },
  },
  created() {
    this.formData = webData;
    this.getOgData();
    emitter.emit('spinner-open-bg', 1500);
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
