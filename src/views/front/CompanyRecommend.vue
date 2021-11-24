<template>
  <div class="page--py">
    <div class="container-fuild">
      <div class="container">
        <div class="sction--weeklyCompany section--pb">
          <div class="titleBox--tag">
            <h3 class="titleBox__title">本週推薦企業</h3>
            <p class="titleBox__tag">推薦</p>
          </div>
          <div class="weeklyCompany" v-if="dataOk">
            <div class="row d-flex flex-lg-row flex-column">
              <div class="col-lg-3 col-12 mb-lg-0 mb-md-6 mb-4">
                <div class="weeklyCompany__infoBox">
                  <div class="logoImgBox mb-4">
                    <img
                      class="logoImg"
                      :src="weeklyCompany.imageUrl"
                      :alt="`${weeklyCompany.title}企業logo`"
                    />
                  </div>
                  <div class="txtBox d-flex flex-column justify-content-between">
                    <router-link
                      class="page__title mb-4 putPointer"
                      :to="`/products-list/company/${weeklyCompany.id}`"
                      >{{ weeklyCompany.title }}</router-link
                    >
                    <p class="mb-lg-4 mb-2">
                      <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                      >{{ weeklyCompany.options.companyAddressCity }}，{{
                        weeklyCompany.options.companyAddressDetail
                      }}
                    </p>
                    <p class="mb-lg-6 mb-2">
                      <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                      {{ weeklyCompany.category }}
                    </p>
                    <router-link
                      class="btn--goToCompany btn btn-outline-gray-line"
                      :to="`/products-list/company/${weeklyCompany.id}`"
                      >查看完整企業資料</router-link
                    >
                  </div>
                </div>
              </div>
              <div class="col-lg-9 col-12">
                <h5 class="page__title mb-3">公司簡介</h5>
                <div class="weeklyCompany__companyContentBox">
                  <div class="companyContent mb-3" v-html="weeklyCompany.content"></div>
                  <div class="imgBox">
                    <swiper
                      :slides-per-view="1"
                      :space-between="20"
                      :autoplay="companySwiperDetail.autoPlay"
                      :pagination="companySwiperDetail.pagination"
                      :loop="true"
                      v-if="dataOk"
                    >
                      <swiper-slide
                        v-for="companyImage in weeklyCompany.imagesUrl"
                        :key="companyImage"
                      >
                        <img class="imgBox__img" :src="companyImage" alt="本週推薦企業logo" />
                      </swiper-slide>
                    </swiper>
                  </div>
                </div>
                <h5 class="page__title mb-3">現有職位</h5>
                <div class="weeklyCompany__jobList">
                  <template
                    v-for="(companyJob, index) in weeklyCompany.jobsList"
                    :key="companyJob.id"
                  >
                    <router-link
                      class="list__item"
                      v-if="index < 4"
                      :to="`/products-list/product/${companyJob.id}`"
                    >
                      <p class="list__item__title mb-3">{{ companyJob.title }}</p>
                      <div class="d-flex justify-content-between">
                        <p class="subTxt" v-if="!companyJob.options.job.salaryInterView">
                          {{ companyJob.price }} / 月薪
                        </p>
                        <p class="subTxt" v-if="companyJob.options.job.salaryInterView">薪資面議</p>
                        <p class="subTxt">{{ $filters.date(companyJob.options.job.create) }}</p>
                      </div>
                    </router-link>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section--aroundCompany section--pb" v-if="sortCompany.length > 0">
          <div class="titleBox--tag">
            <h3 class="titleBox__title">附近企業推薦</h3>
            <p class="titleBox__tag">推薦</p>
          </div>
          <div class="row">
            <template v-for="(companyItem, index) in sortCompany" :key="companyItem.id">
              <div class="col-3" v-if="index < 4">
                <router-link
                  :to="`/products-list/company/${companyItem.id}`"
                  class="companyCard card mb-3"
                >
                  <div class="companyCard__imgBox">
                    <img
                      class="companyCard__img card-img-top"
                      :src="companyItem.imagesUrl[0]"
                      :alt="`${companyItem.title}企業圖片`"
                    />
                  </div>
                  <div class="card-body">
                    <div class="companyCard__jobInfoBox">
                      <div class="companyLogoBox">
                        <img
                          class="companyCard__logo me-2"
                          :src="companyItem.imageUrl"
                          :alt="`${companyItem.title}公司logo`"
                        />
                      </div>
                      <router-link
                        class="card__title mb-2 d-block"
                        :to="`/products-list/company/${companyItem.id}`"
                        >{{ companyItem.title }}</router-link
                      >
                      <div class="d-flex justify-content-between">
                        <p class="subTxt">
                          <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                          {{ companyItem.category }}
                        </p>
                        <p class="subTxt">500公尺</p>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </template>
          </div>
        </div>
        <div class="section--newCompany section--pb" v-if="sortCompany.length > 0">
          <div class="titleBox--tag">
            <h3 class="titleBox__title">最新企業徵才</h3>
            <p class="titleBox__tag">推薦</p>
          </div>
          <div class="row">
            <template v-for="(companyItem, index) in sortCompany" :key="companyItem.id">
              <div class="col-3" v-if="index < 4">
                <router-link
                  :to="`/products-list/company/${companyItem.id}`"
                  class="companyCard card mb-3"
                >
                  <div class="companyCard__imgBox">
                    <img
                      class="companyCard__img card-img-top"
                      :src="companyItem.imagesUrl[0]"
                      :alt="`${companyItem.title}企業圖片`"
                    />
                  </div>
                  <div class="card-body">
                    <div class="companyCard__jobInfoBox">
                      <div class="companyLogoBox">
                        <img
                          class="companyCard__logo me-2"
                          :src="companyItem.imageUrl"
                          :alt="`${companyItem.title}公司logo`"
                        />
                      </div>
                      <router-link
                        class="card__title mb-2 d-block"
                        :to="`/products-list/company/${companyItem.id}`"
                        >{{ companyItem.title }}</router-link
                      >
                      <div class="d-flex justify-content-between">
                        <p class="subTxt">
                          <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                          5 個工作機會
                        </p>
                        <p class="subTxt">1分鐘前</p>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="bg-white">
        <div class="container">
          <div class="recommendCardList section--py">
            <div class="titleBox--tag">
              <h3 class="titleBox__title">興趣行業推薦企業</h3>
              <div class="recommendTagList">
                <button
                  type="button"
                  class="recommendTagList__btn btn btn-outline-gray-line active"
                >
                  根據個人興趣
                </button>
                <template v-for="(item, index) in user.recommedCompanyList" :key="index">
                  <button type="button" class="recommendTagList__btn btn btn-outline-gray-line">
                    {{ item.title }}
                    <i
                      class="ms-1 jobIcon-sm bi bi-pencil-square"
                      @click="openRecommedModal('編輯興趣行業推薦條件', index)"
                    ></i>
                  </button>
                </template>
                <button
                  type="button"
                  class="
                    recommendTagList__btn recommendTagList__btn--new
                    btn btn-outline-companyColor
                  "
                  @click="openRecommedModal('新增興趣行業推薦條件')"
                >
                  <i class="jobIcon--sm bi bi-plus-lg me-1"></i>新增
                </button>
              </div>
            </div>
            <ul class="row" v-if="sortCompany.length > 0">
              <template v-for="(companyItem, index) in sortCompany" :key="companyItem.id">
                <li class="col-md-6 col-12" v-if="index < recommendCardList">
                  <div :ref="`list__item--${companyItem.id}`" class="list__item">
                    <div class="d-flex w-100 flex-md-row flex-column">
                      <div class="list__item__imgBox">
                        <img
                          class="jobImage"
                          :src="companyItem.imagesUrl[0]"
                          :alt="`${companyItem.title}職位圖片`"
                        />
                        <div class="img-cover d-md-none d-block"></div>
                        <div class="list__item__logoImgBox">
                          <img
                            class="logoImg"
                            :src="companyItem.imageUrl"
                            :alt="`${companyItem.title}logo`"
                          />
                        </div>
                      </div>
                      <div
                        class="
                          list__item__txtBox
                          flex-grow-1
                          d-flex
                          flex-column
                          justify-content-between
                        "
                      >
                        <div class="mb-3 d-flex flex-column align-items-start">
                          <router-link
                            class="list__item__title me-7"
                            :to="`/products-list/product/${companyItem.id}`"
                            >{{ companyItem.title }}</router-link
                          >
                        </div>
                        <div>
                          <p class="subTxt">
                            <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                            {{ companyItem.category }}
                          </p>
                          <p class="subTxt">
                            <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                            >{{ companyItem.options.companyAddressCity }}
                          </p>
                          <p class="subTxt">
                            <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>
                            目前 5 個工作機會
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="list__item__jobBox w-100 putPointer">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <p class="list__item__jobBox__title">UI設計師</p>
                        <p class="jobTag">100%</p>
                      </div>
                      <div class="d-flex justify-content-between">
                        <p>48000 / 月薪</p>
                        <p class="subTxt text-secondary">2020/01/01</p>
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
      <!-- 全部職位 -->
      <div class="container">
        <div class="section--py">
          <div class="titleBox--tag">
            <h3 class="titleBox__title">全部企業</h3>
          </div>
          <!-- 篩選條件 -->
          <div class="filterBox bg-white mb-6 rounded p-6">
            <div class="filterBox__section">
              <p class="filterBox__section__tag--title">篩選條件</p>
              <div class="row flex-grow-1">
                <div class="col-lg-3 col-6 mb-lg-0 mb-3">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="searchFilterForm-keyword" class="labelBox__label form-label"
                        >關鍵字</label
                      >
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      id="searchFilterForm-keyword"
                      placeholder="企業關鍵字"
                      aria-describedby="關鍵字"
                      v-model="allCompanyFilter.keyword"
                    />
                  </div>
                </div>
                <div class="col-lg-2 col-md-6 col-12">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="searchFilterForm-industry" class="labelBox__label form-label"
                        >產業類別</label
                      >
                    </div>
                    <select
                      class="form-select"
                      aria-label="產業類別"
                      id="searchFilterForm-industry"
                      v-model="allCompanyFilter.industryCategory"
                    >
                      <option disabled>請選擇產業類別</option>
                      <option selected value="不限">不限</option>
                      <option
                        v-for="(item, index) in formData.industryCategory"
                        :value="item"
                        :key="`產業類別${index}`"
                      >
                        {{ item }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-2 col-6">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="searchFilterForm-city" class="labelBox__label form-label"
                        >地區</label
                      >
                    </div>
                    <select
                      class="form-select"
                      aria-label="地區"
                      id="searchFilterForm-city"
                      v-model="allCompanyFilter.city"
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
                </div>
                <div class="col-lg-2 col-6">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="sendFormInfoCostToken" class="labelBox__label form-label"
                        >是否顯示適合職位</label
                      >
                    </div>
                    <div
                      class="
                        inputItem__switch
                        form-check form-switch
                        border border-gray-line
                        rounded
                      "
                    >
                      <input
                        id="sendFormInfoCostToken"
                        type="checkbox"
                        class="form-check-input ms-0 me-2 mt-0"
                        data-action="showCompanyJob"
                        :checked="allCompanyFilter.showJob ? true : false"
                        @change="showCompanyJob"
                      />
                      <label
                        class="form-check-label"
                        for="sendFormInfoCostToken"
                        :class="{ 'text-primary-dark': allCompanyFilter.showJob === true }"
                      >
                        {{ allCompanyFilter.showJob ? `顯示職位` : `隱藏職位` }}
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-12">
                  <div class="d-flex align-items-end h-100">
                    <button
                      type="button"
                      class="btn btn-primary btn--w--md me-2 flex-grow-1"
                      @click="filterJobs"
                    >
                      篩選企業
                    </button>
                    <button type="button" class="btn btn-gray-light me-2" @click="cleanFilter">
                      清除全部
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="sortCompany.length > 0">
            <template v-for="companyItem in sortCompany" :key="companyItem.id">
              <div class="col-3 mb-5">
                <div class="allCompanyCard card" :class="{ showJob: allCompanyFilter.showJob }">
                  <img
                    :src="companyItem.imagesUrl[0]"
                    class="card-img-top"
                    :alt="`${companyItem.title}職位圖片`"
                  />
                  <div class="allCompanyCard__companyInfoBox">
                    <div class="d-flex align-items-center mb-2">
                      <div class="allCompanyCard__companyInfoBox__logoBox me-2">
                        <img
                          class="logoBox__logo"
                          :src="companyItem.imageUrl"
                          :alt="`${companyItem.title}logo`"
                        />
                      </div>

                      <router-link
                        class="card__title"
                        :to="`/products-list/company/${companyItem.id}`"
                        >{{ companyItem.title }}</router-link
                      >
                    </div>
                    <p class="subTxt mb-2">
                      <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                      {{ companyItem.category }}
                    </p>
                    <p class="subTxt mb-2">
                      <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                      >{{ companyItem.options.companyAddressCity }}
                    </p>
                    <p class="subTxt">
                      <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>
                      目前 5 個工作機會
                    </p>
                  </div>
                  <div class="allCompanyCard__Job">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <p class="allCompanyCard__Job__title">UI設計師</p>
                      <p class="jobTag">100%</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p>48000 / 月薪</p>
                      <p>2020/01/01</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
  <JobCollect ref="JobCollectModal" @return-job-collection="getJobCollect" />
  <RecommedModal
    @return-recommed-data="saveRecommedData"
    @delete-recommed-data="deleteRecommedData"
  />
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import JobCollect from '@/components/helpers/JobCollect.vue';
import RecommedModal from '@/components/front/RecommedModal.vue';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import database from '@/methods/firebaseinit';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default {
  components: {
    Swiper,
    SwiperSlide,
    UpTopBtn,
    JobCollect,
    RecommedModal,
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
      allCompanyFilter: {
        keyword: '',
        city: '不限',
        industryCategory: '不限',
        showJob: true,
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
      user: {},
      dataReady: false,
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
      console.log(temCompanyArray);
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
    // 取得資料
    getFbData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = data;
        this.dataReady = true;
      });
    },
    // 保存資料
    saveUserData() {
      const userRef = database.ref('user');
      userRef.set(this.user);
    },
    openRecommedModal(actionTxt, index) {
      const obj = {
        action: actionTxt,
        data: this.user,
        index,
      };
      emitter.emit('open-recommed-modal', obj);
    },
    saveRecommedData(obj) {
      if (obj.action === '新增興趣行業推薦條件') {
        if (this.user.recommedCompanyList) {
          this.user.recommedCompanyList.push(obj.data);
        } else if (!this.user.recommedCompanyList) {
          this.user.recommedCompanyList = [];
          this.user.recommedCompanyList.push(obj.data);
        }
      } else if (obj.action === '編輯興趣行業推薦條件') {
        this.user.recommedCompanyList.splice(obj.index, 1, obj.data);
      }
      console.log(this.user.recommedCompanyList);
      this.saveUserData();
    },
    deleteRecommedData(index) {
      this.user.recommedCompanyList.splice(index, 1);
      this.saveUserData();
    },
    showMore(dataList) {
      this[dataList] += 4;
    },
    showCompanyJob() {
      if (this.allCompanyFilter.showJob) {
        this.allCompanyFilter.showJob = false;
      } else if (!this.allCompanyFilter.showJob) {
        this.allCompanyFilter.showJob = true;
      }
    },
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
      const keyword = this.allCompanyFilter.keyword || '不限';
      const { city } = this.allCompanyFilter;
      const { jobCategory } = this.allCompanyFilter;
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
    this.getFbData();
    emitter.emit('spinner-open-bg', 1500);
    emitter.emit('get-nav-state', '優質企業');
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
