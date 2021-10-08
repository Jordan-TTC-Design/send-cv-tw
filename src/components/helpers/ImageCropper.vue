<template>
  <div
    class="modal fade popModal"
    tabindex="-1"
    aria-labelledby="imageCropperModal"
    aria-hidden="true"
    ref="imageCropperModal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="popModal__header popModal__header--center border-bottom border-gray-line mb-5">
          <h5 class="popModal__title">裁切照片</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body mb-5">
          <div class="row">
            <div class="col-8">
              <div class="cropperImageBox rounded overflow-hidden">
                <img class="cropperImage" ref="cropperImage" src="" alt="原圖" />
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
        </div>
        <div class="popModal__footer border-top border-gray-line justify-content-end">
          <button type="button" class="btn btn-primary" @click="processImage">確定</button>
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
  props: ['imgNumber', 'dataName'],
  emits: ['send-img-data'],
  data() {
    return {
      imageCropperModal: {},
      cropper: {},
      cropsrc: '',
      isImg: false,
      imgData: {},
      destination: {},
    };
  },
  methods: {
    putImage(data) {
      const reader = new FileReader();
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
            minContainerWidth: 480,
            minContainerHeight: 360,
            zoomable: true,
            scalable: true,
            crop: () => {
              const canves = this.cropper.getCroppedCanvas({
                maxWidth: 960,
                maxHeight: 720,
              });
              this.destination = canves.toDataURL('image/jpeg');
            },
          });
          this.openModal();
        };
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
      this.$emit('send-img-data', this.cropsrc);
      this.closeModal();
    },
    cleanImg() {
      if (this.isImg) {
        this.cropsrc = '';
        this.cropper.destroy();
        this.isImg = false;
      }
    },
    closeModal() {
      this.imageCropperModal.hide();
      this.cleanImg();
    },
    openModal() {
      this.imageCropperModal.show();
    },
    emitOpenImageCropper(data) {
      // 檢查有無之前遺留的
      if (this.cropper !== {}) {
        this.cleanImg();
      }
      setTimeout(() => {
        this.putImage(data);
      }, 100);
    },
  },
  mounted() {
    this.imageCropperModal = new Modal(this.$refs.imageCropperModal);
    emitter.on(`open-img-cropper-modal--${this.dataName}--${this.imgNumber}`, this.emitOpenImageCropper);
  },
  unmounted() {
    this.imageCropperModal.dispose();
    emitter.off(`open-img-cropper-modal--${this.dataName}--${this.imgNumber}`, this.emitOpenImageCropper);
  },
};
</script>

<style lang="scss">
.cropperImageBox {
  display: block;
  width: 100%;
  background: color #f7f7f7;
  .cropperImage {
    max-width: 100%;
  }
}
.cropper-container {
  min-height: 360px;
  min-width: 480px;
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
