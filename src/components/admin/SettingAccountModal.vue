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
                <div class="modal-body">
                  <Form ref="editAccountEmail" v-slot="{ errors }">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="accountDataEmail" class="form__label--custom form-label"
                          >新帳號</label
                        >
                        <p class="formTag--must">必填</p>
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
                    <div class="form__inputBox mb-0">
                      <div class="form__labelBox">
                        <label for="accountDataPassword" class="form__label--custom form-label"
                          >登入密碼</label
                        >
                        <p class="formTag--must">必填</p>
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
                  </Form>
                </div>
                <div class="popModal__footer">
                  <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                    取消
                  </button>
                  <button type="button" class="btn btn-primary" @click="saveEmail">保存</button>
                </div>
              </div>
              <div v-if="modalAction === '變更電話'">
                <div class="popModal__header popModal__header--center">
                  <h5 class="popModal__title">變更電話</h5>
                  <p class="popModal__header__subTxt">
                    您將收到一組認證代碼，請於收到驗證碼後5分鐘內進行驗證。
                  </p>
                  <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                  <Form ref="editAccountPhone" v-slot="{ errors }">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="accountDataPhone" class="form__label--custom form-label"
                          >新電話號碼</label
                        >
                        <p class="formTag--must">必填</p>
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
                    <div class="form__inputBox d-flex flex-column mb-0">
                      <div class="form__labelBox">
                        <label for="accountDataPassword" class="form__label--custom form-label"
                          >登入密碼</label
                        >
                        <p class="formTag--must">必填</p>
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
                  </Form>
                </div>
                <div class="popModal__footer">
                  <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                    取消
                  </button>
                  <button type="button" class="btn btn-primary" @click="savePhone">保存</button>
                </div>
              </div>
              <div v-if="modalAction === '變更密碼'">
                <div class="popModal__header popModal__header--center">
                  <h5 class="popModal__title">變更密碼</h5>
                  <p class="popModal__header__subTxt">
                    可以混合使用英文字母、數字和符號；包含小寫和大寫拉丁字元；長度至少 8 個字元。
                  </p>
                  <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                  <Form ref="editAccountPhone" v-slot="{ errors }">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label
                          for="accountDataCurrentPassword"
                          class="form__label--custom form-label"
                          >目前密碼</label
                        >
                        <p class="formTag--must">必填</p>
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
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="accountDataNewPassword" class="form__label--custom form-label"
                          >新密碼</label
                        >
                        <p class="formTag--must">必填</p>
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
                    <div class="form__inputBox mb-0">
                      <div class="form__labelBox">
                        <label for="accountDataAgainPassword" class="form__label--custom form-label"
                          >確認密碼</label
                        >
                        <p class="formTag--must">必填</p>
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
                  </Form>
                </div>
                <div class="popModal__footer">
                  <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                    取消
                  </button>
                  <button type="button" class="btn btn-primary" @click="savePassword">保存</button>
                </div>
              </div>
              <div v-if="modalAction === '刪除帳號'">
                <div class="popModal__header popModal__header--center">
                  <h5 class="popModal__title">刪除 SendCV 帳號</h5>
                  <p class="popModal__header__subTxt">
                    想要刪除您的帳號嗎？請先輸入您的帳號及密碼，讓我們確認是您本人。
                  </p>
                  <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                  <Form ref="deleteAccount" v-slot="{ errors }">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="accountDataEmail" class="form__label--custom form-label"
                          >帳號</label
                        >
                        <p class="formTag--must">必填</p>
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
                    <div class="form__inputBox mb-0">
                      <div class="form__labelBox">
                        <label for="accountDataPassword" class="form__label--custom form-label"
                          >密碼</label
                        >
                        <p class="formTag--must">必填</p>
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
                  </Form>
                </div>
                <div class="popModal__footer">
                  <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                    取消
                  </button>
                  <button type="button" class="btn btn-primary">確定</button>
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
import webData from '@/methods/webData';
import database from '@/methods/firebaseinit';
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
        socialMedia: [],
        newPassword: {
          old: '',
          password: '',
          again: '',
        },
      };
    },
    updateData() {
      this.$emit('update-setting-account-Data', this.accountData);
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
      this.$emit('return-user-data', this.user);
    },
    saveEmail() {
      this.user.account.email = this.tempAccountData.email;
      this.saveAllData();
    },
    savePhone() {
      this.user.account.phone = this.tempAccountData.phone;
      this.saveAllData();
    },
    savePassword() {
      if (this.tempAccountData.newPassword.password === this.tempAccountData.newPassword.again) {
        this.user.account.password = this.tempAccountData.newPassword.password;
        this.saveAllData();
      }
    },
    // 保存資料
    saveAllData() {
      const userRef = database.ref('user');
      userRef.set(this.user);
      this.getFbData();
      this.closeModal();
    },
    // 取得資料
    getFbData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = data;
      });
    },
  },
  created() {
    this.formData = webData;
    this.user = this.userData;
    this.defaultData();
  },
  mounted() {
    this.modal = new Modal(this.$refs.settingAccountModal);
    emitter.on('open-setting-account-modal', this.openModal);
    emitter.on('close-setting-account-modal', this.closeModal);
    emitter.on('return-setting-account-modal', this.returnUserData);
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-setting-account-modal', this.openModal);
    emitter.off('close-setting-account-modal', this.closeModal);
    emitter.off('return-setting-account-modal', this.returnUserData);
  },
};
</script>

<style lang="scss"></style>
