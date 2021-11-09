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
            <img
              v-if="previewAdType === 'PC版預覽'"
              class="adPreviewContainer__img w-100"
              src="https://i.imgur.com/0gQq1A3.png"
              alt=""
            />
            <img
              v-if="previewAdType === '手機版預覽'"
              class="adPreviewContainer__img my-5 w-50"
              src="https://i.imgur.com/IOBK7zf.png"
              alt=""
            />
          </div>
        </div>
        <div class="modal-body mb-5" v-if="modalAction === '檢視廣告'">
          <div class="row">
            <div class="col-6">
              <ul class="infoList infoList--company">
                <li class="infoList__item">
                  <p class="infoList__item__title">狀態</p>
                  <p class="infoList__item__content">{{ adItem.adState }}</p>
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
                  <p class="infoList__item__content">{{ adItem.adName }}</p>
                </li>
                <li class="infoList__item">
                  <p class="infoList__item__title">廣告內文</p>
                  <div class="infoList__item__content" v-html="adItem.adContent"></div>
                </li>
                <li class="infoList__item border-0">
                  <p class="infoList__item__title">廣告連結</p>
                  <p class="infoList__item__content">
                    外部連結<a target="_blank" class="jobTag ms-2" :href="adItem.adLink.link"
                      >連結</a
                    >
                  </p>
                </li>
              </ul>
            </div>
            <div class="col-6 d-flex flex-column justify-content-between align-items-end">
              <ul class="infoList infoList--company">
                <li class="infoList__item border-0">
                  <p class="infoList__item__title">廣告圖片</p>
                  <img class="w-100 rounded" :src="adItem.adImgUrl.url" alt="" />
                </li>
              </ul>
              <div class="d-flex">
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                  撤銷刊登
                </button>
                <button
                  type="button"
                  class="btn btn-outline-gray-line text-dark me-2"
                  @click="goToPageLink(adItem.key)"
                >
                  編輯
                </button>
                <button type="button" class="btn btn-companyColor text-light" @click="longerTime">
                  延長刊登時間
                </button>
              </div>
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
        <div class="modal-body mb-5" v-if="modalAction === '已成功重新申請刊登廣告'">
          <p class="mb-5">
            您已成功重新申請刊登「{{
              adItem.adType
            }}」，由於您編輯過該筆廣告，我們需要最少兩個工作天來重新審核您的廣告內容，請您耐Ｆ心的等候，我們會在完成審核後通知。
          </p>
          <button type="button" class="btn btn-companyColor text-light w-100" @click="backToList">
            理解，返回加值服務。
          </button>
        </div>
        <div class="modal-body mb-5" v-if="modalAction === '延長刊登時間' && dataReady">
          <div class="mb-2 d-flex align-items-center justify-content-between">
            <p>目前剩餘額度：{{ company.payService.adTokens }}</p>
            <button type="button" class="btn btn-outline-gray-line text-dark">購買額度</button>
          </div>
          <div class="inputGroup--item mb-3">
            <div class="form__labelBox">
              <label for="adToken" class="form__label--custom form-label">使用額度</label>
            </div>
            <div class="fakeInput--counter">
              <div
                class="fakeBtn"
                @click="minusData('大型看板廣告')"
                :class="{ disActive: extendToken < 2 }"
              >
                <i class="jobIcon bi bi-dash-circle"></i>
              </div>
              <p>{{ extendToken }}</p>
              <div
                class="fakeBtn"
                @click="plusData('大型看板廣告')"
                :class="{
                  disActive: extendToken >= company.payService.adTokens,
                }"
              >
                <i class="jobIcon bi bi-plus-circle"></i>
              </div>
            </div>
          </div>
          <p class="mb-1">收費方式：一個額度將延長 7 天</p>
          <p class="mb-4">起算日期：接續在結束刊登日期</p>
          <button type="button" class="btn btn-companyColor text-light w-100" @click="extendAd">
            延長刊登時間
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
import database from '@/methods/firebaseinit';

export default {
  emits: ['back-to-list', 'call-action'],
  data() {
    return {
      modal: {},
      previewAdType: 'PC版預覽',
      modalAction: '',
      mainAction: '',
      dataReady: false,
      formData: {},
      adItem: {},
      company: {},
      extendToken: 1,
    };
  },
  methods: {
    goToPageLink(key) {
      this.$router.push(`service-ad/edit-ad/${key}`);
    },
    extendAd() {
      this.adItem.usedToken += this.extendToken;
      this.costCompanyAdTokens();
      const adDataRef = database.ref(`company/payService/adList/${this.adItem.key}`);
      adDataRef.set(this.adItem);
      this.closeModal();
    },
    costCompanyAdTokens() {
      this.company.payService.adTokens -= this.extendToken;
      const companyRef = database.ref('company/payService');
      companyRef.set(this.company.payService);
    },
    // promote token +1
    plusData(dataName) {
      if (dataName === '大型看板廣告') {
        if (this.extendToken < this.company.payService.adTokens) {
          this.extendToken += 1;
        }
      }
    },
    // promote token -1
    minusData(dataName) {
      if (dataName === '大型看板廣告') {
        if (this.extendToken > 1) {
          this.extendToken -= 1;
        }
      }
    },
    longerTime() {
      this.getCompanyData();
      this.mainAction = '延長刊登時間';
      this.modalAction = this.mainAction;
    },
    callAction(actionName) {
      this.$emit('call-action', actionName);
    },
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
    // Get company data from Firebase.
    getCompanyData() {
      const companyRef = database.ref('company');
      companyRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.company = data;
          this.dataReady = true;
        }
      });
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
