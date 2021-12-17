<template>
  <div ref="sideJobContainer" class="sideJobContainer sideJobContainer--sticky box--shadow">
    <div class="sideJobContainer__header">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="d-flex">
          <p class="jobTag bg-primary me-2"><i class="jobIcon-sm bi bi-star-fill"></i></p>
          <button type="button" class="jobTag btn me-2">100%</button>
          <button type="button" class="jobTag btn">
            {{ jobItem.category }}
          </button>
        </div>
        <div class="d-flex">
          <button class="btn btn-outline-gray-line text-dark me-2" type="button">聯絡</button>
          <button
            class="btn btn-outline-gray-line text-dark"
            type="button"
            :class="{ collected: jobItem.jobCollectCheck }"
            @click="collectJob(jobItem)"
          >
            收藏職位
          </button>
        </div>
      </div>
      <div class="d-flex">
        <div class="sideJobContainer__imgBox">
          <img class="jobImage mt-3" :src="jobItem.imageUrl" :alt="`${jobItem.title}職位圖片`" />
          <div class="logoImageBox">
            <img
              class="logoImage"
              :src="jobItem.options.company.companyLogoUrl"
              :alt="`${jobItem.options.company.companyName}logo`"
            />
          </div>
        </div>
        <div class="flex-grow-1">
          <router-link
            class="sideJobContainer__title mb-3 d-block"
            type="button"
            :to="`/products-list/product/${jobItem.id}`"
            >{{ jobItem.title }}</router-link
          >
          <router-link
            class="txtLink subTxt mb-4 d-block"
            type="button"
            :to="`/products-list/company/${jobItem.options.company.companyLink}`"
            >{{ jobItem.options.company.companyName }}</router-link
          >
          <div class="d-flex">
            <p class="subTxt me-5">
              <i class="jobIcon--sm me-1 bi bi-geo-alt"></i
              >{{ jobItem.options.company.companyAddressCity }}
            </p>
            <p class="subTxt" v-if="!jobItem.options.job.salaryInterView">
              <i class="jobIcon--sm me-1 bi bi-currency-dollar"></i>
              {{ jobItem.price }} / 月薪
            </p>
            <p class="subTxt" v-if="jobItem.options.job.salaryInterView">
              <i class="jobIcon--sm me-1 bi bi-currency-dollar"></i>
              薪資面議
            </p>
          </div>
        </div>
      </div>
    </div>
    <ul class="innerNav innerNav--fill innerNav--jobSeeker innerNav--nonRound">
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
    <div class="sideJobContainer__body" v-if="innerNav === '申請資料'">
      <ul class="infoList infoList--jobSeeker infoList--withBtn infoList--row">
        <li class="infoList__item">
          <div>
            <p class="infoList__item__title">應徵狀態</p>
            <p class="infoList__item__content">面試邀請</p>
          </div>
          <div class="infoList__btnBox">
            <button type="button" class="btn btn-outline-gray-line text-dark me-2">改時間</button>
            <button type="button" class="btn btn-gray-light text-dark me-2">婉拒</button>
            <button type="button" class="btn btn-primary text-dark">同意</button>
          </div>
        </li>
        <li class="infoList__item">
          <div>
            <p class="infoList__item__title">面試時間</p>
            <p class="infoList__item__content">2020.01.13 19:38</p>
          </div>
        </li>
        <li class="infoList__item">
          <div>
            <p class="infoList__item__title">面試地點</p>
            <p class="infoList__item__content">台北市中山區南京東路二段150號10樓</p>
          </div>
          <div class="infoList__btnBox">
            <button type="button" class="btn btn-outline-gray-line text-dark me-2">打開地圖</button>
          </div>
        </li>
        <li class="infoList__item">
          <div>
            <p class="infoList__item__title">應徵方式</p>
            <p class="infoList__item__content">sendCV 申請職位</p>
          </div>
        </li>
        <li class="infoList__item">
          <div>
            <p class="infoList__item__title">應徵時間</p>
            <p class="infoList__item__content">2020.01.13 19:38</p>
          </div>
        </li>
        <li class="infoList__item list--last mb-5">
          <div>
            <p class="infoList__item__title">應徵紀錄</p>
            <p class="infoList__item__content">
              面試邀請<span class="subTxt">2020.01.13 19:38</span>
            </p>
          </div>
          <div class="infoList__btnBox">
            <button type="button" class="btn btn-outline-gray-line text-dark me-2">查看全部</button>
          </div>
        </li>
      </ul>
      <ul ref="collapse" class="accordion">
        <!-- 應徵文件 -->
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
    <div class="sideJobContainer__body" v-if="innerNav === '職位內容'">
      <div class="sideJobContainer__section">
        <h3 class="sectionTitle--withTag mb-4">
          <span class="sectionTitleTag--double me-2"></span>職位內容
        </h3>
        <ul class="jobDataList">
          <li class="jobDataList__item flex-column align-items-start">
            <div v-html="jobItem.content" v-if="jobItem.content !== ''"></div>
            <p class="jobDataList__item__txt noContent" v-if="jobItem.content === ''">尚未填寫</p>
          </li>
        </ul>
      </div>
      <div class="sideJobContainer__section">
        <h3 class="sectionTitle--withTag mb-4">
          <span class="sectionTitleTag--double me-2"> </span>應徵條件
        </h3>
        <ul class="jobDataList">
          <li class="jobDataList__item">
            <p class="jobDataList__item__title">
              <i class="jobIcon--sm me-1 bi bi-journal"></i>學歷要求：{{
                jobItem.options.job.education
              }}
            </p>
          </li>
          <li class="jobDataList__item">
            <p class="jobDataList__item__title">
              <i class="jobIcon--sm me-1 bi bi-clock"></i>工作經驗：{{
                jobItem.options.job.workExp
              }}
            </p>
          </li>
          <li class="jobDataList__item col-12 flex-column align-items-start">
            <p class="jobDataList__item__title mb-1">其他條件：</p>
            <div
              v-html="jobItem.options.job.otherRequirement"
              v-if="jobItem.options.job.otherRequirement !== ''"
            ></div>
            <p
              class="jobDataList__item__txt noContent"
              v-if="jobItem.options.job.otherRequirement === ''"
            >
              尚未填寫
            </p>
          </li>
        </ul>
      </div>
      <div class="sideJobContainer__section">
        <h3 class="sectionTitle--withTag mb-4">
          <span class="sectionTitleTag--double me-2"></span>其他職位資訊
        </h3>
        <ul class="jobDataList">
          <li class="jobDataList__item">
            <p class="jobDataList__item__title">
              <i class="jobIcon--sm me-1 bi bi-journal"></i>工作性質：{{
                jobItem.options.job.workType
              }}
            </p>
          </li>
          <li class="jobDataList__item">
            <p class="jobDataList__item__title">
              <i class="jobIcon--sm me-1 bi bi-clock"></i>工作時間：{{
                jobItem.options.job.workTime
              }}
            </p>
          </li>
          <li class="jobDataList__item">
            <p class="jobDataList__item__title">
              <i class="jobIcon--sm me-1 bi bi-building"></i>產業類別：{{
                jobItem.options.company.industryCategory
              }}
            </p>
          </li>
          <li class="jobDataList__item">
            <p class="jobDataList__item__title">
              <i class="jobIcon--sm me-1 bi bi-card-list"></i>工作類別：{{ jobItem.category }}
            </p>
          </li>
        </ul>
      </div>
      <div class="sideJobContainer__section">
        <h3 class="sectionTitle--withTag mb-4">
          <span class="sectionTitleTag--double me-2"></span>申請方法
        </h3>
        <ul class="jobDataList">
          <li class="jobDataList__item">
            <p class="jobDataList__item__title">
              <i class="jobIcon--sm me-1 bi bi-person"></i>職位聯絡人：{{
                jobItem.options.company.companyContact
              }}
            </p>
          </li>
          <li class="jobDataList__item">
            <a
              class="jobDataList__item__title d-block"
              :href="`mailto:${jobItem.options.company.companyEmail}`"
            >
              <i class="jobIcon--sm me-1 bi bi-envelope"></i>聯絡信箱：{{
                jobItem.options.company.companyEmail
              }}
            </a>
          </li>
          <li class="jobDataList__item">
            <a
              class="jobDataList__item__title d-block"
              :href="`tel:${jobItem.options.company.companyTel}`"
            >
              <i class="jobIcon--sm me-1 bi bi-phone"></i>聯絡電話：{{
                jobItem.options.company.companyTel
              }}
            </a>
          </li>
          <li class="jobDataList__item flex-column align-items-start">
            <p class="jobDataList__item__title">申請備註：</p>
            <div
              v-html="jobItem.options.job.otherApplyInfo"
              v-if="jobItem.options.job.otherApplyInfo !== ''"
            ></div>
            <p
              class="jobDataList__item__txt noContent"
              v-if="jobItem.options.job.otherApplyInfo === ''"
            >
              尚未填寫
            </p>
          </li>
        </ul>
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
      innerNav: '申請資料',
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
      this.$refs.sideJobContainer.scrollTop = 0;
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
