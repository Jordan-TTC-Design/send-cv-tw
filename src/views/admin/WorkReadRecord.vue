<template>
  <div class="adminPage--py">
    <div ref="adminSubHeader" class="admin__subHeader mb-6 box--shadow">
      <div class="container">
        <div class="admin__subNav">
          <li class="d-flex align-items-center d-md-flex d-none">
            <h2 class="admin__subNav__title">工作</h2>
          </li>
          <li
            class="admin__subNav__item"
            @click="goToPageLink('work-application')"
            :class="{ active: subTopNav === '行事曆' }"
          >
            <p class="admin__subNav__txt me-1">行事曆</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="goToPageLink('work-application')"
            :class="{ active: subTopNav === '職位申請' }"
          >
            <p class="admin__subNav__txt me-1">職位申請</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="goToPageLink('work-company-read')"
            :class="{ active: subTopNav === '企業來訪' }"
          >
            <p class="admin__subNav__txt me-1">企業來訪</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="goToPageLink('work-collection')"
            :class="{ active: subTopNav === '收藏' }"
          >
            <p class="admin__subNav__txt me-1">收藏</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="goToPageLink('work-read-record')"
            :class="{ active: subTopNav === '瀏覽紀錄' }"
          >
            <p class="admin__subNav__txt me-1">瀏覽紀錄</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="goToPageLink('work-application-review')"
            :class="{ active: subTopNav === '審核紀錄' }"
          >
            <p class="admin__subNav__txt me-1">審核紀錄</p>
          </li>
        </div>
      </div>
    </div>
    <div ref="jobsListContainer" class="jobsListContainer container">
      <p class="ps-3 mb-6 text-primary" v-if="filterTxt !== ''">
        <span class="text-gray-dark">搜尋條件：</span>{{ filterTxt }}
      </p>
      <div class="row">
        <div class="col-12" v-if="jobsList.length > 0">
          <div class="jobListBox">
            <div
              class="
                d-flex
                justify-content-between
                align-items-center
                ps-3
                mb-3
                bg-light
                rounded
                p-2
              "
            >
              <p class="text-secondary fw-normal text-nowrap">
                目前瀏覽過共 {{ jobsList.length }} 個職位
              </p>
            </div>
            <ul ref="jobList" class="readRecordList">
              <template v-for="jobItem in nowPageJobs" :key="jobItem.id">
                <li
                  v-if="nowPageJobs.length > 0"
                  @click="selectJob"
                  :data-id="jobItem.id"
                  :ref="`list__item${jobItem.id}`"
                  class="
                    list__item
                    d-flex
                    box--shadow
                    flex-md-row flex-column
                    align-items-center
                    justify-content-between
                    card--application
                  "
                >
                  <div class="list__item__jobContent">
                    <div class="list__item__logoImgBox me-3">
                      <img
                        class="logoImg"
                        :src="jobItem.options.company.companyLogoUrl"
                        :alt="`${jobItem.options.company.companyName}logo`"
                      />
                    </div>
                    <div class="list__item__txtBox d-flex flex-column justify-content-between">
                      <div class="d-flex mb-2">
                        <router-link
                          class="list__item__title me-2"
                          :to="`/products-list/product/${jobItem.id}`"
                          >{{ jobItem.title }}</router-link
                        >
                        <p class="jobTag bg-primary me-2">
                          <i class="jobIcon-sm bi bi-star-fill"></i>
                        </p>
                        <p class="jobTag">匹配度100%</p>
                      </div>
                      <router-link
                        class="page__link subTxt mb-2"
                        :to="`/products-list/company/${jobItem.options.company.companyLink}`"
                        >{{ jobItem.options.company.companyName }}</router-link
                      >
                      <p class="subTxt text-secondary">
                        申請時間：{{ $filters.date(jobItem.options.job.create) }}
                      </p>
                    </div>
                  </div>
                  <div class="list__item__salaryBox">
                    <p v-if="!jobItem.options.job.salaryInterView">{{ jobItem.price }} / 月薪</p>
                    <p v-if="jobItem.options.job.salaryInterView">薪資面議</p>
                  </div>
                  <div class="list__item__btnBox">
                    <button type="button" class="btn btn-gray-light me-2">相似職位</button>
                    <button type="button" class="btn btn-primary me-2">申請職位</button>
                    <button type="button" class="btn me-2">
                      <i class="jobIcon bi bi-bookmark-fill"></i>
                    </button>
                    <button type="button" class="btn me-2">
                      <i class="jobIcon bi bi-three-dots"></i>
                    </button>
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
        <div class="col-12 d-flex justify-content-center" v-if="jobsList.length === 0">
          <img
            class="img--searchNoJob"
            src="https://storage.googleapis.com/vue-course-api.appspot.com/jordanttcdesign/1629385211015.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=F0Wk9lSjiNEPR9Oc2yUH%2FsytXi9oZAK9mQfxq5pEsNm%2FkYws1ORyXtgI3GxhfKA144%2F70tZX5321YS22Ta%2B9sdNPTtUUUIdWY1fQgSf95yMxikEYSVSpb%2FtKGlZvlcJy6kFokL6Ktv3CYncDq%2B1AVDPtZf7avLr8bdcDYoxsDgeSNoKESY%2BZIQDcLI6c3t%2BfROBH3NZkBTBrTa98P%2FeCywVqtNkfMfZpoewZyqptrn0rptafi6iQurKFCpTbOTvUAdiM0dnsHiEyzVwigDrN%2FNtaxR%2BwdTPDnAE2fS6QMx%2B2kjNa32GEjbkQ7fCcbYTPiQ0%2FQMDTpX8lfSwhG5knbA%3D%3D"
            alt="找不到職位"
          />
        </div>
      </div>
    </div>
    <PagenationModal
      :jobs-list="jobsList"
      @change-page="changePage"
    />
  </div>
  <div class="sideBtnBox">
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

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default {
  components: {
    PagenationModal,
    UpTopBtn,
    JobCollect,
  },
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      subTopNav: '瀏覽紀錄',
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
      jobCollectionList: [],
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
    // 打開篩選彈跳視窗
    openSideFilterBox() {
      if (this.filterBoxState) {
        this.filterBoxState = false;
      } else if (!this.filterBoxState) {
        this.filterBoxState = true;
      }
    },
    // 調整列表排序方式
    changeJobSort() {
      if (this.sortWay === 'time') {
        this.jobsList.sort((a, b) => b.options.job.create - a.options.job.create);
      } else if (this.sortWay === 'money') {
        this.jobsList.sort((a, b) => b.price - a.price);
      }
    },
    // 切換頁面
    changePage(nowPageNum) {
      this.pageNumber = nowPageNum;
      this.getNowPageJobs();
    },
    // 篩選查詢
    filter(value) {
      this.filterData = value;
      emitter.emit('spinner-open');
      this.classifyJob();
      const temArray = this.searchFilterMethods.filter(this.jobsList, this.filterData);
      this.jobsList = temArray;
      this.changePage(1);
      emitter.emit('get-filter-txt');
      emitter.emit('filterBtn-close');
      emitter.emit('spinner-close');
    },
    getFilterTxt(txt) {
      this.filterTxt = txt;
    },
    // 清除篩選條件
    cleanFilter() {
      this.searchFilterMethods.getFilterData(this.filterData);
      this.searchFilterMethods.cleanFilter();
      this.filterData = this.searchFilterMethods.returnFilter();
    },
    // 點擊卡片：pc->選擇右側職位，pad->跳轉至該職位頁面
    selectJob(id) {
      if (this.fullWidth > 991) {
        if (this.searchByJobCategoryState === false) {
          this.nowPageJobs.forEach((item) => {
            if (item.id === id) {
              this.jobItem = item;
              // this.$refs[`jobList__item--${item.id}`].openSelectEffect();
            } else if (item.id !== id) {
              // this.$refs[`jobList__item--${item.id}`].closeSelectEffect();
            }
          });
          // this.$refs.jobSelectBox.toTop();
        }
      } else {
        this.$router.push(`/products-list/product/${id}`);
      }
    },
    selectJobFrist(id) {
      if (this.fullWidth > 991) {
        this.nowPageJobs.forEach((item) => {
          if (item.id === id) {
            this.jobItem = item;
            // this.$refs[`jobList__item--${item.id}`].openSelectEffect();
          } else if (item.id !== id) {
            // this.$refs[`jobList__item--${item.id}`].closeSelectEffect();
          }
        });
        // this.$refs.jobSelectBox.toTop();
      }
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
      setTimeout(() => {
        if (this.nowPageJobs.length > 0) {
          this.selectJobFrist(this.nowPageJobs[0].id);
        }
      }, 10);
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
      this.changeJobSort();
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
