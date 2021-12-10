<template>
  <div class="cvExpSection" v-if="!expSectionData.editMode">
    <div class="cvExpSection__titleBox mb-4">
      <p class="cvExpSection__title">{{ expSectionData.title }}</p>
      <div class="dropdown">
        <button
          class="btn position-relative"
          type="button"
          :id="`dropdownMenuButton--cvExpData--${formIndex}`"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="jobIcon bi bi-three-dots"></i>
        </button>
        <ul
          :ref="`dropDownMenu--${formIndex}`"
          class="dropDownMenu dropdown-menu"
          :aria-labelledby="`dropdownMenuButton--cvExpData--${formIndex}`"
        >
          <li class="dropDownMenu__item dropdown-item" @click="editFrom">編輯</li>
          <li class="dropDownMenu__item dropdown-item">調整排序</li>
          <li class="dropDownMenu__item dropdown-item" @click="deleteData">刪除</li>
        </ul>
      </div>
    </div>
    <div
      class="cvExpSection__content"
      :class="{
        'cvExpSection--largeImg':
          expSectionData.editorStyle === 'largeImg' || expSectionData.editorStyle === 'onlyTxt',
      }"
    >
      <div class="cvExpSection__content__txt" v-html="expSectionData.content"></div>
      <div class="cvExpSection__content__imgBox" v-if="expSectionData.editorStyle !== 'onlyTxt'">
        <img :src="expSectionData.imgUrl" :alt="`${expSectionData.title}圖片`" />
      </div>
    </div>
  </div>
  <Form
    v-slot="{ errors }"
    @submit="saveData"
    class="cvExpSection--edit"
    v-if="expSectionData.editMode"
  >
    <div v-if="expSectionData.editorStyle === '' && expSectionData.editMode">
      <div class="form__input">
        <div class="form__labelBox">
          <label for="editorStyle" class="labelBox__label form-label">選擇模板樣式</label>
        </div>
        <ul class="editorSelectBoxList">
          <li class="editorSelectBox me-2" @click="tempalteStyle = 'onlyTxt'">
            <div class="editorSelectBox__title">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="editorStyle--onlyTxt"
                  value="onlyTxt"
                  name="模板樣式"
                  v-model="tempalteStyle"
                />
                <label class="form-check-label" for="editorStyle--onlyTxt"> 文字模板 </label>
              </div>
            </div>
            <div class="editorSelectBox__imgBox"></div>
          </li>
          <li class="editorSelectBox me-2" @click="tempalteStyle = 'smallImg'">
            <div class="editorSelectBox__title">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="editorStyle--smallImg"
                  value="smallImg"
                  name="模板樣式"
                  v-model="tempalteStyle"
                />
                <label class="form-check-label" for="editorStyle--smallImg"> 小圖模版 </label>
              </div>
            </div>
            <div class="editorSelectBox__imgBox"></div>
          </li>
          <li class="editorSelectBox" @click="tempalteStyle = 'largeImg'">
            <div class="editorSelectBox__title">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="editorStyle--largeImg"
                  value="largeImg"
                  name="模板樣式"
                  v-model="tempalteStyle"
                />
                <label class="form-check-label" for="editorStyle--largeImg"> 大圖模版 </label>
              </div>
            </div>
            <div class="editorSelectBox__imgBox"></div>
          </li>
        </ul>
      </div>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-gray-light me-2" @click="closeForm">取消</button>
        <button
          type="button"
          class="btn btn-primary"
          @click="expSectionData.editorStyle = tempalteStyle"
        >
          確定
        </button>
      </div>
    </div>
    <div class="row" v-if="expSectionData.editorStyle !== '' && expSectionData.editMode">
      <!-- 標題 -->
      <div class="col-lg-6 col-12">
        <div class="form__input">
          <div class="form__labelBox">
            <label for="expDataTitle" class="labelBox__label form-label">標題</label>
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
    </div>
    <div
      class="row"
      v-if="expSectionData.editorStyle !== ''"
      :class="{ 'flex-column-reverse': expSectionData.editorStyle === 'largeImg' }"
    >
      <!-- 內容 -->
      <div
        class="col-md-8 col-12"
        :class="{
          'col-md-12':
            expSectionData.editorStyle === 'largeImg' || expSectionData.editorStyle === 'onlyTxt',
        }"
      >
        <div
          class="form__input form__infoEditBox"
          :class="{ 'form__infoEditBox--sm': expSectionData.editorStyle === 'largeImg' }"
        >
          <div class="form__labelBox">
            <label for="expSectionContent" class="labelBox__label form-label">內容</label>
          </div>
          <ckeditor
            id="expSectionContent"
            ref="expSectionContent"
            name="內容"
            :editor="editor"
            tag-name="textarea"
            v-model="expSectionData.content"
            :config="editorConfig"
          ></ckeditor>
          <Field
            name="內容"
            type="text"
            class="form-control d-none"
            :class="{ 'is-invalid': errors['內容'] }"
            placeholder="請輸入"
            v-model="expSectionData.content"
            as="textarea"
            rules="required"
          >
          </Field>
          <ErrorMessage name="內容" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
      <div
        class="col-md-4 col-12"
        :class="{ 'col-md-12': expSectionData.editorStyle === 'largeImg' }"
        v-if="expSectionData.editorStyle !== 'onlyTxt'"
      >
        <div class="form__input">
          <div class="form__labelBox">
            <label for="upLoadSectionImg" class="labelBox__label form-label">圖片</label>
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
          <div
            class="cropImgBox"
            :class="{ 'cropImgBox--lg': expSectionData.editorStyle === 'largeImg' }"
          >
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
    </div>
    <div
      class="d-flex justify-content-between"
      v-if="expSectionData.editorStyle !== '' && expSectionData.editMode"
    >
      <button
        type="button"
        class="btn btn-outline-gray-line text-dark"
        @click="expSectionData.editorStyle = ''"
      >
        重新選擇模板樣式
      </button>
      <div class="d-flex">
        <button type="button" class="btn btn-gray-light me-2" @click="closeForm">取消</button>
        <button type="submit" class="btn btn-primary">保存</button>
      </div>
    </div>
  </Form>
  <ImageCropper @emit-send-img-data="getImg" v-if="callImgCropper" />
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import webData from '@/methods/webData';
import ImageCropper from '@/components/helpers/ImageCropperModal.vue';
import emitter from '@/methods/emitter';
import database from '@/methods/firebaseinit';

export default {
  components: { ImageCropper },
  emits: ['returnExpSectionData', 'reuturnCloseForm', 'deleteData'],
  props: ['tempExpSectionData', 'formNumber', 'listNumber'],
  data() {
    return {
      expSectionData: {
        title: '',
        content: '',
        imgUrl: '',
        editorStyle: '',
        editMode: false,
      },
      tempImg: {
        src: '',
        isUpDated: false,
      },
      formIndex: null,
      listIndex: null,
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
      // 圖片套件
      cropper: {},
      tempalteStyle: '',
      nowEdit: '',
      callImgCropper: false,
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
    listNumber: {
      deep: true,
      handler(newValue) {
        this.listIndex = newValue;
      },
    },
  },
  methods: {
    saveData() {
      this.closeForm();
      const obj = {
        data: this.expSectionData,
        index: this.formIndex,
        listIndex: this.listIndex,
      };
      this.$emit('returnExpSectionData', obj);
    },
    editFrom() {
      this.expSectionData.editMode = true;
      if (this.expSectionData.imgUrl !== '') {
        this.tempImg.src = this.expSectionData.imgUrl;
        this.tempImg.isUpDated = true;
      }
    },
    closeForm() {
      this.expSectionData.editMode = false;
      this.nowEdit = '';
    },
    // 上傳第一步：觸發圖片input
    clickInput(e) {
      if (e.target.dataset.input === 'upLoadSingleImg') {
        this.$refs.upLoadSectionImg.click();
        this.uploadImgState = 'upLoadSingleImg';
      }
      this.callImgCropper = true;
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
      this.callImgCropper = false;
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
    // 保存資料
    saveSectionData() {
      console.log(this.expSectionData);
      const cvRef = database.ref(`cvList/${this.formIndex}`);
      cvRef.set(this.expSectionData);
      this.nowEdit = '';
    },
    deleteData() {
      const obj = {
        data: this.expSectionData,
        index: this.formIndex,
        listIndex: this.listIndex,
      };
      this.$emit('deleteData', obj);
    },
  },
  created() {
    this.formData = webData;
    this.expSectionData = JSON.parse(JSON.stringify(this.tempExpSectionData));
    this.formIndex = this.formNumber;
    this.listIndex = this.listNumber;
  },
};
</script>

<style lang="scss"></style>
