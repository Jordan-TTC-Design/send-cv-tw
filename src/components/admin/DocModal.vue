<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div
          ref="docModal"
          class="settingAccountModal popModal modal fade"
          tabindex="-1"
          id="docModal"
          aria-hidden="true"
          aria-labelledby="docModalLabel"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div v-if="modalAction === 'newCoverLetter'">
                <div class="popModal__header popModal__header--left">
                  <h5 class="popModal__title">新增求職信</h5>
                  <p class="popModal__header__subTxt">請輸入新的帳號，並輸入目前的密碼進行驗證。</p>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <Form ref="editAccountEmail" v-slot="{ errors }">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="accountDataEmail" class="form__label--custom form-label"
                          >求職信名稱</label
                        >
                        <p class="formTag--must">必填</p>
                      </div>
                      <Field
                        id="accountDataEmail"
                        ref="accountDataEmail"
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
                    <div class="form__inputBox mb-0">
                      <div class="form__labelBox">
                        <label for="accountDataPassword" class="form__label--custom form-label"
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
                          id="sendFormInfoOtherApplyInfo"
                          ref="sendFormInfoOtherApplyInfo "
                          name="申請備註"
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
                  </Form>
                </div>
                <div class="popModal__footer">
                  <button type="button" class="btn btn-gray-light me-2" data-bs-dismiss="modal">
                    取消
                  </button>
                  <button type="button" class="btn btn-primary">保存</button>
                </div>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import webData from '@/methods/webData';
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      modalAction: '',
      modal: {},
      accountData: {
        email: '',
        password: '',
        phone: '',
        socialMedia: [],
      },
      newPassword: {
        password: '',
        again: '',
      },
      coverLetter: {
        title: '',
        content: '',
      },
      formData: {},
      tempCoverLetter: {
        title: '',
        content: '',
      },
      // 編輯器套件
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [],
        language: 'zh',
        placeholder: '請輸入...',
      },
    };
  },
  methods: {
    cleanData() {
      this.accountData = {
        email: '',
        password: '',
        phone: '',
        socialMedia: [],
      };
    },
    updateData() {
      this.$emit('update-setting-account-Data', this.accountData);
    },
    openModal(action) {
      this.modalAction = action;
      console.log(this.modalAction);
      setTimeout(() => {
        this.modal.show();
      }, 100);
    },
    closeModal() {
      this.modal.hide();
      this.cleanData();
      this.formData = webData;
    },
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
