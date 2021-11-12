<template>
  <div class="page--py position-relative signFlowContainer">
    <img
      class="signFlow__img signFlow__img--left"
      src="https://i.imgur.com/II5PNUV.png"
      alt="註冊流程背景圖片"
    />
    <img
      class="signFlow__img signFlow__img--right"
      src="https://i.imgur.com/yZTV9Qx.png"
      alt="註冊流程背景圖片"
    />
    <div class="container">
      <div class="row justify-content-center position-relative">
        <div class="col-xl-6 col-lg-8 col-md-10 col-12">
          <Form v-if="userFormStep === 1" v-slot="{ errors }" @submit="sendForm">
            <div class="adminContentBox adminContentBox--full position-relative">
              <h2 class="pageTitle mb-5 text-center">求職者會員註冊</h2>
              <p class="mb-5 text-center">填寫以下資料並經過審核後，即可上線招募～</p>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="userName" class="form__label--custom form-label">中文姓名</label>
                  <p class="formTag--must">必填</p>
                </div>
                <Field
                  id="userName"
                  ref="userName"
                  name="中文姓名"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['中文姓名'] }"
                  placeholder="請輸入中文姓名"
                  rules="required"
                  v-model="user.account.chineseName"
                ></Field>
                <ErrorMessage name="中文姓名" class="invalid-feedback"></ErrorMessage>
              </div>
              <!-- 企業統編、電話 -->
              <div class="row">
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="userId" class="form__label--custom form-label">身分證字號</label>
                    </div>
                    <Field
                      id="userId"
                      ref="userId"
                      name="身分證字號"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['身分證字號'] }"
                      placeholder="請輸入身分證字號"
                      v-model="user.account.id"
                    ></Field>
                    <ErrorMessage name="身分證字號" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="userPhone" class="form__label--custom form-label">手機號碼</label>
                    </div>
                    <Field
                      id="userPhone"
                      ref="userPhone"
                      name="手機號碼"
                      type="tel"
                      class="form-control"
                      :class="{ 'is-invalid': errors['手機號碼'] }"
                      placeholder="請輸入手機號碼"
                      v-model="user.account.phone"
                    ></Field>
                    <ErrorMessage name="企業電話" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="userEmail" class="form__label--custom form-label"
                    >Email帳號(登入帳號使用)</label
                  >
                  <p class="formTag--must">必填</p>
                </div>
                <Field
                  id="userEmail"
                  ref="userEmail"
                  name="Email帳號"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors['Email'] }"
                  placeholder="請輸入Email帳號"
                  rules="email|required"
                  v-model="user.account.email"
                ></Field>
                <ErrorMessage name="Email帳號" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="userPassword" class="form__label--custom form-label">密碼</label>
                  <p class="formTag--must">必填</p>
                </div>
                <Field
                  id="userPassword"
                  ref="userPassword"
                  name="密碼"
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors['密碼'] }"
                  placeholder="請輸入密碼"
                  rules="required"
                  v-model="user.account.password"
                ></Field>
                <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="userPasswordCheck" class="form__label--custom form-label"
                    >重複確認密碼</label
                  >
                  <p class="formTag--must">必填</p>
                </div>
                <Field
                  id="userPasswordCheck"
                  ref="userPasswordCheck"
                  name="重複確認密碼"
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors['重複確認密碼'] }"
                  placeholder="請重複輸入密碼"
                  rules="required"
                  v-model="passwordCheck"
                ></Field>
                <ErrorMessage name="重複確認密碼" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="border-top border-gray-line pt-4">
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="readContract"
                    v-model="readContract"
                  />
                  <label class="form-check-label" for="readContract"
                    >同意我們的<a class="text-companyColor" target="_blank" href="google.com"
                      >《SendCV隱私協議及服務條款》</a
                    ></label
                  >
                </div>
                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn btn-primary text-dark">
                    下一步，驗證信箱。
                  </button>
                </div>
              </div>
            </div>
          </Form>
          <div
            v-if="userFormStep === 2"
            class="
              adminContentBox adminContentBox--full
              position-relative
              d-flex
              flex-column
              justify-content-between
            "
          >
            <div>
              <h2 class="pageTitle mb-5 text-center">驗證信箱</h2>
              <p class="mb-8 text-center">
                我們已發送驗證信到以下信箱，請在5分鐘內前往信箱完成帳號的驗證程序。
              </p>
              <p class="pb-8 mb-8 text-center text-companyColor text-decoration-underline">
                {{ user.account.email }}
              </p>
            </div>
            <div class="d-flex justify-content-between border-top border-gray-line pt-4">
              <button
                type="button"
                class="btn btn-outline-gray-line text-dark"
                @click="userFormStep = 1"
              >
                返回變更信箱
              </button>
              <button
                type="button"
                class="btn btn-companyColor text-light"
                @click="userFormStep = 3"
              >
                重新發送驗證信
              </button>
            </div>
          </div>
          <div
            v-if="userFormStep === 3"
            class="
              adminContentBox adminContentBox--full
              position-relative
              d-flex
              flex-column
              justify-content-between
            "
          >
            <div>
              <h2 class="pageTitle mb-5 text-center">註冊成功</h2>
              <p class="mb-8 text-center">
                恭喜您完成帳號註冊了，馬上開始使用SendCV 找到最適合您的職缺吧！
              </p>
            </div>
            <div class="border-top border-gray-line pt-4">
              <router-link class="btn btn-primary text-dark w--100 mb-4" to="/admin"
                >先前往後台完善個人資料</router-link
              >
              <router-link class="btn btn-outline-gray-line text-dark w--100" to="/products-list"
                >先搜尋合適職位</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
</template>

<script>
// import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    UpTopBtn,
  },
  data() {
    return {
      userFormStep: 1,
      user: {
        account: {
          login: false,
          accountState: '申請中',
          created_time: '',
          chineseName: '',
          englishName: '',
          id: '',
          jobTitle: '',
          gender: '',
          birthday: '',
          email: '',
          phone: '',
          addressCity: '',
          addressDist: '',
          password: '',
          socialMedia: [],
        },
      },
      readContract: false,
      passwordCheck: '',
    };
  },
  methods: {
    sendForm() {
      this.userFormStep = 2;
      console.log(this.user);
      this.newUser();
      this.newUserApply();
    },
    newUser() {
      const jobSeekerDataRef = database.ref('backStage/jobSeekerManagement/jobSeekeryApplyList');
      const { key } = jobSeekerDataRef.push();
      const obj = this.user;
      obj.key = key;
      jobSeekerDataRef.child(key).set(obj);
      this.newUserApply();
    },
    newUserApply() {
      const jobSeekerLsitRef = database.ref('backStage/jobSeekerManagement/jobSeekerList');
      const { key } = jobSeekerLsitRef.push();
      const obj = this.user;
      obj.key = key;
      jobSeekerLsitRef.child(key).set(obj);
    },
  },
};
</script>

<style lang="scss"></style>
