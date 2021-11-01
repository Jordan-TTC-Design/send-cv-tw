<template>
  <div
    ref="adModal"
    class="modal fade popModal"
    id="adModal"
    aria-hidden="true"
    aria-labelledby="adModalLabel"
    tabindex="-1"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      ref="collapse"
      :class="{ 'modal-lg': modalAction === '廣告預覽' }"
    >
      <div class="modal-content">
        <div class="popModal__header popModal__header--center">
          <h5 class="popModal__title">{{ mainAction }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div v-if="modalAction === '廣告預覽'">
          <div class="modal-body px-0"></div>
        </div>
        <div v-if="modalAction === '已成功申請刊登廣告'">
          <div class="modal-body mb-5">
            <p class="mb-5">
              您已成功申請刊登「首頁-大型版面廣告」，我們需要最少兩個工作天來審核您的廣告內容，請您耐心的等候，我們會在完成審核後通知。
            </p>
            <button type="button" class="btn btn-companyColor text-light w-100" @click="backToList">
              理解，返回加值服務
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';

export default {
  emits: ['back-to-list'],
  data() {
    return {
      collapse: {},
      modal: {},
      modalAction: '',
      mainAction: '',
      dataReady: false,
      formData: {},
      jobCategories: [],
      driverLicenses: [],
      tempItem: { index: 0 },
    };
  },
  methods: {
    openModal(action) {
      this.mainAction = action;
      this.modalAction = this.mainAction;
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    backToList() {
      this.$emit('back-to-list');
    },
  },
  created() {
    this.formData = webData;
  },
  mounted() {
    this.modal = new Modal(this.$refs.adModal);
    emitter.on('open-ad-modal', this.openModal);
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-ad-modal', this.openModal);
  },
};
</script>

<style lang="scss"></style>
