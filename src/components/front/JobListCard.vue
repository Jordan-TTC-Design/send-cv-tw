<template>
  <div
    @click="selectJob"
    :data-id="jobItem.id"
    :ref="`jobCard${jobItem.id}`"
    class="jobCard box--shadow"
  >
    <button
      class="collectBtn btn btn-outline-gray-line position-absolute"
      :class="{ collected: jobItem.jobCollectCheck }"
      type="button"
      @click.stop="collectJob(jobItem)"
    >
      <i class="jobIcon bi bi-bookmark-fill"></i>
    </button>
    <div class="d-flex w-100 flex-md-row flex-column p-md-3">
      <div class="jobCard__imgBox">
        <img class="jobImage" :src="jobItem.imageUrl" :alt="`${jobItem.title}職位圖片`" />
        <div class="img-cover d-md-none d-block"></div>
        <div class="jobCard__logoImgBox">
          <img
            class="logoImg"
            :src="jobItem.options.company.companyLogoUrl"
            :alt="`${jobItem.options.company.companyName}logo`"
          />
        </div>
      </div>
      <div class="jobCard__body p-md-0">
        <div class="jobCard__tagBox mb-3">
          <p class="jobTag me-2">匹配度100%</p>
          <button type="button" class="jobTag btn" @click="searchByJobCategory">
            {{ jobItem.category }}
          </button>
        </div>
        <div class="jobCard__txtBox">
          <router-link
            class="strongTxt mb-3 me-md-7"
            :to="`/products-list/product/${jobItem.id}`"
            >{{ jobItem.title }}</router-link
          >
          <router-link
            class="txtLink subTxt me-md-7"
            :to="`/products-list/company/${jobItem.options.company.companyLink}`"
            >{{ jobItem.options.company.companyName }}</router-link
          >
        </div>
      </div>
    </div>
    <div class="jobCard__footer pt-md-0 align-items-end">
      <p class="text-dark" v-if="!jobItem.options.job.salaryInterView">
        {{ jobItem.price }} / 月薪
      </p>
      <p class="text-dark" v-if="jobItem.options.job.salaryInterView">薪資面議</p>
      <p class="subTxt--foil">
        {{ $filters.date(jobItem.options.job.create) }}
      </p>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  props: ['jobListItem'],
  emits: ['select-job', 'search-by-job-category'],
  data() {
    return {
      jobItem: {},
    };
  },
  watch: {
    jobListItem: {
      deep: true,
      handler(newValue) {
        this.jobItem = newValue;
      },
    },
  },
  methods: {
    // 收藏職位
    collectJob(item) {
      emitter.emit('open-collect-modal', item);
    },
    selectJob() {
      this.$emit('select-job', this.jobItem.id);
    },
    searchByJobCategory() {
      this.$emit('search-by-job-category', this.jobItem.category);
    },
    openSelectEffect() {
      this.$refs[`jobCard${this.jobItem.id}`].classList.add('active');
    },
    closeSelectEffect() {
      this.$refs[`jobCard${this.jobItem.id}`].classList.remove('active');
    },
  },
  created() {
    this.jobItem = this.jobListItem;
  },
};
</script>

<style lang="scss"></style>
