<template>
  <div class="container">
    <div
      ref="uploadUserImgModal"
      class="settingCareerModal popModal modal fade"
      tabindex="-1"
      id="uploadUserImgModal"
      aria-hidden="true"
      aria-labelledby="uploadUserImgModalLabel"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div v-if="modalAction === '個人照片說明1'">
            <div
              class="popModal__header popModal__header--center border-bottom border-gray-line mb-5"
            >
              <h5 class="popModal__title">編輯大頭貼</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="popModal__body--p border-bottom border-gray-line">
              <div class="d-flex justify-content-center mb-5" v-if="introAction < 3">
                <ul class="timeLine">
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
                <div class="cropperImageBox mb-5">
                  <img class="cropperImage d-none" ref="cropperImage" src="" alt="原圖" />
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
                  class="btn btn-primary"
                  @click="introAction += 1"
                  v-if="introAction < 2"
                >
                  下一步
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="setImgCropper"
                  v-if="introAction === 2"
                >
                  更換大頭貼
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
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
      imageSquareCropperModal: {},
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
            aspectRatio: 1,
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
    openUserImgModal(action) {
      this.modalAction = action;
      this.introAction = 0;
      this.uploadUserImgModal.show();
    },
    closeUserImgModal() {
      this.uploadUserImgModal.hide();
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
    this.uploadUserImgModal = new Modal(this.$refs.uploadUserImgModal);
    emitter.on('open-uploadUserImgModal', this.openUserImgModal);
    emitter.on('close-uploadUserImgModal', this.closeUserImgModal);
  },
  unmounted() {
    this.uploadUserImgModal.dispose();
    emitter.off('open-uploadUserImgModal', this.openUserImgModal);
    emitter.off('close-uploadUserImgModal', this.closeUserImgModal);
  },
};
</script>

<style lang="scss">
.cropperImageBox {
  display: block;
  width: 100%;
  background-color: #f7f7f7;
  min-height: 480px;
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
.compeletedImgBox--square {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 160px !important;
    height: 160px !important;
  }
}
.img-preview--square {
  max-width: 160px;
  max-height: 160px;
}
</style>
