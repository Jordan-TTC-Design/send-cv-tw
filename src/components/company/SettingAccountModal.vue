<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div
          ref="settingAccountModal"
          class="settingAccountModal popModal popModal--sm modal fade"
          tabindex="-1"
          id="settingAccountModal"
          aria-hidden="true"
          aria-labelledby="settingAccountModalLabel"
        >
          <div class="modal-dialog modal modal-dialog-centered">
            <div class="modal-content">
              <div v-if="modalAction === '變更帳號'">
                <div class="popModal__header popModal__header--center">
                  <h5 class="popModal__title">變更帳號</h5>
                  <p class="popModal__header__subTxt">請輸入新的帳號，並輸入目前的密碼進行驗證。</p>
                  <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <Form ref="editAccountEmail" v-slot="{ errors }" @submit="saveEmail">
                  <div class="popModal__body">
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="accountDataEmail" class="labelBox__label form-label"
                          >新帳號</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="accountDataEmail"
                        ref="accountDataEmail"
                        name="新帳號"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors['新帳號'] }"
                        placeholder="請輸入新帳號"
                        rules="required"
                        v-model="tempAccountData.email"
                      ></Field>
                      <ErrorMessage name="新帳號" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="form__input mb-0">
                      <div class="form__labelBox">
                        <label for="accountDataPassword" class="labelBox__label form-label"
                          >登入密碼</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="accountDataPassword"
                        ref="accountDataPassword"
                        name="密碼"
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': errors['密碼'] }"
                        placeholder="密碼"
                        rules="required"
                        minlength="4"
                        maxlength="8"
                        size="8"
                        v-model="tempAccountData.password"
                      ></Field>
                      <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="popModal__footer">
                    <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                      取消
                    </button>
                    <button type="submit" class="btn btn-companyColor text-light">保存</button>
                  </div>
                </Form>
              </div>
              <div v-if="modalAction === '變更電話'">
                <div class="popModal__header popModal__header--center">
                  <h5 class="popModal__title">變更電話</h5>
                  <p class="popModal__header__subTxt">
                    您將收到一組認證代碼，請於收到驗證碼後5分鐘內進行驗證。
                  </p>
                  <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <Form ref="editAccountPhone" v-slot="{ errors }" @submit="savePhone">
                  <div class="popModal__body">
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="accountDataPhone" class="labelBox__label form-label"
                          >新電話號碼</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="accountDataPhone"
                        ref="accountDataPhone"
                        name="電話號碼"
                        type="phone"
                        class="form-control"
                        :class="{ 'is-invalid': errors['電話號碼'] }"
                        placeholder="請輸入電話號碼"
                        rules="required"
                        v-model="tempAccountData.phone"
                      ></Field>
                      <ErrorMessage name="電話號碼" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="form__input d-flex flex-column mb-0">
                      <div class="form__labelBox">
                        <label for="accountDataPassword" class="labelBox__label form-label"
                          >登入密碼</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="accountDataPassword"
                        ref="accountDataPassword"
                        name="密碼"
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': errors['密碼'] }"
                        placeholder="密碼"
                        rules="required"
                        minlength="4"
                        maxlength="8"
                        size="8"
                        v-model="tempAccountData.password"
                      ></Field>
                      <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="popModal__footer">
                    <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                      取消
                    </button>
                    <button type="submit" class="btn btn-companyColor text-light">保存</button>
                  </div>
                </Form>
              </div>
              <div v-if="modalAction === '變更密碼'">
                <div class="popModal__header popModal__header--center">
                  <h5 class="popModal__title">變更密碼</h5>
                  <p class="popModal__header__subTxt">
                    可以混合使用英文字母、數字和符號；包含小寫和大寫拉丁字元；長度至少 8 個字元。
                  </p>
                  <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <Form ref="editAccountPhone" v-slot="{ errors }" @submit="savePassword">
                  <div class="popModal__body">
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label
                          for="accountDataCurrentPassword"
                          class="labelBox__label form-label"
                          >目前密碼</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="accountDataCurrentPassword"
                        ref="accountDataCurrentPassword"
                        name="目前密碼"
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': errors['目前密碼'] }"
                        placeholder="請輸入目前密碼"
                        rules="required"
                        minlength="4"
                        maxlength="8"
                        size="8"
                        v-model="tempAccountData.newPassword.old"
                      ></Field>
                      <ErrorMessage name="目前密碼" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="accountDataNewPassword" class="labelBox__label form-label"
                          >新密碼</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="accountDataNewPassword"
                        ref="accountDataNewPassword"
                        name="新密碼"
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': errors['新密碼'] }"
                        placeholder="新密碼"
                        rules="required"
                        minlength="4"
                        maxlength="8"
                        size="8"
                        v-model="tempAccountData.newPassword.password"
                      ></Field>
                      <ErrorMessage name="新密碼" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="form__input mb-0">
                      <div class="form__labelBox">
                        <label for="accountDataAgainPassword" class="labelBox__label form-label"
                          >確認密碼</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="accountDataAgainPassword"
                        ref="accountDataAgainPassword"
                        name="確認密碼"
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': errors['確認密碼'] }"
                        placeholder="請重複輸入"
                        rules="required"
                        minlength="4"
                        maxlength="8"
                        size="8"
                        v-model="tempAccountData.newPassword.again"
                      ></Field>
                      <ErrorMessage name="確認密碼" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="popModal__footer">
                    <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                      取消
                    </button>
                    <button type="submit" class="btn btn-companyColor text-light">保存</button>
                  </div>
                </Form>
              </div>
              <div v-if="modalAction === '刪除帳號'">
                <div class="popModal__header popModal__header--center">
                  <h5 class="popModal__title">刪除 SendCV 帳號</h5>
                  <p class="popModal__header__subTxt">
                    想要刪除您的帳號嗎？請先輸入您的帳號及密碼，讓我們確認是您本人。
                  </p>
                  <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <Form ref="deleteAccount" v-slot="{ errors }" @submit="deleteAccount">
                  <div class="popModal__body">
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="accountDataEmail" class="labelBox__label form-label"
                          >帳號</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="accountDataEmail"
                        ref="accountDataEmail"
                        name="帳號"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors['帳號'] }"
                        placeholder="請輸入帳號"
                        rules="required"
                        v-model="accountData.email"
                      ></Field>
                      <ErrorMessage name="帳號" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="form__input mb-0">
                      <div class="form__labelBox">
                        <label for="accountDataPassword" class="labelBox__label form-label"
                          >密碼</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="accountDataPassword"
                        ref="accountDataPassword"
                        name="密碼"
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': errors['密碼'] }"
                        placeholder="密碼"
                        rules="required"
                        minlength="4"
                        maxlength="8"
                        size="8"
                        v-model="accountData.password"
                      ></Field>
                      <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="popModal__footer">
                    <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                      取消
                    </button>
                    <button type="submit" class="btn btn-primary">確定</button>
                  </div>
                </Form>
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
import webData from '@/methods/webData';
import emitter from '@/methods/emitter';

export default {
  emits: ['return-user-data'],
  props: ['userData'],
  data() {
    return {
      modalAction: '',
      modal: {},
      user: {},
      tempAccountData: {},
      formData: {},
    };
  },
  watch: {
    userData: {
      deep: true,
      handler(newValue) {
        this.user = newValue;
      },
    },
  },
  methods: {
    defaultData() {
      this.tempAccountData = {
        email: '',
        password: '',
        phone: '',
        newPassword: {
          old: '',
          password: '',
          again: '',
        },
      };
    },
    openModal(action) {
      this.modalAction = action;
      setTimeout(() => {
        this.modal.show();
      }, 100);
    },
    closeModal() {
      this.modal.hide();
      this.defaultData();
    },
    returnUserData() {
      this.closeModal();
      this.$emit('return-user-data', this.user);
    },
    saveEmail() {
      this.user.email = this.tempAccountData.email;
      this.returnUserData();
    },
    savePhone() {
      this.user.phone = this.tempAccountData.phone;
      this.returnUserData();
    },
    savePassword() {
      if (this.tempAccountData.newPassword.password === this.tempAccountData.newPassword.again) {
        this.user.password = this.tempAccountData.newPassword.password;
        this.returnUserData();
      }
    },
  },
  created() {
    this.formData = webData;
    this.user = this.userData;
    this.defaultData();
  },
  mounted() {
    this.modal = new Modal(this.$refs.settingAccountModal);
    emitter.on('open-setting-account-company-modal', this.openModal);
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-setting-account-company-modal', this.openModal);
  },
};
</script>

<style lang="scss"></style>
