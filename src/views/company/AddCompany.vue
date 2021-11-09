<template>
  <div class="page--py jobPage">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-8 col-12">
          <div class="adminContentBox">
            <Form v-if="formStep === 1" v-slot="{ errors }" @submit="sendForm">
              <h2 class="pageTitle mb-5 text-center">企業註冊</h2>
              <p class="mb-5 text-center">填寫以下資料並經過審核後，即可上線招募～</p>
              <!-- 企業名稱 -->
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="formCompanyName" class="form__label--custom form-label"
                    >企業名稱</label
                  >
                  <p class="formTag--must company">必填</p>
                </div>
                <Field
                  id="formCompanyName"
                  name="企業名稱"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['企業名稱'] }"
                  placeholder="請輸入企業名稱"
                  rules="required"
                  v-model="companyItem.companyName"
                  ref="formCompanyName"
                ></Field>
                <ErrorMessage name="企業名稱" class="invalid-feedback"></ErrorMessage>
              </div>
              <!-- 企業統編、電話 -->
              <div class="row">
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="formUnitNumber" class="form__label--custom form-label"
                        >統一編號</label
                      >
                    </div>
                    <Field
                      id="formUnitNumber"
                      name="統一編號"
                      type="number"
                      class="form-control"
                      :class="{ 'is-invalid': errors['統一編號'] }"
                      placeholder="請輸入統一編號"
                      v-model="companyItem.unitNumber"
                      ref="formUnitNumber"
                    ></Field>
                    <ErrorMessage name="統一編號" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="formCompanyPhone" class="form__label--custom form-label"
                        >企業電話</label
                      >
                    </div>
                    <Field
                      id="formCompanyPhone"
                      ref="formCompanyPhone"
                      name="企業電話"
                      type="phone"
                      class="form-control"
                      :class="{ 'is-invalid': errors['企業電話'] }"
                      placeholder="請輸入企業電話"
                      v-model="companyItem.companyPhone"
                    ></Field>
                    <ErrorMessage name="企業電話" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <!-- 公司地址 -->
              <div class="d-flex">
                <div class="form__inputBox me-2">
                  <div class="form__labelBox">
                    <label for="formCompanyCity" class="form__label--custom form-label"
                      >公司地址</label
                    >
                  </div>
                  <Field
                    id="formCompanyCity"
                    ref="formCompanyCity"
                    name="縣市"
                    as="select"
                    class="form-control form-select w-auto"
                    :class="{ 'is-invalid': errors['縣市'] }"
                    v-model="companyItem.companyAddress.addressCity"
                    @change="chooseDist(companyItem.companyAddress.addressCity)"
                  >
                    <option value="" disabled selected>請選擇縣市</option>
                    <option v-for="city in formData.cities" :value="city" :key="city">
                      {{ city }}
                    </option>
                  </Field>
                  <ErrorMessage name="縣市" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="formCompanyDist" class="form__label--custom form-label"
                      >區域鄉鎮</label
                    >
                  </div>
                  <Field
                    id="formCompanyDist"
                    ref="formCompanyDist"
                    name="區域鄉鎮"
                    as="select"
                    class="form-control form-select w-auto"
                    :class="{ 'is-invalid': errors['區域鄉鎮'] }"
                    v-model="companyItem.companyAddress.addressDist"
                  >
                    <option value="" disabled selected>請選擇區域鄉鎮</option>
                    <option v-for="dist in chooseCityDist" :value="dist" :key="dist">
                      {{ dist }}
                    </option>
                  </Field>
                  <ErrorMessage name="區域鄉鎮" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="jobFormAddressDetail" class="form__label--custom form-label"
                    >公司詳細地址</label
                  >
                </div>
                <Field
                  id="jobFormAddressDetail"
                  ref="jobFormAddressDetail"
                  name="公司詳細地址"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['公司詳細地址'] }"
                  placeholder="請輸入公司詳細地址"
                  v-model="companyItem.companyAddress.addressDetail"
                ></Field>
                <ErrorMessage name="公司詳細地址" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="row">
                <div class="col-md-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="formContactName" class="form__label--custom form-label"
                        >姓名</label
                      >
                    </div>
                    <Field
                      id="formContactName"
                      ref="formContactName"
                      name="姓名"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['姓名'] }"
                      placeholder="請輸入姓名"
                      v-model="companyItem.contactInfo.name"
                    ></Field>
                    <ErrorMessage name="聯絡人姓名" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="formContactPhone" class="form__label--custom form-label"
                        >聯絡電話</label
                      >
                    </div>
                    <Field
                      id="formContactPhone"
                      ref="formContactPhone"
                      name="聯絡電話"
                      type="tel"
                      class="form-control"
                      :class="{ 'is-invalid': errors['聯絡電話'] }"
                      placeholder="請輸入聯絡電話"
                      v-model="companyItem.contactInfo.phone"
                    ></Field>
                    <ErrorMessage name="聯絡電話" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="formContactEmail" class="form__label--custom form-label"
                    >Email帳號(登入帳號使用)</label
                  >
                  <p class="formTag--must company">必填</p>
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
                  v-model="companyItem.contactInfo.email"
                ></Field>
                <ErrorMessage name="Email帳號" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="formPassword" class="form__label--custom form-label">密碼</label>
                  <p class="formTag--must company">必填</p>
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
                  v-model="companyItem.contactInfo.password"
                ></Field>
                <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="formPasswordCheck" class="form__label--custom form-label"
                    >重複確認密碼</label
                  >
                  <p class="formTag--must company">必填</p>
                </div>
                <Field
                  id="formPasswordCheck"
                  ref="formPasswordCheck"
                  name="重複確認密碼"
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors['重複確認密碼'] }"
                  placeholder="請重複輸入密碼"
                  rules="required"
                  v-model="companyItem.contactInfo.passwordCheck"
                ></Field>
                <ErrorMessage name="重複確認密碼" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-4">
                <p class="border-bottom border-gray-line pb-2 mb-4">會員方案</p>
                <div class="d-flex justify-content-between mb-2">
                  <p>基本方案<span>1個月</span></p>
                  <p><span>$</span>800<span>/月</span></p>
                </div>
                <p class="subTxt text-secondary">＊實際費用計算日期由企業審核通過後開始計算</p>
              </div>
              <div class="border-top border-gray-line pt-4">
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="readContract"
                    v-model="companyItem.readContract"
                  />
                  <label class="form-check-label" for="readContract"
                    >同意我們的<a class="text-companyColor" target="_blank" href="google.com"
                      >《SendCV隱私協議及服務條款》</a
                    ></label
                  >
                </div>
                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn btn-companyColor text-light">
                    下一步，驗證信箱。
                  </button>
                </div>
              </div>
            </Form>
            <div v-if="formStep === 2">
              <h2 class="pageTitle mb-5 text-center">驗證信箱</h2>
              <p class="mb-8 text-center">
                我們已發送驗證信到以下信箱，請在5分鐘內前往信箱完成帳號的驗證程序。
              </p>
              <p class="mb-8 text-center text-companyColor text-decoration-underline">
                {{ companyItem.contactInfo.email }}
              </p>
              <div class="d-flex justify-content-between border-top border-gray-line pt-4">
                <button
                  type="button"
                  class="btn btn-outline-gray-line text-dark"
                  @click="formStep = 1"
                >
                  返回變更信箱
                </button>
                <button type="button" class="btn btn-companyColor text-light" @click="formStep = 3">
                  重新發送驗證信
                </button>
              </div>
            </div>
            <Form v-if="formStep === 3" v-slot="{ errors }" @submit="sendForm">
              <h2 class="pageTitle mb-5 text-center">註冊成功</h2>
              <p class="mb-5 text-center">
                歡迎您的加入！由於您所申請的是付費方案，您可以選擇立即線上付款或稍後將款帳號email至您的信箱。
              </p>
              <!-- 企業名稱 -->
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="formCompanyName" class="form__label--custom form-label"
                    >企業名稱</label
                  >
                  <p class="formTag--must company">必填</p>
                </div>
                <Field
                  id="formCompanyName"
                  name="企業名稱"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['企業名稱'] }"
                  placeholder="請輸入企業名稱"
                  rules="required"
                  v-model="companyItem.companyName"
                  ref="formCompanyName"
                ></Field>
                <ErrorMessage name="企業名稱" class="invalid-feedback"></ErrorMessage>
              </div>
              <!-- 企業統編、電話 -->
              <div class="row">
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="formUnitNumber" class="form__label--custom form-label"
                        >統一編號</label
                      >
                    </div>
                    <Field
                      id="formUnitNumber"
                      name="統一編號"
                      type="number"
                      class="form-control"
                      :class="{ 'is-invalid': errors['統一編號'] }"
                      placeholder="請輸入統一編號"
                      v-model="companyItem.unitNumber"
                      ref="formUnitNumber"
                    ></Field>
                    <ErrorMessage name="統一編號" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="formCompanyPhone" class="form__label--custom form-label"
                        >企業電話</label
                      >
                    </div>
                    <Field
                      id="formCompanyPhone"
                      ref="formCompanyPhone"
                      name="企業電話"
                      type="phone"
                      class="form-control"
                      :class="{ 'is-invalid': errors['企業電話'] }"
                      placeholder="請輸入企業電話"
                      v-model="companyItem.companyPhone"
                    ></Field>
                    <ErrorMessage name="企業電話" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <!-- 公司地址 -->
              <div class="d-flex">
                <div class="form__inputBox me-2">
                  <div class="form__labelBox">
                    <label for="formCompanyCity" class="form__label--custom form-label"
                      >公司地址</label
                    >
                  </div>
                  <Field
                    id="formCompanyCity"
                    ref="formCompanyCity"
                    name="縣市"
                    as="select"
                    class="form-control form-select w-auto"
                    :class="{ 'is-invalid': errors['縣市'] }"
                    v-model="companyItem.companyAddress.addressCity"
                    @change="chooseDist(companyItem.companyAddress.addressCity)"
                  >
                    <option value="" disabled selected>請選擇縣市</option>
                    <option v-for="city in formData.cities" :value="city" :key="city">
                      {{ city }}
                    </option>
                  </Field>
                  <ErrorMessage name="縣市" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form__inputBox">
                  <div class="form__labelBox">
                    <label for="formCompanyDist" class="form__label--custom form-label"
                      >區域鄉鎮</label
                    >
                  </div>
                  <Field
                    id="formCompanyDist"
                    ref="formCompanyDist"
                    name="區域鄉鎮"
                    as="select"
                    class="form-control form-select w-auto"
                    :class="{ 'is-invalid': errors['區域鄉鎮'] }"
                    v-model="companyItem.companyAddress.addressDist"
                  >
                    <option value="" disabled selected>請選擇區域鄉鎮</option>
                    <option v-for="dist in chooseCityDist" :value="dist" :key="dist">
                      {{ dist }}
                    </option>
                  </Field>
                  <ErrorMessage name="區域鄉鎮" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="jobFormAddressDetail" class="form__label--custom form-label"
                    >公司詳細地址</label
                  >
                </div>
                <Field
                  id="jobFormAddressDetail"
                  ref="jobFormAddressDetail"
                  name="公司詳細地址"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['公司詳細地址'] }"
                  placeholder="請輸入公司詳細地址"
                  v-model="companyItem.companyAddress.addressDetail"
                ></Field>
                <ErrorMessage name="公司詳細地址" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="row">
                <div class="col-md-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="formContactName" class="form__label--custom form-label"
                        >姓名</label
                      >
                    </div>
                    <Field
                      id="formContactName"
                      ref="formContactName"
                      name="姓名"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['姓名'] }"
                      placeholder="請輸入姓名"
                      v-model="companyItem.contactInfo.name"
                    ></Field>
                    <ErrorMessage name="聯絡人姓名" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="formContactPhone" class="form__label--custom form-label"
                        >聯絡電話</label
                      >
                    </div>
                    <Field
                      id="formContactPhone"
                      ref="formContactPhone"
                      name="聯絡電話"
                      type="tel"
                      class="form-control"
                      :class="{ 'is-invalid': errors['聯絡電話'] }"
                      placeholder="請輸入聯絡電話"
                      v-model="companyItem.contactInfo.phone"
                    ></Field>
                    <ErrorMessage name="聯絡電話" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="formContactEmail" class="form__label--custom form-label"
                    >Email帳號(登入帳號使用)</label
                  >
                  <p class="formTag--must company">必填</p>
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
                  v-model="companyItem.contactInfo.email"
                ></Field>
                <ErrorMessage name="Email帳號" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="formPassword" class="form__label--custom form-label">密碼</label>
                  <p class="formTag--must company">必填</p>
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
                  v-model="companyItem.contactInfo.password"
                ></Field>
                <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="formPasswordCheck" class="form__label--custom form-label"
                    >重複確認密碼</label
                  >
                  <p class="formTag--must company">必填</p>
                </div>
                <Field
                  id="formPasswordCheck"
                  ref="formPasswordCheck"
                  name="重複確認密碼"
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors['重複確認密碼'] }"
                  placeholder="請重複輸入密碼"
                  rules="required"
                  v-model="companyItem.contactInfo.passwordCheck"
                ></Field>
                <ErrorMessage name="重複確認密碼" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-4">
                <p class="border-bottom border-gray-line pb-2 mb-4">會員方案</p>
                <div class="d-flex justify-content-between mb-2">
                  <p>基本方案<span>1個月</span></p>
                  <p><span>$</span>800<span>/月</span></p>
                </div>
                <p class="subTxt text-secondary">＊實際費用計算日期由企業審核通過後開始計算</p>
              </div>
              <div class="d-flex justify-content-between border-top border-gray-line pt-4">
                <button
                  type="button"
                  class="btn btn-outline-gray-line text-dark"
                  @click="formStep = 1"
                >
                  稍後付款
                </button>
                <button type="button" class="btn btn-companyColor text-light" @click="formStep = 3">
                  立即付款
                </button>
              </div>
            </Form>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import webData from '@/methods/webData';
import database from '@/methods/firebaseinit';

export default {
  components: {
    UpTopBtn,
  },
  data() {
    return {
      formStep: 1,
      company: {},
      companyItem: {
        companyName: '',
        companyPhone: '',
        companyAddress: {
          addressCity: '',
          addressDist: '',
          addressDetail: '',
          addressFull: '',
        },
        contactInfo: {
          name: '',
          phone: null,
          email: '',
          password: '',
          passwordCheck: '',
        },
        readContract: false,
      },
      sameAddressWithCompany: false,
      chooseCityDist: [],
      formData: {},
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
  methods: {
    sendForm() {
      this.formStep = 2;
      console.log(this.companyItem);
    },
    // pick city data
    chooseDist(cityName) {
      this.chooseCityDist = [];
      this.chooseCityDist = this.formData.districts[cityName].district;
      const [temDist] = this.chooseCityDist;
      this.companyItem.companyAddress.addressDist = temDist;
    },
    // Get company data from Firebase.
    getCompanyData() {
      const companyRef = database.ref('company');
      companyRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.company = data;
        }
      });
    },
  },
  created() {
    this.getCompanyData();
    this.formData = webData;
    this.chooseCityDist = this.formData.districts['台北市'].district;
    // emitter.emit('spinner-open-bg', 500);
  },
};
</script>

<style lang="scss"></style>
