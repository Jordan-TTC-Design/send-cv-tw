<template>
  <div class="container">
    <div
      ref="uploadCompanyLogoModal"
      class="popModal modal fade"
      tabindex="-1"
      id="uploadCompanyLogoModal"
      aria-hidden="true"
      aria-labelledby="uploadCompanyLogoModalLabel"
    >
      <div class="modal-dialog modal-dialog-centered"
      :class="{'modal-lg':introAction === 3}">
        <div class="modal-content">
          <div v-if="modalAction === '公司Logo'">
            <div
              class="popModal__header popModal__header--center border-bottom border-gray-line mb-5"
            >
              <h5 class="popModal__title">編輯公司Logo</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body border-bottom border-gray-line">
              <div class="d-flex justify-content-center mb-5" v-if="introAction < 3">
                <ul class="timeLine timeLine--company">
                  <li
                    class="timeLine__dot"
                    :class="{
                      active: introAction >= 0 && introAction < 3,
                      'line-active': introAction > 0 && introAction < 3,
                    }"
                  ></li>
                  <li
                    class="timeLine__dot"
                    :class="{
                      active: introAction >= 1 && introAction < 3,
                      'line-active': introAction > 1 && introAction < 3,
                    }"
                  ></li>
                  <li class="timeLine__dot" :class="{ active: introAction === 2 }"></li>
                </ul>
              </div>
              <p class="mb-5 px-7 text-center" v-if="introAction < 3">
                大頭貼會同時顯示於履歷，作為履歷照片，建議根據下方原則。
              </p>
              <div class="d-flex justify-content-center" v-if="introAction === 0">
                <div class="uploadUserImgIntro me-2">
                  <img
                    class="uploadUserImgIntro__img mb-2"
                    src="https://i.imgur.com/DQNO9Wu.png"
                    alt=""
                  />
                  <p class="px-1 text-center mb-2">看不出本人樣貌的照片</p>
                  <i class="jobIcon text-danger bi bi-x-circle-fill"></i>
                </div>
                <div class="uploadUserImgIntro ms-2">
                  <img
                    class="uploadUserImgIntro__img mb-2"
                    src="https://i.imgur.com/IZalK02.png"
                    alt=""
                  />
                  <p class="px-1 text-center mb-2">近期、辨別本人五官有自信微笑的照片</p>
                  <i class="jobIcon text-primary bi bi-check-circle-fill"></i>
                </div>
              </div>
              <div class="d-flex justify-content-center" v-if="introAction === 1">
                <div class="uploadUserImgIntro me-2">
                  <img
                    class="uploadUserImgIntro__img mb-2"
                    src="https://i.imgur.com/f7QtLRU.png"
                    alt=""
                  />
                  <p class="px-1 text-center mb-2">平日出去玩的照片</p>
                  <i class="jobIcon text-danger bi bi-x-circle-fill"></i>
                </div>
                <div class="uploadUserImgIntro ms-2">
                  <img
                    class="uploadUserImgIntro__img mb-2"
                    src="https://i.imgur.com/tbVnNnn.png"
                    alt=""
                  />
                  <p class="px-1 text-center mb-2">姿勢端正上半身佔60%符合職位衣著的照片</p>
                  <i class="jobIcon text-primary bi bi-check-circle-fill"></i>
                </div>
              </div>
              <div class="d-flex justify-content-center" v-if="introAction === 2">
                <div class="uploadUserImgIntro me-2">
                  <img
                    class="uploadUserImgIntro__img mb-2"
                    src="https://i.imgur.com/f7QtLRU.png"
                    alt=""
                  />
                  <p class="px-1 text-center mb-2">錯誤範例</p>
                  <i class="jobIcon text-danger bi bi-x-circle-fill"></i>
                </div>
                <div class="uploadUserImgIntro ms-2">
                  <img
                    class="uploadUserImgIntro__img mb-2"
                    src="https://i.imgur.com/GXOUwPf.png"
                    alt=""
                  />
                  <p class="px-1 text-center mb-2">正確範例</p>
                  <i class="jobIcon text-primary bi bi-check-circle-fill"></i>
                </div>
              </div>
              <div v-if="introAction === 3">
                <div class="row mb-5">
                  <div class="col-8">
                    <div class="cropperImageBox">
                      <img class="cropperImage d-none" ref="cropperImage" src="" alt="原圖" />
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="preViewImgBox bg-gray-light rounded p-5">
                      <div class="w-100 d-flex flex-column align-items-center mb-4">
                        <p class="mb-1">長型預覽圖</p>
                        <div class="bg-light p-1 rounded">
                          <img class="preViewImgBox__img" :src="destination" alt="長型圖片預覽圖" />
                        </div>
                      </div>
                      <div class="w-100 d-flex flex-column align-items-center">
                        <p class="mb-1">圓型預覽圖</p>
                        <div class="bg-light p-1 rounded-circle">
                          <img
                            class="preViewImgBox__img preViewImgBox__img--circle"
                            :src="destination"
                            alt="圓型圖片預覽圖"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  id="upLoadSectionImg"
                  ref="upLoadSectionImg"
                  name="圖片"
                  type="file"
                  class="form-control d-none"
                  data-input="upLoadSingleImg"
                  accept="image/*"
                  @change="loadingImg($event)"
                />
              </div>
            </div>
            <div class="popModal__footer justify-content-between">
              <button
                type="button"
                class="btn btn-outline-gray-line text-dark"
                v-if="introAction < 3"
                @click="setImgCropper"
              >
                略過
              </button>
              <button
                type="button"
                class="btn btn-outline-gray-line text-dark"
                v-if="introAction === 3"
                @click="clickInput"
              >
                重新上傳照片
              </button>
              <div class="d-flex">
                <button
                  type="button"
                  class="btn btn-outline-gray-line text-dark me-2"
                  v-if="introAction > 0 && introAction <= 3"
                  @click="introAction -= 1"
                >
                  上一步
                </button>
                <button
                  type="button"
                  class="btn btn-companyColor text-light"
                  @click="introAction += 1"
                  v-if="introAction < 2"
                >
                  下一步
                </button>
                <button
                  type="button"
                  class="btn btn-companyColor text-light"
                  @click="setImgCropper"
                  v-if="introAction === 2"
                >
                  更換企業logo
                </button>
                <button
                  type="button"
                  class="btn btn-companyColor text-light"
                  @click="processImage"
                  v-if="introAction === 3"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import Cropper from 'cropperjs';
import emitter from '@/methods/emitter';

export default {
  emits: ['emit-send-img-data'],
  props: ['userImgUrl'],
  data() {
    return {
      cropper: {},
      cropsrc: '',
      nowId: 0,
      isImg: false,
      imgData: {},
      destination: {},
      modalAction: '',
      introAction: 0,
      tempImgUrl: '',
      newImgCropper: false,
    };
  },
  watch: {
    userImgUrl: {
      deep: true,
      handler(newValue) {
        this.tempImgUrl = newValue;
        console.log(newValue);
      },
    },
  },
  methods: {
    // 上傳第一步：觸發圖片input
    clickInput() {
      this.cleanImg();
      this.$refs.upLoadSectionImg.click();
      this.newImgCropper = true;
    },
    // 上傳第二步：取得圖片傳給modal
    loadingImg(e) {
      this.putImage(e.target.files[0]);
    },
    getImgBlob() {
      fetch(this.tempImgUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          const myImage = new Image();
          myImage.src = objectURL;
          console.log(blob);
          this.putImage(blob);
        });
    },
    putImage(data) {
      const reader = new FileReader();
      console.log(data);
      if (data) {
        this.isImg = true;
        reader.readAsDataURL(data);
        reader.onload = () => {
          const dataURL = reader.result;
          this.imgData = this.$refs.cropperImage;
          this.imgData.src = dataURL;
          this.cropper = new Cropper(this.imgData, {
            aspectRatio: 16 / 9,
            viewMode: 0,
            dragMode: 'move',
            minContainerWidth: 360,
            minContainerHeight: 360,
            zoomable: true,
            scalable: true,
            crop: () => {
              const canves = this.cropper.getCroppedCanvas({
                maxWidth: 800,
                maxHeight: 800,
              });
              this.destination = canves.toDataURL('image/jpeg');
            },
          });
        };
      }
    },
    cleanImg() {
      if (this.isImg) {
        this.cropsrc = '';
        this.cropper.destroy();
        this.isImg = false;
      }
    },
    processImage() {
      const canves = this.cropper.getCroppedCanvas({
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: '#fff',
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'high',
      });
      this.cropsrc = canves.toDataURL('image/jpeg');
      this.sendbackImg();
    },
    sendbackImg() {
      this.$emit('emit-send-img-data', this.cropsrc);
      this.closeModal();
    },
    openModal(action) {
      this.modalAction = action;
      this.introAction = 0;
      this.uploadCompanyLogoModal.show();
    },
    closeModal() {
      this.uploadCompanyLogoModal.hide();
    },
    setImgCropper() {
      this.introAction = 3;
      this.getImgBlob();
    },
  },
  created() {
    this.tempImgUrl = this.userImgUrl;
  },
  mounted() {
    this.uploadCompanyLogoModal = new Modal(this.$refs.uploadCompanyLogoModal);
    emitter.on('open-uploadCompanyLogoModal', this.openModal);
    emitter.on('close-uploadCompanyLogoModal', this.closeModal);
  },
  unmounted() {
    this.uploadCompanyLogoModal.dispose();
    emitter.off('open-uploadCompanyLogoModal', this.openModal);
    emitter.off('close-uploadCompanyLogoModal', this.closeModal);
  },
};
</script>

<style lang="scss">
.cropperImageBox {
  display: block;
  width: 100%;
  background-color: #f7f7f7;
  min-height: 320px;
  .cropperImage {
    max-width: 80%;
    max-height: 80%;
  }
}
.cropper-container {
  min-height: 240px;
  min-width: 240px;
  img {
    display: block;
    height: 100%;
    image-orientation: 0deg;
    max-height: none !important;
    max-width: none !important;
    min-height: 0 !important;
    min-width: 0 !important;
    width: 100%;
  }
}
.preViewImgBox {
  width: 100%;
  min-height: 100%;
  &__img {
    object-fit: contain;
    border-radius: 0.25rem;
    width: 160px !important;
    height: 90px !important;
  }
  &__img--circle {
    object-fit: contain;
    border-radius: 50%;
    width: 132px !important;
    height: 132px !important;
  }
}
</style>
