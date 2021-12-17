<template>
  <div ref="sideJobContainer" class="sideJobContainer sideJobContainer--sticky box--shadow">
    <div class="sideJobContainer__header">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="d-flex">
          <p class="jobTag bg-primary me-2"><i class="jobIcon-sm bi bi-star-fill"></i></p>
          <button type="button" class="jobTag btn me-2">100%</button>
          <button type="button" class="jobTag btn" @click="searchByJobCategory">
            {{ jobItem.category }}
          </button>
        </div>
        <div class="d-flex">
          <router-link
            class="btn btn-outline-gray-line text-dark d-flex align-items-center me-2"
            type="button"
            :to="`/products-list/product/${jobItem.id}`"
            >開新頁面</router-link
          >
          <button
            class="collectBtn btn btn-outline-gray-line"
            type="button"
            :class="{ collected: jobItem.jobCollectCheck }"
            @click="collectJob(jobItem)"
          >
            <i class="jobIcon bi bi-bookmark-fill"></i>
          </button>
        </div>
      </div>
      <div class="d-flex mb-3">
        <div class="sideJobContainer__imgBox">
          <img class="jobImage" :src="jobItem.imageUrl" :alt="`${jobItem.title}職位圖片`" />
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
            class="bodyTxt txtLink subTxt mb-4 d-block"
            type="button"
            :to="`/products-list/company/${jobItem.options.company.companyLink}`"
            >{{ jobItem.options.company.companyName }}</router-link
          >
          <div class="d-flex">
            <p class="subTxt me-5">
              <i class="jobIcon--sm me-1 bi bi-geo-alt"></i
              >{{ jobItem.options.company.companyAddressCity }}
            </p>
            <p class="subTxt">
              <i class="jobIcon--sm me-1 bi bi-people"></i>需求人數：{{ jobItem.num }}
            </p>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-end">
        <p class="strongTxt" v-if="!jobItem.options.job.salaryInterView">
          {{ jobItem.price }} / 月薪
        </p>
        <p class="strongTxt" v-if="jobItem.options.job.salaryInterView">薪資面議</p>
        <div class="d-flex align-items-center">
          <p class="subTxt text-secondary me-2">
            {{ $filters.date(jobItem.options.job.create) }}
          </p>
          <router-link
            class="btn--w--md btn btn-primary btn-bg d-flex align-items-center"
            type="button"
            :to="`/apply-job/${jobItem.id}`"
            >申請職位</router-link
          >
        </div>
      </div>
    </div>
    <div class="sideJobContainer__body">
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
import emitter from '@/methods/emitter';

export default {
  props: ['selectJobItem'],
  emits: ['search-by-job-category'],
  data() {
    return {
      jobItem: {},
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
};
</script>

<style lang="scss"></style>
