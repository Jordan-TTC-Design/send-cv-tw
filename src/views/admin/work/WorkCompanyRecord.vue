<template>
  <div class="adminPage--py">
    <NavAdminNav :nowPage="nowPage" />
    <div class="container-xl position-relative">
      <div class="row" v-if="dataReady === true">
        <div class="col-lg-3">
          <form
            @submit="searchTalent"
            class="sideContentBox rwdSideModal"
            :class="{ active: filterOpen }"
          >
            <div class="sideContentBox__header">
              <p class="subTxt">篩選</p>
              <div class="sideContentBox__header__btnBox">
                <button type="button" class="btn text-dark">清除條件</button>
              </div>
            </div>
            <div class="sideContentBox__body">
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="searchKeyword" class="labelBox__label form-label">搜尋關鍵字</label>
                </div>
                <input
                  class="form-control"
                  type="text"
                  id="searchKeyword"
                  placeholder="請輸入"
                  v-model="filterData.keyword"
                />
              </div>
              <div class="form__input mb-0">
                <div class="form__labelBox">
                  <label for="filterMethod" class="labelBox__label form-label">排列方法</label>
                </div>
                <select
                  class="form-select"
                  aria-label="排列方法"
                  id="filterMethod"
                  v-model="filterData.filterMethod"
                >
                  <template v-for="item in filterData.filterMethod" :key="item.title">
                    <option :value="item.title" :selected="item.selected">
                      {{ item.title }}
                    </option>
                  </template>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="col-lg-9">
          <p class="ps-3 mb-6 text-primary" v-if="filterTxt !== ''">
            <span class="text-gray-dark">搜尋條件：</span>{{ filterTxt }}
          </p>
          <div
            class="d-flex justify-content-between align-items-center ps-3 mb-3 bg-light rounded p-2"
          >
            <p class="text-secondary fw-normal text-nowrap">
              目前已有 {{ jobsList.length }} 企業來訪
            </p>
          </div>
          <ul class="companyCardList" v-if="jobsList.length > 0">
            <template v-for="jobItem in nowPageJobs" :key="jobItem.id">
              <li
                v-if="nowPageJobs.length > 0"
                :data-id="jobItem.id"
                :ref="`list__item${jobItem.id}`"
                class="companyCard mb-4"
              >
                <div class="companyCard__header">
                  <div class="companyCard__logoImgBox me-3">
                    <img
                      class="logoImg"
                      :src="jobItem.options.company.companyLogoUrl"
                      :alt="`${jobItem.options.company.companyName}logo`"
                    />
                  </div>
                  <div>
                    <router-link
                      class="text-dark mb-2 d-block"
                      :to="`/products-list/company/${jobItem.options.company.companyLink}`"
                      >{{ jobItem.options.company.companyName }}</router-link
                    >
                    <p>
                      <i class="jobIcon--sm me-1 bi bi-building"></i>
                      {{ jobItem.options.company.industryCategory }}
                    </p>
                  </div>
                </div>
                <div class="companyCard__body d-flex justify-content-between">
                  <p>
                    <i class="jobIcon--sm me-1 bi bi-people"></i>
                    16個工作機會
                  </p>
                  <p class="subTxt text-secondary">
                    {{ $filters.date(jobItem.options.job.create) }}
                  </p>
                </div>
                <div class="companyCard__btnBox">
                  <button class="collectBtn btn btn-outline-gray-line" type="button">
                    <i class="jobIcon bi bi-bookmark-fill"></i>
                  </button>
                </div>
              </li>
            </template>
          </ul>
          <div class="d-flex justify-content-center" v-if="jobsList.length === 0">
            <img
              class="img--searchNoJob"
              src="https://storage.googleapis.com/vue-course-api.appspot.com/jordanttcdesign/1629385211015.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=F0Wk9lSjiNEPR9Oc2yUH%2FsytXi9oZAK9mQfxq5pEsNm%2FkYws1ORyXtgI3GxhfKA144%2F70tZX5321YS22Ta%2B9sdNPTtUUUIdWY1fQgSf95yMxikEYSVSpb%2FtKGlZvlcJy6kFokL6Ktv3CYncDq%2B1AVDPtZf7avLr8bdcDYoxsDgeSNoKESY%2BZIQDcLI6c3t%2BfROBH3NZkBTBrTa98P%2FeCywVqtNkfMfZpoewZyqptrn0rptafi6iQurKFCpTbOTvUAdiM0dnsHiEyzVwigDrN%2FNtaxR%2BwdTPDnAE2fS6QMx%2B2kjNa32GEjbkQ7fCcbYTPiQ0%2FQMDTpX8lfSwhG5knbA%3D%3D"
              alt="找不到職位"
            />
          </div>
          <PagenationModal :jobs-list="jobsList" @change-page="changePage" />
        </div>
      </div>
    </div>
  </div>
  <div class="sideBtnBox d-xl-none">
    <button type="button" class="sideBtn btn btn-light mb-2" @click="filterOpen = !filterOpen">
      <i class="jobIcon bi bi-funnel-fill"></i>
    </button>
    <UpTopBtn />
  </div>
  <JobCollect ref="JobCollectModal" @return-job-collection="getJobCollect" />
</template>

<script>
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import emitter from '@/methods/emitter';
import searchFilter from '@/methods/searchFilter';
import webData from '@/methods/webData';
import PagenationModal from '@/components/helpers/Pagenation.vue';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import JobCollect from '@/components/helpers/JobCollect.vue';
import NavAdminNav from '@/components/admin/NavAdminNav.vue';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default {
  components: {
    PagenationModal,
    UpTopBtn,
    JobCollect,
    NavAdminNav,
  },
  data() {
    return {
      dataReady: false,
      nowPage: '企業來訪',
      products: [],
      jobsList: [],
      nowPageJobs: [],
      jobItem: {
        options: {
          company: {
            companyImagesUrl: [],
          },
          job: {},
        },
      },
      searchFilterMethods: {},
      searchByJobCategoryState: false,
      pageNumber: 1,
      sortWay: 'time',
      formData: {},
      filterData: {
        keyword: '',
        filterMethod: [
          {
            title: '依據時間排序',
            selected: true,
          },
          {
            title: '依據匹配度排序',
            selected: false,
          },
        ],
      },
      filterTxt: '',
      jobCollectionList: [],
      // rwd
      filterOpen: false,
    };
  },
  computed: {
    // 所有企業
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
  },
  methods: {
    getJobCollect(collection) {
      this.jobCollectionList = JSON.parse(JSON.stringify(collection));
      this.checkJobCollect();
    },
    checkJobCollect() {
      if (this.nowPageJobs.length > 0 && this.jobCollectionList.length > 0) {
        this.nowPageJobs.forEach((temItem, index) => {
          let check = false;
          this.jobCollectionList.forEach((folder) => {
            folder.jobs.forEach((item) => {
              if (item.id === temItem.id) {
                check = true;
              }
            });
          });
          this.nowPageJobs[index].jobCollectCheck = check;
        });
      }
    },
    // 切換頁面
    changePage(nowPageNum) {
      this.pageNumber = nowPageNum;
      this.getNowPageJobs();
    },
    // 本頁職位
    getNowPageJobs() {
      const temPageJobs = [];
      if (this.jobsList.length !== []) {
        const pageFrist = this.pageNumber * 10 - 10;
        this.jobsList.forEach((item, index) => {
          if (pageFrist <= index && index < this.pageNumber * 10) {
            temPageJobs.push(item);
          }
        });
        document.documentElement.scrollTop = 0;
        [this.jobItem] = temPageJobs;
      }
      this.nowPageJobs = JSON.parse(JSON.stringify(temPageJobs));
      this.checkJobCollect();
      this.dataReady = true;
    },
    // 篩選出所有職位
    classifyJob() {
      this.jobsList = [];
      this.changePage(1);
      this.products.forEach((item) => {
        if (item.description === '職位') {
          const Obj = JSON.parse(JSON.stringify(item)); // 深拷貝
          this.sortCompany.forEach((temCompany) => {
            if (Obj.options.company.companyName === temCompany.title) {
              Obj.options.company.companyLink = temCompany.id;
            }
          });
          this.jobsList.push(Obj);
        }
      });
      this.getNowPageJobs();
    },
    // 抓全部資料
    getOgData() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          emitter.emit('spinner-close');
          this.classifyJob();
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
  },
  created() {
    this.getOgData();
    this.formData = webData;
    this.searchFilterMethods = searchFilter;
    emitter.emit('spinner-open-bg', 1200);
  },
};
</script>

<style lang="scss"></style>
