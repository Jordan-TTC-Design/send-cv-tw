<template>
  <div ref="sideJobBox" class="sideJobBox sideJobBox--sticky box--shadow">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="mb-3">
        <p class="jobTag bg-primary me-2"><i class="jobIcon-sm bi bi-star-fill"></i></p>
        <button type="button" class="jobTag btn">100%匹配度</button>
      </div>
      <div class="d-flex">
        <button
          class="btn btn-outline-gray-line btn-bg text-dark d-flex align-items-center me-2"
          type="button"
        >
          聯絡
        </button>
        <button
          class="btn btn-outline-gray-line btn-bg text-dark d-flex align-items-center me-2"
          type="button"
          :class="{ collected: jobItem.jobCollectCheck }"
          @click="collectJob(jobItem)"
        >
          收藏職位
        </button>
      </div>
    </div>
    <div class="pb-5">
      <div class="d-flex mb-3">
        <div class="sideJobBox__imgBox">
          <img class="jobImage mt-3" :src="jobItem.imageUrl" :alt="`${jobItem.title}職位圖片`" />
          <div class="logoImageBox">
            <img
              class="logoImage"
              :src="jobItem.options.company.companyLogoUrl"
              :alt="`${jobItem.options.company.companyName}logo`"
            />
          </div>
        </div>
        <div class="sideJobBox__txtBox">
          <div>
            <router-link
              class="sideJobBox__title mb-3 d-block"
              type="button"
              :to="`/products-list/product/${jobItem.id}`"
              >{{ jobItem.title }}</router-link
            >
            <router-link
              class="page__txt page__link subTxt mb-4 d-block"
              type="button"
              :to="`/products-list/company/${jobItem.options.company.companyLink}`"
              >{{ jobItem.options.company.companyName }}</router-link
            >
          </div>
          <p class="page__txt me-5 subTxt">
            <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
            >{{ jobItem.options.company.companyAddressCity }}
          </p>
          <p class="page__txt subTxt" v-if="!jobItem.options.job.salaryInterView">
            <span><i class="jobIcon--sm me-1 bi bi-currency-dollar"></i></span>
            {{ jobItem.price }} / 月薪
          </p>
          <p class="page__txt subTxt" v-if="jobItem.options.job.salaryInterView">
            <span><i class="jobIcon--sm me-1 bi bi-currency-dollar"></i></span>
            薪資面議
          </p>
        </div>
      </div>
    </div>
    <ul class="boxSubNav">
      <li
        class="boxSubNav__item boxSubNav--50"
        :class="{ active: boxSubNav === '申請資料' }"
        @click="changeNav('boxSubNav', '申請資料')"
      >
        <p>申請資料</p>
      </li>
      <li
        class="boxSubNav__item boxSubNav--50"
        :class="{ active: boxSubNav === '職位內容' }"
        @click="changeNav('boxSubNav', '職位內容')"
      >
        <p>職位內容</p>
      </li>
    </ul>
    <div v-if="boxSubNav === '申請資料'">
      <ul class="infoList">
        <li class="infoList__item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <p class="infoList__item__title">應徵狀態</p>
              <p class="infoList__item__content">面試邀請</p>
            </div>
            <div class="d-flex">
              <button type="button" class="btn btn-outline-gray-line text-dark me-2">改時間</button>
              <button type="button" class="btn btn-gray-light text-dark me-2">婉拒</button>
              <button type="button" class="btn btn-primary text-dark">同意</button>
            </div>
          </div>
        </li>
        <li class="infoList__item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <p class="infoList__item__title">面試時間</p>
              <p class="infoList__item__content">2020.01.13 19:38</p>
            </div>
          </div>
        </li>
        <li class="infoList__item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <p class="infoList__item__title">面試地點</p>
              <p class="infoList__item__content">台北市中山區南京東路二段150號10樓</p>
            </div>
            <button type="button" class="btn btn-outline-gray-line text-dark me-2">打開地圖</button>
          </div>
        </li>
        <li class="infoList__item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <p class="infoList__item__title">應徵方式</p>
              <p class="infoList__item__content">sendCV 申請職位</p>
            </div>
          </div>
        </li>
        <li class="infoList__item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <p class="infoList__item__title">應徵時間</p>
              <p class="infoList__item__content">2020.01.13 19:38</p>
            </div>
          </div>
        </li>
        <li class="infoList__item list--last mb-5">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <p class="infoList__item__title">應徵紀錄</p>
              <p class="infoList__item__content">
                面試邀請<span class="subTxt">2020.01.13 19:38</span>
              </p>
            </div>
            <button type="button" class="btn btn-outline-gray-line text-dark me-2">查看全部</button>
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
              <strong>This is the first item's accordion body.</strong> It is shown by default,
              until the collapse plugin adds the appropriate classes that we use to style each
              element. These classes control the overall appearance, as well as the showing and
              hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It's also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit overflow.
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
              <strong>This is the second item's accordion body.</strong> It is hidden by default,
              until the collapse plugin adds the appropriate classes that we use to style each
              element. These classes control the overall appearance, as well as the showing and
              hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It's also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit overflow.
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
              <strong>This is the third item's accordion body.</strong> It is hidden by default,
              until the collapse plugin adds the appropriate classes that we use to style each
              element. These classes control the overall appearance, as well as the showing and
              hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It's also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit overflow.
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
              <strong>This is the third item's accordion body.</strong> It is hidden by default,
              until the collapse plugin adds the appropriate classes that we use to style each
              element. These classes control the overall appearance, as well as the showing and
              hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It's also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="boxSubNav === '職位內容'">
      <div class="sideJobBox__section">
        <h3 class="section__title--sub"><span class="title__icon"></span>職位內容</h3>
        <p class="mb-3">
          <i class="jobIcon--sm me-1 bi bi-journal"></i>工作性質：{{ jobItem.options.job.workType }}
        </p>
        <p class="mb-3">
          <span><i class="jobIcon--sm me-1 bi bi-clock"></i></span>工作時間：{{
            jobItem.options.job.workTime
          }}
        </p>
        <p class="mb-3">
          <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>產業類別：{{
            jobItem.options.company.industryCategory
          }}
        </p>
        <p class="mb-3">
          <span><i class="jobIcon--sm me-1 bi bi-card-list"></i></span>工作類別：{{
            jobItem.category
          }}
        </p>
        <p class="mb-3">工作內容：</p>
        <div class="page__txt" v-html="jobItem.content"></div>
      </div>
      <div class="sideJobBox__section">
        <h3 class="section__title--sub"><span class="title__icon"> </span>應徵條件</h3>
        <p class="mb-3">
          <span><i class="jobIcon--sm me-1 bi bi-book"></i></span>學歷要求：{{
            jobItem.options.job.education
          }}
        </p>
        <p class="mb-3">
          <span><i class="jobIcon--sm me-1 bi bi-briefcase"></i></span>工作經驗：{{
            jobItem.options.job.workExp
          }}
        </p>
        <p class="mb-3">其他條件：</p>
        <div class="page__txt" v-html="jobItem.options.job.otherRequirement"></div>
      </div>
      <div class="sideJobBox__section">
        <h3 class="section__title--sub"><span class="title__icon"></span>申請方法</h3>
        <p class="mb-3">
          <span><i class="jobIcon--sm me-1 bi bi-person"></i></span>職位聯絡人：{{
            jobItem.options.company.companyContact
          }}
        </p>
        <a class="mb-3 d-block" :href="`mailto:${jobItem.options.company.companyEmail}`">
          <span><i class="jobIcon--sm me-1 bi bi-envelope"></i></span>聯絡信箱：{{
            jobItem.options.company.companyEmail
          }}
        </a>
        <a class="mb-3 d-block" :href="`tel:${jobItem.options.company.companyTel}`">
          <span><i class="jobIcon--sm me-1 bi bi-phone"></i></span>聯絡電話：{{
            jobItem.options.company.companyTel
          }}
        </a>
        <p class="mb-3">申請備註：</p>
        <div class="page__txt" v-html="jobItem.options.job.otherApplyInfo"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';
import emitter from '@/methods/emitter';

export default {
  props: ['selectJobItem'],
  emits: ['search-by-job-category'],
  data() {
    return {
      boxSubNav: '申請資料',
      jobItem: {},
      collapse: '',
    };
  },
  watch: {
    selectJobItem: {
      deep: true,
      handler(newValue) {
        this.jobItem = newValue;
      },
    },
  },
  methods: {
    changeNav(navName, txt) {
      if (this[navName]) {
        this[navName] = txt;
      }
    },
    searchByJobCategory() {
      this.$emit('search-by-job-category', this.jobItem.category);
    },
    // 收藏職位
    collectJob(item) {
      emitter.emit('open-collect-modal', item);
    },
    toTop() {
      this.$refs.sideJobBox.scrollTop = 0;
    },
  },
  created() {
    this.jobItem = this.selectJobItem;
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.collapse);
  },
};
</script>

<style lang="scss"></style>
