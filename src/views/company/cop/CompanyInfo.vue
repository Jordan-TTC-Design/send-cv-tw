<template>
  <div class="adminPage--py">
    <NavCompanyAdminNav :nowPage="nowPage" />
    <div class="container-lg pageSubNavContainer--sticky d-lg-none mb-5">
      <div class="pageSubNav">
        <ul class="innerNav innerNav--fill innerNav--company innerNav--single">
          <li
            class="innerNav__item w--50"
            :class="{ active: rwdSelect === '會員方案' }"
            @click="this.rwdSelect = '會員方案'"
          >
            <p>會員方案</p>
          </li>
          <li
            class="innerNav__item w--50"
            :class="{ active: rwdSelect === '企業基本資料' }"
            @click="this.rwdSelect = '企業基本資料'"
          >
            <p>企業基本資料</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="container-xl position-relative">
      <div class="row justify-content-center">
        <!-- 會員方案 -->
        <div class="col-lg-4" :class="{ 'rwdClose--md': rwdSelect === '企業基本資料' }">
          <div class="sideContentBox">
            <div class="sideContentBox__body p-5">
              <div class="d-flex align-items-start justify-content-between">
                <h3 class="pageSubTitle mb-3">會員方案</h3>
                <p class="px-4 py-2 bg-companyColor d-block text-light rounded-pill">基本方案</p>
              </div>
              <ul class="infoList infoList--company infoList--noneBordar mb-5">
                <li class="infoList__item pb-2">
                  <p class="infoList__item__title">方案名稱</p>
                  <p class="person__txt">基本方案</p>
                </li>
                <li class="infoList__item pb-2">
                  <p class="infoList__item__title">起始日期</p>
                  <p class="person__txt">2021年5月20日</p>
                </li>
                <li class="infoList__item pb-2">
                  <p class="infoList__item__title">方案費用</p>
                  <p class="person__txt">1200 NTD</p>
                </li>
                <li class="infoList__item pb-2">
                  <p class="infoList__item__title">付款資訊</p>
                  <p class="person__txt">每月自動扣款</p>
                </li>
                <li class="infoList__item pb-2">
                  <p class="infoList__item__title">付款方式</p>
                  <p class="person__txt">信用卡</p>
                </li>
                <li class="infoList__item pb-0">
                  <p class="infoList__item__title">方案內容</p>
                  <ul class="list--dots list--dots--company rounded p-4 bg-gray-light">
                    <li class="mb-2">無限制職位刊登數量</li>
                    <li class="mb-2">搜尋 SendCV 上的所有人才</li>
                    <li class="mb-2">推廣您新刊登的職位</li>
                    <li class="mb-2">一般版面廣告</li>
                    <li class="mb-2">設計在社群平台發布的廣告畫面</li>
                    <li>職位推廣額度 x3</li>
                  </ul>
                </li>
              </ul>
              <button type="button" class="btn btn-gray-light w-100">變更方案</button>
            </div>
          </div>
        </div>
        <!-- 企業資料 -->
        <div class="col-lg-8" :class="{ 'rwdClose--md': rwdSelect === '會員方案' }">
          <div class="adminContentBox adminContentBox--p adminContentBox--full">
            <h3 class="pageSubTitle text-dark mb-3">企業基本資料</h3>
            <div class="adminContentBox__btnBox">
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                @click="editMode = true"
                v-if="!editMode"
              >
                編輯
              </button>
            </div>
            <ul class="row mb-6 infoList infoList--company" v-if="!editMode">
              <li class="col-6">
                <div class="infoList__item">
                  <p class="infoList__item__title">企業名稱</p>
                  <p
                    class="infoList__item__content"
                    :class="{ 'text-secondary': company.companyInfo.companyName === '' }"
                  >
                    {{ company.companyInfo.companyName || '尚未填寫' }}
                  </p>
                </div>
                <div class="infoList__item">
                  <p class="infoList__item__title">公司統編</p>
                  <p
                    class="infoList__item__content"
                    :class="{ 'text-secondary': company.companyInfo.unitNumber === '' }"
                  >
                    {{ company.companyInfo.unitNumber || '尚未填寫' }}
                  </p>
                </div>
                <div class="infoList__item">
                  <p class="infoList__item__title">公司人數</p>
                  <p
                    class="infoList__item__content"
                    :class="{ 'text-secondary': company.companyInfo.companySize === '' }"
                  >
                    {{ company.companyInfo.companySize || '尚未選擇' }}
                  </p>
                </div>
                <div class="infoList__item">
                  <p class="infoList__item__title">所屬行業</p>
                  <p
                    class="infoList__item__content"
                    :class="{ 'text-secondary': company.companyInfo.companyIndustry === '' }"
                  >
                    {{ company.companyInfo.companyIndustry || '尚未選擇' }}
                  </p>
                </div>
              </li>
              <li class="col-6">
                <div class="infoList__item pb-0 border-0">
                  <p class="infoList__item__title">公司Logo</p>
                  <div class="bg-gray-light rounded p-2 position-relative mb-2">
                    <img class="w-100" :src="company.companyInfo.companyLogoUrl" alt="公司logo" />
                  </div>
                </div>
              </li>
              <li class="col">
                <div class="infoList__item">
                  <p class="infoList__item__title">公司地址</p>
                  <p
                    class="infoList__item__content"
                    :class="{ 'text-secondary': company.companyInfo.companyAddress === '' }"
                  >
                    {{ company.companyInfo.companyAddress || '尚未填寫' }}
                  </p>
                </div>
              </li>
            </ul>
            <h3 class="pageSubTitle text-dark mb-3" v-if="!editMode">主要聯絡人資料</h3>
            <ul class="row infoList infoList--company row-cols-lg-2 row-cols-1" v-if="!editMode">
              <li class="col">
                <div class="infoList__item">
                  <p class="infoList__item__title">姓名</p>
                  <p
                    class="infoList__item__content"
                    :class="{ 'text-secondary': company.mainContact.name === '' }"
                  >
                    {{ company.mainContact.name || '尚未填寫' }}
                  </p>
                </div>
              </li>
              <li class="col">
                <div class="infoList__item">
                  <p class="infoList__item__title">職稱</p>
                  <p
                    class="infoList__item__content"
                    :class="{ 'text-secondary': company.mainContact.jobTitle === '' }"
                  >
                    {{ company.mainContact.jobTitle || '尚未填寫' }}
                  </p>
                </div>
              </li>
              <li class="col">
                <div class="infoList__item">
                  <p class="infoList__item__title">電子信箱</p>
                  <p
                    class="infoList__item__content"
                    :class="{ 'text-secondary': company.mainContact.email === '' }"
                  >
                    {{ company.mainContact.email || '尚未填寫' }}
                  </p>
                </div>
              </li>
              <li class="col">
                <div class="infoList__item">
                  <p class="infoList__item__title">聯絡電話</p>
                  <p
                    class="infoList__item__content"
                    :class="{ 'text-secondary': company.mainContact.phone === '' }"
                  >
                    {{ company.mainContact.phone || '尚未填寫' }}
                  </p>
                </div>
              </li>
            </ul>
            <Form ref="editCompanyData" v-slot="{ errors }" @submit="saveFormData" v-if="editMode">
              <div class="row mb-3">
                <div class="col-lg-6">
                  <!-- 公司名稱 -->
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="companyDataName" class="labelBox__label form-label"
                        >企業名稱</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <Field
                      id="companyDataName"
                      ref="companyDataName"
                      name="企業名稱"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['企業名稱'] }"
                      placeholder="請輸入企業名稱"
                      rules="required"
                      v-model="company.companyInfo.companyName"
                    ></Field>
                    <ErrorMessage name="企業名稱" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <!-- 公司統編 -->
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="companyDataUnitNumber" class="labelBox__label form-label"
                        >公司統編</label
                      >
                    </div>
                    <Field
                      id="companyDataUnitNumber"
                      ref="companyDataUnitNumber"
                      name="公司統編"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['公司統編'] }"
                      placeholder="公司統編"
                      v-model="company.companyInfo.unitNumber"
                    ></Field>
                    <ErrorMessage name="目前職稱" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <!-- 公司人數 -->
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="companyDataCompanySize" class="labelBox__label form-label"
                        >公司人數</label
                      >
                      <p class="formTag--must company">必選</p>
                    </div>
                    <Field
                      id="companyDataCompanySize"
                      ref="companyDataCompanySize"
                      name="公司人數"
                      as="select"
                      class="form-control form-select"
                      :class="{ 'is-invalid': errors['公司人數'] }"
                      rules="required"
                      v-model="company.companyInfo.companySize"
                      @change="chooseDist(company.companyInfo.companySize)"
                    >
                      <option value="" disabled selected>請選擇公司人數</option>
                      <option v-for="size in formData.companySize" :value="size" :key="size">
                        {{ size }}
                      </option>
                    </Field>
                    <ErrorMessage name="縣市" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <!-- 所屬行業 -->
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="companyDataCompanyIndustry" class="labelBox__label form-label"
                        >所屬行業</label
                      >
                      <p class="formTag--must company">必選</p>
                    </div>
                    <Field
                      id="companyDataCompanyIndustry"
                      ref="companyDataCompanyIndustry"
                      name="所屬行業"
                      as="select"
                      class="form-control form-select"
                      :class="{ 'is-invalid': errors['所屬行業'] }"
                      rules="required"
                      v-model="company.companyInfo.companyIndustry"
                      @change="chooseDist(company.companyInfo.companyIndustry)"
                    >
                      <option value="" disabled selected>請選擇所屬行業</option>
                      <option
                        v-for="industry in formData.industryCategories"
                        :value="industry.industryName"
                        :key="industry.industryName"
                      >
                        {{ industry.industryName }}
                      </option>
                    </Field>
                    <ErrorMessage name="所屬行業" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <!-- 公司logo -->
                <div class="col-lg-6">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="companyDataCompanyIndustry" class="labelBox__label form-label"
                        >公司Logo</label
                      >
                    </div>
                    <div class="bg-gray-light rounded p-2 position-relative mb-2">
                      <img class="w-100" :src="company.companyInfo.companyLogoUrl" alt="公司logo" />
                    </div>
                    <div class="d-flex justify-content-end">
                      <button
                        type="button"
                        class="btn btn-outline-gray-line text-dark"
                        @click="openCompanyLogoModal"
                      >
                        變更公司Logo
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex">
                    <div class="form__input me-2">
                      <div class="form__labelBox">
                        <label for="companyDataCompanyCity" class="labelBox__label form-label"
                          >公司地址</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="companyDataCompanyCity"
                        ref="companyDataCompanyCity"
                        name="縣市"
                        as="select"
                        class="form-control form-select w-auto"
                        :class="{ 'is-invalid': errors['縣市'] }"
                        rules="required"
                        v-model="company.companyInfo.addressCity"
                        @change="chooseDist(company.companyInfo.addressCity)"
                      >
                        <option value="" disabled selected>請選擇縣市</option>
                        <option v-for="city in formData.cities" :value="city" :key="city">
                          {{ city }}
                        </option>
                      </Field>
                      <ErrorMessage name="縣市" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="companyDataCompanyDist" class="labelBox__label form-label"
                          >區域鄉鎮</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="companyDataCompanyDist"
                        ref="companyDataCompanyDist"
                        name="區域鄉鎮"
                        as="select"
                        class="form-control form-select w-auto"
                        :class="{ 'is-invalid': errors['區域鄉鎮'] }"
                        rules="required"
                        v-model="company.companyInfo.addressDist"
                        @change="show(company.companyInfo.addressDist)"
                      >
                        <option value="" disabled selected>請選擇區域鄉鎮</option>
                        <option v-for="dist in chooseCityDist" :value="dist" :key="dist">
                          {{ dist }}
                        </option>
                      </Field>
                      <ErrorMessage name="區域鄉鎮" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="compnayDataaddressDetail" class="labelBox__label form-label"
                        >公司詳細地址</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <Field
                      id="compnayDataaddressDetail"
                      ref="compnayDataaddressDetail"
                      name="公司詳細地址"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['公司詳細地址'] }"
                      placeholder="請輸入公司詳細地址"
                      rules="required"
                      v-model="company.companyInfo.addressDetail"
                    ></Field>
                    <ErrorMessage name="公司詳細地址" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <h3 class="pageSubTitle text-dark mb-3" v-if="editMode">主要聯絡人資料</h3>
              <div class="row row-cols-lg-2 row-cols-1">
                <div class="col">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="mainContactName" class="labelBox__label form-label"
                        >聯絡人姓名</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <Field
                      id="mainContactName"
                      ref="mainContactName"
                      name="聯絡人姓名"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['聯絡人姓名'] }"
                      placeholder="請輸入聯絡人姓名"
                      rules="required"
                      v-model="company.mainContact.name"
                    ></Field>
                    <ErrorMessage name="聯絡人姓名" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="mainContactJobTitle" class="labelBox__label form-label"
                        >聯絡人職稱</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <Field
                      id="mainContactJobTitle"
                      ref="mainContactJobTitle"
                      name="聯絡人職稱"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['聯絡人職稱'] }"
                      placeholder="請輸入聯絡人職稱"
                      rules="required"
                      v-model="company.mainContact.jobTitle"
                    ></Field>
                    <ErrorMessage name="聯絡人職稱" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <!-- 電子郵件 -->
                <div class="col">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="mainContactEmail" class="labelBox__label form-label"
                        >電子郵件</label
                      >
                    </div>
                    <input
                      id="mainContactEmail"
                      ref="mainContactEmail"
                      name="電子郵件"
                      type="email"
                      class="form-control"
                      placeholder="請輸入電子郵件"
                      v-model="company.mainContact.email"
                    />
                  </div>
                </div>
                <!-- 聯絡電話 -->
                <div class="col">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="mainContactPhone" class="labelBox__label form-label"
                        >聯絡電話</label
                      >
                    </div>
                    <input
                      id="mainContactPhone"
                      ref="mainContactPhone"
                      name="聯絡電話"
                      type="phone"
                      class="form-control"
                      placeholder="請輸入聯絡電話"
                      v-model="company.mainContact.phone"
                    />
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-gray-light me-2" @click="editMode = false">
                  取消
                </button>
                <button type="submit" class="btn btn-companyColor text-light">保存</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import NavCompanyAdminNav from '@/components/company/NavCompanyAdminNav.vue';

import database from '@/methods/firebaseinit';

export default {
  components: {
    NavCompanyAdminNav,
  },
  data() {
    return {
      date: new Date(),
      nowPage: '企業資料',
      personalState: true,
      settingSideList: '個人資料',
      skillShowStyle: true,
      editMode: false,
      editTemplate: '', // 編輯哪一塊
      formData: {},
      chooseCityDist: [],
      company: {
        companyInfo: {
          companyKey: '50796003',
          companyName: '',
          addressCity: '',
          addressDist: '',
          addressDetail: '',
          companyAddress: '',
          unitNumber: '',
          companySize: '',
          companyIndustry: '',
          companyLogoUrl: 'https://i.imgur.com/nQacvyB.png',
        },
        mainContact: {
          name: '',
          jobTitle: '',
          email: '',
          phone: '',
        },
      },
      tempImgurl: '',
      // rwd
      rwdSelect: '會員方案',
    };
  },
  methods: {
    getImg(data) {
      this.tempImgurl = data;
      this.updateImg();
    },
    updateImg() {
      emitter.emit('spinner-open');
      const item = this.tempImgurl;
      const base64String = item.replace('data:image/jpeg;base64,', '');
      console.log(item);
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
          this.company.companyInfo.companyLogoUrl = res.data.data.link;
          this.saveAllData();
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          console.log(err);
          emitter.emit('spinner-close');
        });
    },
    openCompanyLogoModal() {
      emitter.emit('open-uploadCompanyLogoModal', '公司Logo');
    },
    editTemplateData(txt) {
      this.editMode = true;
      this.editTemplate = txt;
    },
    saveFormData() {
      this.setAddress();
      this.saveAllData();
    },
    closeTemplate() {
      this.editTemplate = '';
      this.editMode = false;
    },
    deleteTemplateData(action, index) {
      if (action === 'workExp') {
        this.user.workExp.works.splice(index, 1);
      } else if (action === 'education') {
        this.user.educationExp.educations.splice(index, 1);
      } else if (action === 'skill') {
        this.user.skills.splice(index, 1);
      }
      this.saveAllData();
      this.getFbData();
    },
    // 保存資料
    saveAllData() {
      const userRef = database.ref('company');
      userRef.set(this.company);
      this.getFbData();
      this.editMode = false;
    },
    // 取得資料
    getFbData() {
      const userRef = database.ref('company');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.company = data;
        }
      });
    },
    setAddress() {
      this.company.companyInfo.companyAddress = `${this.company.companyInfo.addressCity}${this.company.companyInfo.addressDist}${this.company.companyInfo.addressDetail}`;
    },
    chooseDist(cityName) {
      this.chooseCityDist = [];
      this.chooseCityDist = this.formData.districts[cityName].district;
      const [temDist] = this.chooseCityDist;
      this.company.companyInfo.addressDist = temDist;
    },
    // 切換
    toogleData(dataName) {
      if (this[dataName]) {
        this[dataName] = false;
      } else if (!this[dataName]) {
        this[dataName] = true;
      }
    },
  },
  created() {
    this.getFbData();
    this.formData = webData;
    this.chooseCityDist = this.formData.districts['台北市'].district;
    emitter.emit('spinner-open-bg', 800);
  },
};
</script>

<style lang="scss"></style>
