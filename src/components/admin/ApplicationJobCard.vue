<template>
  <div
    @click="selectJob"
    :data-id="jobItem.id"
    :ref="`jobCard${jobItem.id}`"
    class="jobCard box--shadow jobCard--apply"
  >
    <div class="tag--new">
      <p class="tag--new__txt">NEW</p>
    </div>
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
        <div class="jobCard__txtBox flex-grow-1 d-flex flex-column justify-content-between">
            <router-link
              class="strongTxt mb-3 me-md-7"
              :to="`/products-list/product/${jobItem.id}`"
              >{{ jobItem.title }}</router-link
            >
            <router-link
              class="txtLink subTxt mb-3 me-md-7"
              :to="`/products-list/company/${jobItem.options.company.companyLink}`"
              >{{ jobItem.options.company.companyName }}</router-link
            >
          <p class="subTxt--foil">申請時間：{{ $filters.date(jobItem.options.job.create) }}</p>
        </div>
      </div>
    </div>
    <div class="jobCard__footer pt-md-0 justify-content-end">
      <p class="jobTag me-2">匹配度100%</p>
      <p class="jobTag">已申請</p>
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
