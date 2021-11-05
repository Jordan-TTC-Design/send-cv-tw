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
      :class="{ 'modal-lg': modalAction === '廣告預覽' || modalAction === '檢視廣告' }"
    >
      <div class="modal-content">
        <div class="popModal__header popModal__header--center">
          <h5 class="popModal__title">{{ mainAction }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body" v-if="modalAction === '廣告預覽'">
          <div class="form__inputBox">
            <div class="d-flex">
              <div class="form-check me-4">
                <input
                  class="form-check-input"
                  type="radio"
                  id="adPreviewType"
                  name="adPreviewType"
                  value="PC版預覽"
                  v-model="previewAdType"
                  :checked="previewAdType === 'PC版預覽'"
                />
                <label class="form-check-label" for="adPreviewType"> PC版預覽</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="adPreviewType"
                  name="adPreviewType"
                  value="手機版預覽"
                  v-model="previewAdType"
                  :checked="previewAdType === '手機版預覽'"
                />
                <label class="form-check-label" for="adPreviewType">手機版預覽</label>
              </div>
            </div>
          </div>
          <div class="adPreviewContainer w-100 rounded mb-6">
            <img v-if="previewAdType === 'PC版預覽'" class="adPreviewContainer__img w-100" src="https://i.imgur.com/0gQq1A3.png" alt="">
            <img v-if="previewAdType === '手機版預覽'" class="adPreviewContainer__img my-5 w-50" src="https://i.imgur.com/IOBK7zf.png" alt="">
          </div>
        </div>
        <div class="modal-body mb-5" v-if="modalAction === '檢視廣告'">
          <div class="row">
            <div class="col-6">
              <ul class="infoList infoList--company">
                <li class="infoList__item">
                  <p class="infoList__item__title">狀態</p>
                  <p class="infoList__item__content">{{adItem.adState}}</p>
                </li>
                <li class="infoList__item">
                  <p class="infoList__item__title">申請人</p>
                  <p class="infoList__item__content">王小明</p>
                </li>
                <li class="infoList__item">
                  <p class="infoList__item__title">申請日期</p>
                  <p class="infoList__item__content">110/09/05</p>
                </li>
                <li class="infoList__item">
                  <p class="infoList__item__title">刊登期限</p>
                  <p class="infoList__item__content">110/09/10~110/09/24</p>
                </li>
                <li class="infoList__item">
                  <p class="infoList__item__title">廣告標題</p>
                  <p class="infoList__item__content">{{adItem.adName}}</p>
                </li>
                <li class="infoList__item">
                  <p class="infoList__item__title">廣告內文</p>
                  <div class="infoList__item__content" v-html="adItem.adContent">
                  </div>
                </li>
                <li class="infoList__item border-0">
                  <p class="infoList__item__title">廣告連結</p>
                  <p class="infoList__item__content">外部連結<span class="jobTag ms-2">連結</span></p>
                </li>
              </ul>
            </div>
            <div class="col-6 d-flex flex-column justify-content-between align-items-end">
              <ul class="infoList infoList--company">
                <li class="infoList__item border-0">
                  <p class="infoList__item__title">廣告圖片</p>
                  <img class="w-100 rounded" :src="adItem.adImgUrl.url" alt="">
                </li>
              </ul>
              <button type="button" class="btn btn-outline-gray-line text-dark">編輯</button>
            </div>
          </div>
        </div>
        <div class="modal-body mb-5" v-if="modalAction === '已成功申請刊登廣告'">
          <p class="mb-5">
            您已成功申請刊登「{{
              adItem.adType
            }}」，我們需要最少兩個工作天來審核您的廣告內容，請您耐心的等候，我們會在完成審核後通知。
          </p>
          <button type="button" class="btn btn-companyColor text-light w-100" @click="backToList">
            理解，返回加值服務。
          </button>
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
      modal: {},
      previewAdType: 'PC版預覽',
      modalAction: '',
      mainAction: '',
      dataReady: false,
      formData: {},
      adItem: {},
    };
  },
  methods: {
    openModal(obj) {
      this.adItem = obj.data;
      this.mainAction = obj.action;
      this.modalAction = this.mainAction;
      console.log(this.mainAction);
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
