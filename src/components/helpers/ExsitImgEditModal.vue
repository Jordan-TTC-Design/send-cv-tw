<template>
  <div class="container">
    <div
      ref="ExistImgEditModal"
      class="popModal modal fade"
      tabindex="-1"
      id="ExistImgEditModal"
      aria-hidden="true"
      aria-labelledby="ExistImgEditModalLabel"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div
            class="popModal__header popModal__header--center border-bottom border-gray-line mb-5"
          >
            <h5 class="popModal__title">編輯圖片</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="popModal__body--p border-bottom border-gray-line">
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
          <div class="popModal__footer justify-content-between">
            <button type="button" class="btn btn-outline-gray-line text-dark" @click="clickInput">
              重新上傳照片
            </button>
            <button type="button" class="btn btn-primary" @click="processImage">保存</button>
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
            minContainerWidth: 450,
            minContainerHeight: 480,
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
    closeModal() {
      this.ExistImgEditModal.hide();
    },
    openModal() {
      this.imageSquareCropperModal.show();
    },
    emitOpenUserImgModal(imgUrl) {
      this.tempImgUrl = imgUrl;
      this.ExistImgEditModal.show();
      this.setImgCropper();
    },
    emitCloseUserImgModal() {
      this.ExistImgEditModal.hide();
    },
    setImgCropper() {
      this.getImgBlob();
    },
    emitOpenImageCropper(data) {
      // 檢查有無之前遺留的
      if (this.cropper !== {}) {
        this.cleanImg();
      }
      if (data[2] === 'upLoadSingleImg') {
        this.nowId = '';
      } else {
        const id = Number(data[1]);
        this.nowId = id + 1;
      }
      setTimeout(() => {
        this.putImage(data[0]);
      }, 1500);
    },
  },
  mounted() {
    this.ExistImgEditModal = new Modal(this.$refs.ExistImgEditModal);
    emitter.on('open-ExistImgEditModal', this.emitOpenUserImgModal);
    emitter.on('close-ExistImgEditModal', this.emitCloseUserImgModal);
    emitter.on('open-imageSquareCropper', this.emitOpenImageCropper);
    emitter.on('close-imageSquareCropper', this.closeModal);
    emitter.on('delete-imageSquareCropper', this.cleanImg);
  },
  unmounted() {
    this.ExistImgEditModal.dispose();
    emitter.off('open-ExistImgEditModal', this.emitOpenUserImgModal);
    emitter.off('close-ExistImgEditModal', this.emitCloseUserImgModal);
    emitter.off('close-imageSquareCropper', this.closeModal);
    emitter.off('delete-imageSquareCropper', this.cleanImg);
    emitter.off('open-imageSquareCropper', this.emitOpenImageCropper);
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
