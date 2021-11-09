<template>
  <div class="container">
    <div
      ref="otherApplyModal"
      class="modal fade popModal"
      id="otherApplyModal"
      aria-hidden="true"
      aria-labelledby="otherApplyModalLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="popModal__header popModal__header--center">
            <h5 class="popModal__title">尋找生活中更多工作機會</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-6">
                <div @click="goToPageLink('/other-apply/mail')" class="otherApplyModalBox">
                  <img class="mb-4" src="https://i.imgur.com/1tFHUpr.png" alt="寫郵件 Send CV" />
                  <div>
                    <p class="otherApplyModalBox__title mb-2">寫郵件 Send CV</p>
                    <p>最強快速申請方式，只要填寫公司信箱，填寫好下面資料，我們幫您投遞履歷！</p>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div @click="goToPageLink('/other-apply/shot')" class="otherApplyModalBox">
                  <img class="mb-4" src="https://i.imgur.com/R90HeUH.png" alt="拍照求職" />
                  <div>
                    <p class="otherApplyModalBox__title mb-2">拍照求職</p>
                    <p>隨手拍下身邊職位資訊，立即傳送履歷！</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="popModal__footer">
            <button type="button" class="btn btn-outline-gray-line text-dark w-100">
              查看申請紀錄
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

export default {
  data() {
    return {
      modal: {},
    };
  },
  methods: {
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.otherApplyModal);
    emitter.on('open-other-apply-modal', this.openModal);
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-other-apply-modal', this.openModal);
  },
};
</script>

<style lang="scss"></style>
