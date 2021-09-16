<template>
  <Form
    ref="editAccountEducationData"
    v-slot="{ errors }"
    @submit="saveEducationData('new')"
    class="pt-4"
  >
    <div class="row">
      <!-- 標題 -->
      <div class="col-lg-6 col-12">
        <div class="form__inputBox">
          <div class="form__labelBox">
            <label for="expDataTitle" class="form__label--custom form-label">標題</label>
            <p class="formTag--must">必填</p>
          </div>
          <Field
            id="expDataTitle"
            ref="expDataTitle"
            name="標題"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['標題'] }"
            placeholder="請輸入標題"
            rules="required"
            v-model="expSectionData.title"
          ></Field>
          <ErrorMessage name="標題" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
      <!-- 內容 -->
      <div class="col-8">
        <div class="form__inputBox form__infoEditBox">
          <div class="form__labelBox">
            <label for="workExpDataContent" class="form__label--custom form-label"
              >內容</label
            >
          </div>
          <ckeditor
            id="workExpDataContent"
            ref="workExpDataContent"
            name="在學表現＆成就"
            :editor="editor"
            tag-name="textarea"
            v-model="tempEducationExp.educationContent"
            :config="editorConfig"
          ></ckeditor>
          <Field
            name="在學表現＆成就"
            type="text"
            class="form-control d-none"
            :class="{ 'is-invalid': errors['在學表現＆成就'] }"
            placeholder="請輸入"
            v-model="tempEducationExp.educationContent"
            as="textarea"
            rules="required"
          >
          </Field>
          <ErrorMessage name="在學表現＆成就" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
      <div class="col-md-4 col-12">
        <div class="form__inputBox">
          <div class="form__labelBox">
            <label for="upLoadSectionImg" class="form__label--custom form-label">圖片</label>
          </div>
          <input
            id="upLoadSectionImg"
            ref="upLoadSectionImg"
            name="圖片"
            type="file"
            class="form-control d-none"
            :class="{ 'is-invalid': errors['圖片'] }"
            rules="required"
            data-input="upLoadSingleImg"
            accept="image/*"
            @change="loadingImg($event)"
          />
          <div class="cropImgBox">
            <div class="cropImgBox__cover" v-if="tempImg.src"></div>
            <p class="subTxt" v-if="tempImg.src == ''">(上限 5 mb )</p>
            <img
              v-if="tempImg.src !== ''"
              class="cropImg h-100"
              ref="cropImgJob"
              :src="tempImg.src"
              alt="圖片"
            />
          </div>
          <div class="d-flex justify-content-between">
            <button
              type="button"
              class="btn"
              @click="clickInput($event)"
              data-input="upLoadSingleImg"
              :class="{
                'btn-gray-light': tempImg.src !== '',
                'btn-outline-primary': tempImg.src == '',
              }"
            >
              {{ tempImg.src != '' ? '重選' : '選擇圖片' }}
            </button>
            <button
              type="button"
              class="btn"
              @click="updateImg($event)"
              data-input="upLoadSingleImg"
              :class="{
                'btn-gray-light': !!tempImg.isUpDated || tempImg.src == '',
                'btn-outline-primary': tempImg.src !== '',
              }"
              :disabled="!!tempImg.isUpDated || tempImg.src == ''"
            >
              {{ tempImg.isUpDated ? '已上傳' : '上傳' }}
            </button>
          </div>
          <Field
            id="sendFormInfoJobImageCheck"
            ref="sendFormInfoJobImageCheck"
            name="圖片"
            type="text"
            class="form-control d-none"
            :class="{ 'is-invalid': errors['圖片'] }"
            v-model="expSectionData.imgUrl"
          ></Field>
          <ErrorMessage name="圖片" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
      <div class="col-12 d-flex justify-content-end">
        <button type="button" class="btn btn-gray-light me-2" @click="closeForm">取消</button>
        <button type="submit" class="btn btn-primary">保存</button>
      </div>
    </div>
  </Form>
  <ImageCropper @emit-send-img-data="getImg" />
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import webData from '@/methods/webData';
import ImageCropper from '@/components/helpers/ImageCropperModal.vue';
import emitter from '@/methods/emitter';

export default {
  components: { ImageCropper },
  emits: ['returnExpSectionData', 'reuturnCloseForm'],
  props: ['tempExpSectionData', 'formNumber'],
  data() {
    return {
      expSectionData: {
        title: '',
        content: '',
        imgUrl: 'https://i.imgur.com/ctKogiV.jpg',
      },
      tempImg: {
        src: 'https://i.imgur.com/ctKogiV.jpg',
        isUpDated: true,
      },
      formIndex: null,
      formData: {},
      // 編輯器套件
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link'],
        language: 'zh',
        placeholder: '請輸入...',
        heading: {
          // 設定 Heading 內的樣式，可新增多個
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h2',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
            },
            {
              model: 'heading2',
              view: 'h3',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
          ],
        },
      },
    };
  },
  watch: {
    tempExpSectionData: {
      deep: true,
      handler(newValue) {
        this.expSectionData = JSON.parse(JSON.stringify(newValue));
      },
    },
    formNumber: {
      deep: true,
      handler(newValue) {
        this.formIndex = newValue;
      },
    },
    // 圖片套件
    cropper: {},
  },
  methods: {
    saveExpSectionData() {
      const obj = {
        data: this.expSectionData,
        num: this.formIndex,
      };
      this.$emit('returnExpSectionData', obj);
    },
    closeForm() {
      this.$emit('reuturnCloseForm', this.formIndex);
    },

    // 上傳第一步：觸發圖片input
    clickInput(e) {
      if (e.target.dataset.input === 'upLoadSingleImg') {
        this.$refs.upLoadSectionImg.click();
        this.uploadImgState = 'upLoadSingleImg';
      }
    },
    // 上傳第二步：取得圖片傳給modal
    loadingImg(e) {
      const nowId = '';
      emitter.emit('open-imageCropper', [e.target.files[0], nowId]);
    },
    // 上傳第三步：從modal抓回圖片
    getImg(data) {
      if (this.uploadImgState === 'upLoadSingleImg') {
        this.tempImg.src = data;
      }
    },
    // 上傳第四步：上傳圖片
    updateImg(e) {
      emitter.emit('spinner-open');
      this.uploadImgState = e.target.dataset.input;
      let item = null;
      if (this.uploadImgState === 'upLoadSingleImg') {
        item = this.tempImg.src;
      }
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
          if (this.uploadImgState === 'upLoadSingleImg') {
            this.tempImg.isUpDated = true;
            this.expSectionData.imgUrl = res.data.data.link;
            console.log(this.expSectionData.imgUrl);
          }
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
  },
  created() {
    this.formData = webData;
    this.tempEducationExp = JSON.parse(JSON.stringify(this.tempExpSectionData));
    this.formIndex = this.formNumber;
  },
};
</script>

<style lang="scss"></style>
