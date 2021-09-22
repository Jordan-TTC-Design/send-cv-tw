<template>
  <div class="container">
    <div
      ref="docModal"
      class="settingAccountModal popModal modal fade"
      tabindex="-1"
      id="docModal"
      aria-hidden="true"
      aria-labelledby="docModalLabel"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div
          class="modal-content"
          v-if="modalAction === 'newCoverLetter' || modalAction === 'editCoverLetter'"
        >
          <div class="popModal__header popModal__header--left">
            <h5 class="popModal__title">
              {{ `${modalAction === 'newCoverLetter' ? '新增求職信' : '編輯求職信'}` }}
            </h5>
            <p class="popModal__header__subTxt">
              請善加利用標籤，系統會自動帶入欲該職位之相關內容。
            </p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <Form ref="editAccountEmail" v-slot="{ errors }" @submit="saveCoverLetterData">
            <div class="modal-body">
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="coverLetterTitle" class="form__label--custom form-label"
                    >求職信名稱</label
                  >
                  <p class="formTag--must">必填</p>
                </div>
                <Field
                  id="coverLetterTitle"
                  ref="coverLetterTitle"
                  name="求職信名稱"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['求職信名稱'] }"
                  placeholder="請輸入求職信名稱"
                  rules="required"
                  v-model="coverLetter.title"
                ></Field>
                <ErrorMessage name="求職信名稱" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox form__infoEditBox mb-0">
                <div class="form__labelBox">
                  <label for="coverLetterContent" class="form__label--custom form-label"
                    >求職信內容</label
                  >
                  <p class="formTag--must">必填</p>
                </div>
                <div class="textarea--tag">
                  <ul class="textarea--tag__tagList">
                    <li><p class="jobTag jobTag--letter me-2">職位標籤</p></li>
                    <li><p class="jobTag jobTag--letter">公司標籤</p></li>
                  </ul>
                  <ckeditor
                    id="coverLetterContent"
                    ref="coverLetterContent "
                    name="求職信內容"
                    :editor="editor"
                    tag-name="textarea"
                    class="form-control textarea--tag__inputBox"
                    v-model="coverLetter.content"
                    :config="editorConfig"
                  ></ckeditor>
                  <Field
                    name="求職信內容"
                    type="text"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['求職信內容'] }"
                    placeholder="請輸入"
                    v-model="coverLetter.content"
                    as="textarea"
                    rules="required"
                    rows="5"
                  >
                  </Field>
                  <ErrorMessage name="求職信內容" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
            </div>
            <div class="popModal__footer">
              <button type="button" class="btn btn-gray-light me-2" data-bs-dismiss="modal">
                取消
              </button>
              <button type="submit" class="btn btn-primary">儲存</button>
            </div>
          </Form>
        </div>
        <div class="modal-content" v-if="modalAction === 'readCoverLetter'">
          <div class="popModal__header popModal__header--left">
            <h5 class="popModal__title">{{ coverLetter.title }}</h5>
            <p class="popModal__header__subTxt">更新時間：2021/09/18</p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="inputReader">
              <label class="inputReader__title">求職信內容</label>
              <div
                class="inputReader__contentBox inputReader__contentBox--minHeight"
                v-html="coverLetter.content"
              ></div>
            </div>
          </div>
          <div class="popModal__footer justify-content-between">
            <button
              type="button"
              class="btn btn-outline-gray-line text-dark me-2"
              @click="deleteCoverLetterData"
            >
              刪除
            </button>
            <button
              type="button"
              class="btn btn-gray-light"
              @click="modalAction = 'editCoverLetter'"
            >
              編輯
            </button>
          </div>
        </div>
        <div class="modal-content" v-if="modalAction === 'newVideo' || modalAction === 'editVideo'">
          <div class="popModal__header popModal__header--left">
            <h5 class="popModal__title">
              {{ `${modalAction === 'newVideo' ? '新增影片' : '編輯影片'}` }}
            </h5>
            <p class="popModal__header__subTxt">
              請善加利用標籤，系統會自動帶入欲該職位之相關內容。
            </p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <Form ref="editAccountEmail" v-slot="{ errors }" @submit="saveVideoData">
            <div class="modal-body">
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="videoTitle" class="form__label--custom form-label">影片名稱</label>
                  <p class="formTag--must">必填</p>
                </div>
                <Field
                  id="videoTitle"
                  ref="videoTitle"
                  name="影片名稱"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['影片名稱'] }"
                  placeholder="請輸入影片名稱"
                  rules="required"
                  v-model="videoContent.title"
                ></Field>
                <ErrorMessage name="影片名稱" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox d-none">
                <div class="form__labelBox">
                  <label for="videoUrl" class="form__label--custom form-label">影片檔案</label>
                  <p class="formTag--must">必填</p>
                </div>
                <div class="docVideo__contentBox">
                  <iframe
                    v-if="videoContent.videoUrl"
                    class="docVideo__contentBox__video"
                    width="480"
                    height="270"
                    src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0"
                  >
                  </iframe>
                </div>
                <Field
                  id="videoUrl"
                  ref="videoUrl"
                  name="影片檔案"
                  type="text"
                  class="form-control mt-2"
                  :class="{ 'is-invalid': errors['影片檔案'] }"
                  placeholder="請輸入影片檔案"
                  rules="required"
                  v-model="videoContent.videoUrl"
                ></Field>
                <ErrorMessage name="影片檔案" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="upLoadSectionImg" class="form__label--custom form-label"
                    >影片封面</label
                  >
                </div>
                <input
                  id="upLoadSectionImg"
                  ref="upLoadSectionImg"
                  name="影片封面"
                  type="file"
                  class="form-control d-none"
                  :class="{ 'is-invalid': errors['影片封面'] }"
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
                    alt="影片封面"
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
                  id="videoImgCover"
                  ref="videoImgCover"
                  name="影片封面"
                  type="text"
                  class="form-control d-none"
                  :class="{ 'is-invalid': errors['影片封面'] }"
                  v-model="videoContent.imgUrl"
                ></Field>
                <ErrorMessage name="影片封面" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox form__infoEditBox">
                <div class="form__labelBox">
                  <label for="videoContent" class="form__label--custom form-label">影片描述</label>
                </div>
                <ckeditor
                  id="videoContent"
                  ref="videoContent"
                  name="影片描述"
                  :editor="editor"
                  tag-name="textarea"
                  v-model="videoContent.content"
                  :config="editorConfigNomal"
                ></ckeditor>
              </div>
            </div>
            <div class="popModal__footer">
              <button type="button" class="btn btn-gray-light me-2" data-bs-dismiss="modal">
                取消
              </button>
              <button type="submit" class="btn btn-primary">儲存</button>
            </div>
          </Form>
        </div>
        <div
          class="modal-content"
          v-if="modalAction === 'newProduct' || modalAction === 'editProduct'"
        >
          <div class="popModal__header popModal__header--left">
            <h5 class="popModal__title">
              {{ `${modalAction === 'newProduct' ? '新增作品' : '編輯作品'}` }}
            </h5>
            <p class="popModal__header__subTxt">
              請善加利用標籤，系統會自動帶入欲該職位之相關內容。
            </p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <Form ref="editProductData" v-slot="{ errors }" @submit="saveProductData">
            <div class="modal-body">
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="productTitle" class="form__label--custom form-label">作品名稱</label>
                  <p class="formTag--must">必填</p>
                </div>
                <Field
                  id="productTitle"
                  ref="productTitle"
                  name="作品名稱"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['作品名稱'] }"
                  placeholder="請輸入作品名稱"
                  rules="required"
                  v-model="productData.title"
                ></Field>
                <ErrorMessage name="作品名稱" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="upLoadSectionImg" class="form__label--custom form-label"
                    >作品圖片</label
                  >
                </div>
                <input
                  id="upLoadSectionImg"
                  ref="upLoadSectionImg"
                  name="作品圖片"
                  type="file"
                  class="form-control d-none"
                  :class="{ 'is-invalid': errors['作品圖片'] }"
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
                    alt="作品圖片"
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
                  id="productImgCover"
                  ref="productImgCover"
                  name="作品圖片"
                  type="text"
                  class="form-control d-none"
                  :class="{ 'is-invalid': errors['作品圖片'] }"
                  v-model="productData.imgUrl"
                ></Field>
                <ErrorMessage name="作品圖片" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox form__infoEditBox">
                <div class="form__labelBox">
                  <label for="productContent" class="form__label--custom form-label"
                    >作品描述</label
                  >
                </div>
                <ckeditor
                  id="productContent"
                  ref="productContent"
                  name="作品描述"
                  :editor="editor"
                  tag-name="textarea"
                  v-model="productData.content"
                  :config="editorConfigNomal"
                ></ckeditor>
              </div>
            </div>
            <div class="popModal__footer">
              <button type="button" class="btn btn-gray-light me-2" data-bs-dismiss="modal">
                取消
              </button>
              <button type="submit" class="btn btn-primary">儲存</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
  <ImageCropper @emit-send-img-data="getImg" />
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageCropper from '@/components/helpers/ImageCropperModal.vue';

import emitter from '@/methods/emitter';

export default {
  components: { ImageCropper },
  emits: ['return-user-data'],
  props: ['userData'],
  data() {
    return {
      date: new Date(),
      modalAction: '',
      modal: {},
      coverLetterIndex: null,
      formData: {},
      coverLetter: {
        title: '',
        content: '',
        time: null,
      },
      tempImg: {
        src: '',
        isUpDated: false,
      },
      videoContent: {
        title: '',
        videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY?controls=0',
        time: null,
        introSelect: false,
        content: '',
        imgUrl: '',
      },
      productData: {
        title: '',
        content: '',
        imgUrl: '',
        time: null,
      },
      // 圖片套件
      cropper: {},
      // 編輯器套件
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [],
        language: 'zh',
        placeholder: '請輸入...',
      },
      editorConfigNomal: {
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
    userData: {
      deep: true,
      handler(newValue) {
        this.user = JSON.parse(JSON.stringify(newValue));
      },
    },
  },
  methods: {
    saveVideoData() {
      console.log(this.modalAction);
      if (this.modalAction === 'newVideo') {
        if (this.user.docData.videoList) {
          this.videoContent.time = `${Math.floor(Date.now() / 1000)}`;
          this.user.docData.videoList.push(this.videoContent);
        } else if (!this.user.docData.videoList) {
          this.user.docData.videoList = [
            {
              title: this.videoContent.title,
              videoUrl: 'https://www.youtube.com/watch?v=zmhvEEonu-c',
              imgUrl: this.videoContent.imgUrl,
              content: this.videoContent.content,
              time: `${Math.floor(Date.now() / 1000)}`,
              introSelect: false,
            },
          ];
        }
      }
      this.returnUserData();
    },
    saveProductData() {
      console.log(this.modalAction);
      if (this.modalAction === 'newProduct') {
        if (this.user.docData.productList) {
          this.productData.time = `${Math.floor(Date.now() / 1000)}`;
          this.user.docData.productList.push(this.productData);
        } else if (!this.user.docData.productList) {
          this.user.docData.productList = [
            {
              title: this.productData.title,
              imgUrl: this.productData.imgUrl,
              content: this.productData.content,
              time: `${Math.floor(Date.now() / 1000)}`,
            },
          ];
        }
      }
      this.returnUserData();
    },
    deleteCoverLetterData() {
      this.user.docData.coverLetterList.splice(this.coverLetterIndex, 1);
      this.$emit('openSecondAsk', this.coverLetter);
      this.modal.hide();
    },
    saveCoverLetterData() {
      console.log(this.modalAction);
      const obj = {
        title: this.coverLetter.title,
        content: this.coverLetter.content,
        time: `${Math.floor(Date.now() / 1000)}`,
      };
      if (this.modalAction === 'newCoverLetter') {
        this.user.docData.coverLetterList.push(obj);
      } else if (this.modalAction === 'editCoverLetter') {
        this.user.docData.coverLetterList.splice(this.coverLetterIndex, 1, obj);
      }
      this.returnUserData();
    },
    cleanData() {
      this.coverLetter = {
        index: null,
        title: '',
        content: '',
      };
      this.videoContent = {
        title: '',
        videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY?controls=0',
        time: null,
        introSelect: false,
        content: '',
        imgUrl: '',
      };
    },
    openModal(obj) {
      this.modalAction = obj.action;
      if (obj.action === 'readCoverLetter') {
        this.coverLetterIndex = obj.index;
        this.coverLetter = this.user.docData.coverLetterList[this.coverLetterIndex];
      }
      console.log(this.modalAction);
      console.log(this.coverLetter);
      setTimeout(() => {
        this.modal.show();
      }, 100);
    },
    closeModal() {
      this.modal.hide();
      this.cleanData();
    },
    returnUserData() {
      this.closeModal();
      this.$emit('return-user-data', this.user);
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
            this.videoContent.imgUrl = res.data.data.link;
            this.productData.imgUrl = res.data.data.link;
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
    this.user = this.userData;
  },
  mounted() {
    this.modal = new Modal(this.$refs.docModal);
    emitter.on('open-doc-modal', this.openModal);
    emitter.on('close-doc-modal', this.closeModal);
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-doc-modal', this.openModal);
    emitter.off('close-doc-modal', this.closeModal);
  },
};
</script>

<style lang="scss"></style>
