<template>
  <div
    ref="loginModal"
    class="modal fade popModal"
    id="loginModal"
    aria-hidden="true"
    aria-labelledby="loginModalLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered" ref="collapse">
      <div class="modal-content">
        <div class="popModal__header popModal__header--center">
          <h5 class="popModal__title">{{ mainAction }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body mb-5" v-if="modalAction === '企業登入'">
          <p class="mb-5 text-center">歡迎使用 SendCV 招募人才!</p>
          <Form v-if="companyLoginStep === 1" v-slot="{ errors }" @submit="companyLogin">
            <div class="form__inputBox">
              <div class="form__labelBox">
                <label for="formContactEmail" class="form__label--custom form-label"
                  >Email帳號</label
                >
              </div>
              <Field
                id="formContactEmail"
                ref="formContactEmail"
                name="Email帳號"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['Email'] }"
                placeholder="請輸入Email帳號"
                rules="email|required"
                v-model="loginInfo.email"
              ></Field>
              <ErrorMessage name="Email帳號" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="form__inputBox">
              <div class="form__labelBox">
                <label for="formPassword" class="form__label--custom form-label">密碼</label>
              </div>
              <Field
                id="formPassword"
                ref="formPassword"
                name="密碼"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': errors['密碼'] }"
                placeholder="請輸入密碼"
                rules="required"
                v-model="loginInfo.password"
              ></Field>
              <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
            </div>
            <p class="text-danger mb-4 text-center">{{ errorTxt }}</p>
            <button type="submit" class="btn btn-companyColor text-light w-100 mb-4">登入</button>
            <button type="button" class="btn btn-outline-gray-line text-dark w-100">註冊</button>
          </Form>
          <div v-if="companyLoginStep === 2">
            <p>登入成功</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import emitter from '@/methods/emitter';
import database from '@/methods/firebaseinit';

export default {
  emits: ['change-login'],
  data() {
    return {
      companyLoginStep: 1,
      modal: {},
      modalAction: '',
      mainAction: '',
      dataReady: false,
      companyList: [],
      loginInfo: {
        email: '',
        password: '',
      },
      meUser: {},
      errorTxt: '',
    };
  },
  methods: {
    goToPageLink(link) {
      this.$router.push(link);
    },
    openModal(action) {
      this.mainAction = action;
      this.modalAction = action;
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    companyLogin() {
      this.getCompanyListData();
    },
    getCompanyListData() {
      this.companyList = [];
      const companyListRef = database.ref('backStage/companyManagement/companyList');
      companyListRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((item) => {
            // 物件轉陣列
            this.companyList.push(data[item]);
            console.log(this.companyList);
            this.checkLogin();
          });
        }
      });
    },
    checkLogin() {
      this.companyList.forEach((item) => {
        if (
          item.contactInfo.email === this.loginInfo.email
          && item.contactInfo.password === this.loginInfo.password
        ) {
          this.companyLoginOk();
          this.companyLoginStep = 2;
          console.log('登入成功');
          this.errorTxt = '';
        } else {
          this.errorTxt = '帳號或密碼錯誤';
        }
      });
    },
    companyLoginOk() {
      const companyUserRef = database.ref('company/myAccount');
      companyUserRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.meUser = data;
        this.setLogin();
      });
    },
    setLogin() {
      this.meUser.login = true;
      const companyUserRef = database.ref('company/myAccount');
      companyUserRef.set(this.meUser);
      setTimeout(() => {
        this.$emit('change-login');
        this.goToPageLink('/company-admin/company-over-view');
        this.closeModal();
      }, 1000);
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.loginModal);
    emitter.on('open-login-modal', this.openModal);
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-login-modal', this.openModal);
  },
};
</script>

<style lang="scss"></style>
