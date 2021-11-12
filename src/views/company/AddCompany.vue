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
          <Form v-if="formStep === 1" v-slot="{ errors }" @submit="formStep = 2">
            <div class="adminContentBox adminContentBox--full position-relative">
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
              <div class="mb-5">
                <p class="border-bottom border-gray-line pb-2 mb-4">會員方案</p>
                <div class="d-flex justify-content-between">
                  <p>
                    {{ companyItem.membership.membershipLevel
                    }}<span class="ms-1">{{ companyItem.membership.period / 30 }} 個月</span>
                  </p>
                  <p class="text-dark fw-bold subTitle">
                    <span class="me-1 subTxt">$</span>800<span class="ms-1 subTxt">/月</span>
                  </p>
                </div>
                <p class="subTxt text-secondary mb-3">＊實際費用計算日期由企業審核通過後開始計算</p>
                <div class="border border-gray-line p-2 pb-0 rounded">
                  <div class="mb-3">
                    <p class="text-secondary subTxt mb-1">基本功能</p>
                    <div class="d-flex">
                      <p class="me-5">
                        刊登職位數量<span class="ms-1 text-companyColor">無限</span>
                      </p>
                      <p>
                        搜尋人才<i class="ms-1 text-companyColor jobIcon-sm bi bi-check-lg"></i>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p class="text-secondary subTxt mb-1">進階功能</p>
                    <div class="d-flex flex-wrap">
                      <p
                        class="me-5 mb-2"
                        v-if="companyItem.membership.payService.webAd.webAd_bg > 0"
                      >
                        大型版面廣告<span class="ms-1 text-companyColor"
                          >x{{ companyItem.membership.payService.webAd.webAd_bg }}</span
                        >
                      </p>
                      <p
                        class="me-5 mb-2"
                        v-if="companyItem.membership.payService.webAd.webAd_normal > 0"
                      >
                        一般版面廣告<span class="ms-1 text-companyColor"
                          >x{{ companyItem.membership.payService.webAd.webAd_normal }}</span
                        >
                      </p>
                      <p
                        class="me-5 mb-2"
                        v-if="companyItem.membership.payService.webAd.webAd_sm > 0"
                      >
                        小型版面廣告<span class="ms-1 text-companyColor"
                          >x{{ companyItem.membership.payService.webAd.webAd_sm }}</span
                        >
                      </p>
                      <p class="me-5 mb-2" v-if="companyItem.membership.payService.banner > 0">
                        美化社群廣告次數<span class="ms-1 text-companyColor"
                          >x{{ companyItem.membership.payService.banner }}</span
                        >
                      </p>
                      <p class="me-5 mb-2" v-if="companyItem.membership.payService.promoteJob > 0">
                        設定推廣職位<span class="ms-1 text-companyColor"
                          >x{{ companyItem.membership.payService.promoteJob }}</span
                        >
                      </p>
                      <p class="me-5 mb-2" v-if="companyItem.membership.payService.weeklyCompany">
                        成為推薦企業<i class="ms-1 text-companyColor jobIcon-sm bi bi-check-lg"></i>
                      </p>
                      <p class="me-5 mb-2" v-if="companyItem.membership.payService.weeklyEmail">
                        每週推薦郵件<i
                          class="ms-1 text-companyColor jobIcon-sm bi bi-check-lg mb-2"
                        ></i>
                      </p>
                      <p
                        class="me-5 mb-2"
                        v-if="companyItem.membership.payService.prettierCompanyPage"
                      >
                        美化企業頁面<i class="ms-1 text-companyColor jobIcon-sm bi bi-check-lg"></i>
                      </p>
                    </div>
                  </div>
                </div>
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
            </div>
          </Form>
          <div
            v-if="formStep === 2"
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
                {{ companyItem.contactInfo.email }}
              </p>
            </div>
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
          <Form v-if="formStep === 3" v-slot="{ errors }" @submit="newCompany">
            <div class="adminContentBox adminContentBox--full position-relative">
              <h2 class="pageTitle mb-5 text-center">註冊成功</h2>
              <p class="mb-5 text-center">
                歡迎您的加入！由於您所申請的是付費方案，您可以選擇立即線上付款或稍後將款帳號email至您的信箱。
              </p>
              <div class="mb-5">
                <p class="border-bottom border-gray-line pb-2 mb-4">會員方案</p>
                <div class="d-flex justify-content-between">
                  <p>
                    {{ companyItem.membership.membershipLevel
                    }}<span class="ms-1">{{ companyItem.membership.period / 30 }} 個月</span>
                  </p>
                  <p class="text-dark fw-bold subTitle">
                    <span class="me-1 subTxt">$</span>800<span class="ms-1 subTxt">/月</span>
                  </p>
                </div>
                <p class="subTxt text-secondary mb-3">＊實際費用計算日期由企業審核通過後開始計算</p>
                <div class="border border-gray-line p-2 pb-0 rounded">
                  <div class="mb-3">
                    <p class="text-secondary subTxt mb-1">基本功能</p>
                    <div class="d-flex">
                      <p class="me-5">
                        刊登職位數量<span class="ms-1 text-companyColor">無限</span>
                      </p>
                      <p>
                        搜尋人才<i class="ms-1 text-companyColor jobIcon-sm bi bi-check-lg"></i>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p class="text-secondary subTxt mb-1">進階功能</p>
                    <div class="d-flex flex-wrap">
                      <p
                        class="me-5 mb-2"
                        v-if="companyItem.membership.payService.webAd.webAd_bg > 0"
                      >
                        大型版面廣告<span class="ms-1 text-companyColor"
                          >x{{ companyItem.membership.payService.webAd.webAd_bg }}</span
                        >
                      </p>
                      <p
                        class="me-5 mb-2"
                        v-if="companyItem.membership.payService.webAd.webAd_normal > 0"
                      >
                        一般版面廣告<span class="ms-1 text-companyColor"
                          >x{{ companyItem.membership.payService.webAd.webAd_normal }}</span
                        >
                      </p>
                      <p
                        class="me-5 mb-2"
                        v-if="companyItem.membership.payService.webAd.webAd_sm > 0"
                      >
                        小型版面廣告<span class="ms-1 text-companyColor"
                          >x{{ companyItem.membership.payService.webAd.webAd_sm }}</span
                        >
                      </p>
                      <p class="me-5 mb-2" v-if="companyItem.membership.payService.banner > 0">
                        美化社群廣告次數<span class="ms-1 text-companyColor"
                          >x{{ companyItem.membership.payService.banner }}</span
                        >
                      </p>
                      <p class="me-5 mb-2" v-if="companyItem.membership.payService.promoteJob > 0">
                        設定推廣職位<span class="ms-1 text-companyColor"
                          >x{{ companyItem.membership.payService.promoteJob }}</span
                        >
                      </p>
                      <p class="me-5 mb-2" v-if="companyItem.membership.payService.weeklyCompany">
                        成為推薦企業<i class="ms-1 text-companyColor jobIcon-sm bi bi-check-lg"></i>
                      </p>
                      <p class="me-5 mb-2" v-if="companyItem.membership.payService.weeklyEmail">
                        每週推薦郵件<i
                          class="ms-1 text-companyColor jobIcon-sm bi bi-check-lg mb-2"
                        ></i>
                      </p>
                      <p
                        class="me-5 mb-2"
                        v-if="companyItem.membership.payService.prettierCompanyPage"
                      >
                        美化企業頁面<i class="ms-1 text-companyColor jobIcon-sm bi bi-check-lg"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="payType" class="form__label--custom form-label">付款方式</label>
                </div>
                <div class="d-flex flex-wrap">
                  <div class="form-check me-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="card"
                      id="formPayType--card"
                      name="payType"
                      :checked="companyItem.payInfo.payType === 'card'"
                      v-model="companyItem.payInfo.payType"
                    />
                    <label class="form-check-label" for="formPayType--card"> 信用卡付款 </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="atm"
                      id="formPayType--atm"
                      name="payType"
                      :checked="companyItem.payInfo.payType === 'atm'"
                      v-model="companyItem.payInfo.payType"
                    />
                    <label class="form-check-label" for="formPayType--atm">
                      ATM付款(轉帳/網路線上繳款)
                    </label>
                    <p class="subTxt text-secondary">
                      每筆訂單會產生一組虛擬代碼，依虛擬代碼進行ATM轉帳。
                    </p>
                  </div>
                </div>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="payType" class="form__label--custom form-label">發票類型</label>
                </div>
                <div class="d-flex flex-wrap">
                  <div class="form-check me-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="一般電子發票"
                      id="invoiceType--normal"
                      name="invoiceType"
                      :checked="companyItem.invoice.type === '一般電子發票'"
                      v-model="companyItem.invoice.type"
                    />
                    <label class="form-check-label" for="invoiceType--normal"> 一般電子發票 </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="電子統編發票"
                      id="invoiceType--company"
                      name="invoiceType"
                      :checked="companyItem.invoice.type === '電子統編發票'"
                      v-model="companyItem.invoice.type"
                    />
                    <label class="form-check-label" for="invoiceType--company">
                      電子統編發票
                    </label>
                  </div>
                </div>
                <div v-if="companyItem.invoice.type === '電子統編發票'">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="unitNumber" class="form__label--custom form-label"
                        >統一編號</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <Field
                      id="formInvoiceUnitNumber"
                      ref="formInvoiceUnitNumber"
                      name="統一編號"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['統一編號'] }"
                      placeholder="請輸入"
                      v-model="companyItem.invoice.unitNumber"
                      rules="required"
                    ></Field>
                    <ErrorMessage name="統一編號" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="companyName" class="form__label--custom form-label"
                        >發票抬頭</label
                      >
                    </div>
                    <Field
                      id="formInvoiceCompanyName"
                      ref="formInvoiceCompanyName"
                      name="發票抬頭"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['發票抬頭'] }"
                      placeholder="請輸入"
                      v-model="companyItem.invoice.companyName"
                    ></Field>
                    <ErrorMessage name="發票抬頭" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between border-top border-gray-line pt-4">
                <button
                  type="submit"
                  class="btn btn-outline-gray-line text-dark"
                  @click="formStep = 1"
                >
                  稍後付款
                </button>
                <button type="submit" class="btn btn-companyColor text-light" @click="formStep = 3">
                  立即付款
                </button>
              </div>
            </div>
          </Form>
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
      companyItem: {
        companyState: '申請中',
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
        payInfo: {
          payType: 'card',
          payDate: '',
          payAccount: '',
        },
        invoice: {
          state: '尚未開立發票',
          type: '一般電子發票',
          created_time: '',
          companyName: '',
          unitNumber: '',
        },
        membership: {
          membershipLevel: '免費方案',
          price: 0,
          price_total: 0,
          period: 30,
          created_at: null,
          expired_at: null,
          jobPost: true,
          searchTalent: true,
          newJob: true,
          weeklyCompany: false,
          weeklyEmail: false,
          prettierCompanyPage: false,
          payService: {
            webAd: {
              webAd_bg: 0,
              webAd_normal: 0,
              webAd_sm: 0,
            },
            banner: 0,
            promoteJob: 0,
          },
        },
      },
      membershipList: {
        freeLevel: {
          membershipLevel: '免費方案',
          price: 0,
          price_total: 0,
          jobPost: true,
          searchTalent: true,
          newJob: true,
          weeklyCompany: false,
          weeklyEmail: false,
          prettierCompanyPage: false,
          payService: {
            webAd: {
              webAd_bg: 0,
              webAd_normal: 0,
              webAd_sm: 0,
            },
            banner: 0,
            promoteJob: 0,
          },
        },
        normalLevel: {
          membershipLevel: '基本方案',
          price: 800,
          price_total: 800,
          jobPost: true,
          searchTalent: true,
          newJob: true,
          weeklyCompany: true,
          weeklyEmail: true,
          prettierCompanyPage: true,
          payService: {
            webAd: {
              webAd_bg: 0,
              webAd_normal: 0,
              webAd_sm: 1,
            },
            banner: 1,
            promoteJob: 3,
          },
        },
        featuredLevel: {
          membershipLevel: '精選方案',
          price: 1400,
          price_total: 4200,
          jobPost: true,
          searchTalent: true,
          newJob: true,
          weeklyCompany: true,
          weeklyEmail: true,
          prettierCompanyPage: true,
          payService: {
            webAd: {
              webAd_bg: 1,
              webAd_normal: 1,
              webAd_sm: 0,
            },
            banner: 2,
            promoteJob: 6,
          },
        },
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

    newCompany() {
      this.companyItem.companyAddress.companyAddress = `${this.companyItem.companyAddress.addressCity}，${this.companyItem.companyAddress.addressDist}，${this.companyItem.companyAddress.addressDetail}`;
      const companyApplyListRef = database.ref('backStage/companyManagement/companyApplyList');
      const { key } = companyApplyListRef.push();
      const obj = this.companyItem;
      obj.key = key;
      companyApplyListRef.child(key).set(obj);
      this.newCompanyApply();
    },
    newCompanyApply() {
      this.companyItem.companyAddress.companyAddress = `${this.companyItem.companyAddress.addressCity}，${this.companyItem.companyAddress.addressDist}，${this.companyItem.companyAddress.addressDetail}`;
      const companyListRef = database.ref('backStage/companyManagement/companyList');
      const { key } = companyListRef.push();
      const obj = this.companyItem;
      obj.key = key;
      companyListRef.child(key).set(obj);
      this.$router.push('company-home');
    },
  },
  created() {
    const { type } = this.$route.params;
    this.companyItem.membership = JSON.parse(JSON.stringify(this.membershipList[type]));
    console.log(this.companyItem);
    this.formData = webData;
    this.chooseCityDist = this.formData.districts['台北市'].district;
    // emitter.emit('spinner-open-bg', 500);
  },
};
</script>

<style lang="scss"></style>
