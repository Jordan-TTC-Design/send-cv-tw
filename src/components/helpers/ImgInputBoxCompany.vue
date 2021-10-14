<template>
  <div class="form__inputBox">
    <div class="form__labelBox">
      <label for="imageUrl" class="form__label--custom form-label" v-if="inputAction === 'muti'"
        >第 {{ imgNumber + 1 }} 張公司照片</label
      >
      <label for="imageUrl" class="form__label--custom form-label" v-if="inputAction === 'single'"
        >公司圖片</label
      >
      <label
        for="imageUrl"
        class="form__label--custom form-label"
        v-if="dataName === 'companyLogoUrl'"
        >公司logo</label
      >
      <p class="formTag--must company" v-if="mustUpload">必填</p>
    </div>
    <input
      :id="`sendFormInfoImgs${imgNumber}`"
      :name="`職位圖片${imgNumber}`"
      type="file"
      class="form-control d-none"
      placeholder="請選擇照片上傳"
      :ref="`sendFormInfoImgs`"
      :data-id="imgNumber"
      data-input="upLoadMutiImg"
      @change="loadingImg($event)"
      accept="image/*"
    />
    <div class="cropImgBox">
      <button
        type="button"
        class="iconBox btn"
        @click="cleanImgInputData"
        v-if="imgData.url !== ''"
      >
        <div class="iconBox__innerBox">
          <i class="jobIcon bi bi-x-lg"></i>
        </div>
      </button>
      <div class="cropImgBox__cover" v-if="imgData.url !== ''"></div>
      <p class="subTxt" v-if="imgData.url === ''">(上限 5 mb )</p>
      <img
        v-if="imgData.url !== ''"
        class="cropImg"
        :ref="`cropImg${imgNumber}`"
        :src="imgData.url"
        :alt="`職位圖片${imgNumber}`"
      />
    </div>
    <div class="d-flex justify-content-end">
      <button
        type="button"
        :data-id="imgNumber"
        class="btn"
        @click="clickImgInput($event, imgNumber)"
        data-input="upLoadMutiImg"
        v-if="imgData.url === ''"
        :class="{
          'btn-gray-light': imgData.url !== '',
          'btn-outline-companyColor': imgData.url === '',
        }"
      >
        選擇圖片
      </button>
      <button
        type="button"
        class="btn"
        @click="updateImg($event)"
        data-input="upLoadMutiImg"
        :data-id="imgNumber"
        v-if="imgData.url !== ''"
        :class="{
          'btn-gray-light text-secondary': !!imgData.isUpDated || imgData.url === '',
          'btn-outline-companyColor': imgData.url !== '',
        }"
        :disabled="!!imgData.isUpDated || imgData.url === ''"
      >
        {{ imgData.isUpDated ? '已成功上傳' : '上傳至資料庫' }}
      </button>
    </div>
  </div>
  <ImageCropper @send-img-data="getImg" :imgNumber="imgNumber" :dataName="dataName" />
</template>

<script>
import emitter from '@/methods/emitter';
import ImageCropper from '@/components/helpers/ImageCropper.vue';

export default {
  props: ['imgNumber', 'mustUpload', 'inputAction', 'dataName', 'tempImgUrl'],
  emits: ['send-img-to-page'],
  components: { ImageCropper },
  data() {
    return {
      // 圖片使用
      imgData: {
        src: '',
        isUpDated: true,
      },
      imgUrl: '',
      cropperAction: 'single',
    };
  },
  watch: {
    temFilterData: {
      deep: true,
      handler(newValue) {
        this.filterData = newValue;
      },
    },
  },
  methods: {
    //  click file btn
    clickImgInput() {
      const item = 'sendFormInfoImgs';
      this.$refs[item].click();
    },
    // get img to cropper modal
    loadingImg(e) {
      const imgFile = e.target.files[0];
      console.log(imgFile);
      emitter.emit(`open-img-cropper-modal--${this.dataName}--${this.imgNumber}`, imgFile);
    },
    // get img data from cropper modal
    getImg(data) {
      this.imgData.url = data;
      this.imgData.isUpDated = false;
    },
    // upload img data to imgur api
    updateImg() {
      emitter.emit('spinner-open');
      const item = this.imgData.url;
      const base64String = item.replace('data:image/jpeg;base64,', '');
      this.$http({
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        data: {
          image: base64String,
          type: 'base64',
        },
        headers: {
          Authorization: 'Client-ID ef6e862acf052df',
        },
      })
        .then((res) => {
          this.imgData.isUpDated = true;
          this.imgUrl = res.data.data.link;
          this.imgData.url = res.data.data.link;
          this.sendbackImg();
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // send back to form compo
    sendbackImg() {
      const obj = {
        url: this.imgUrl,
        dataName: this.dataName,
      };
      if (this.inputAction === 'muti') {
        obj.index = this.imgNumber;
      }
      obj.key = `${Math.floor(Date.now() / 1000)}`;
      this.$emit('send-img-to-page', obj);
    },
    // clean all img data
    cleanImgInputData() {
      this.imgData = { url: '', isUpDated: false };
      this.imgUrl = '';
    },
  },
  mounted() {
    this.imgData.url = this.tempImgUrl;
    console.log(this.imgData.url);
    console.log(this.inputAction);
  },
};
</script>
<style></style>
