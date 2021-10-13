<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container position-relative">
      <div class="row justify-content-center">
        <!-- 會員方案 -->
        <div class="col-4">
          <div class="admin__mainContent">
            <div class="d-flex align-items-start justify-content-between">
              <h3 class="admin__mainContent__title">會員方案</h3>
              <p class="px-4 py-2 bg-companyColor d-block text-light rounded-pill">基本方案</p>
            </div>
            <ul class="person__infoBox mb-5">
              <li class="person__infoBox__item mb-2">
                <p class="person__subTxt">方案名稱</p>
                <p class="person__txt">基本方案</p>
              </li>
              <li class="person__infoBox__item mb-2">
                <p class="person__subTxt">起始日期</p>
                <p class="person__txt">2021年5月20日</p>
              </li>
              <li class="person__infoBox__item mb-2">
                <p class="person__subTxt">方案費用</p>
                <p class="person__txt">1200 NTD</p>
              </li>
              <li class="person__infoBox__item mb-2">
                <p class="person__subTxt">付款資訊</p>
                <p class="person__txt">每月自動扣款</p>
              </li>
              <li class="person__infoBox__item mb-2">
                <p class="person__subTxt">付款方式</p>
                <p class="person__txt">信用卡</p>
              </li>
              <li class="person__infoBox__item mb-2 flex-column">
                <p class="person__subTxt mb-2">方案內容</p>
                <ul class="rounded p-3 bg-gray-light">
                  <li class="mb-1">無限制職位刊登數量</li>
                  <li class="mb-1">搜尋 SendCV 上的所有人才</li>
                  <li class="mb-1">推廣您新刊登的職位</li>
                  <li class="mb-1">一般版面廣告</li>
                  <li class="mb-1">設計在社群平台發布的廣告畫面</li>
                  <li>職位推廣額度 x3</li>
                </ul>
              </li>
            </ul>
            <button type="button" class="btn btn-gray-light w-100">變更方案</button>
          </div>
        </div>
        <!-- 企業資料 -->
        <div class="col-lg-8 col-12">
          <div class="admin__mainContent">
            <h3 class="admin__mainContent__title">企業基本資料</h3>
            <div class="admin__mainContent__btnBox">
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                @click="editMode = true"
                v-if="!editMode"
              >
                編輯
              </button>
            </div>
            <ul class="row mb-6 infoList--company" v-if="!editMode">
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
              <li class="col-12">
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
            <h3 class="admin__mainContent__title" v-if="!editMode">主要聯絡人資料</h3>
            <ul class="row infoList--company" v-if="!editMode">
              <li class="col-6">
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
              <li class="col-6">
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
              <li class="col-6">
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
              <li class="col-6">
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
                <div class="col-lg-6 col-12">
                  <!-- 公司名稱 -->
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="companyDataName" class="form__label--custom form-label"
                        >企業名稱</label
                      >
                      <p class="formTag--must">必填</p>
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
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="companyDataUnitNumber" class="form__label--custom form-label"
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
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="companyDataCompanySize" class="form__label--custom form-label"
                        >公司人數</label
                      >
                      <p class="formTag--must">必選</p>
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
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="companyDataCompanyIndustry" class="form__label--custom form-label"
                        >所屬行業</label
                      >
                      <p class="formTag--must">必選</p>
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
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="companyDataCompanyIndustry" class="form__label--custom form-label"
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
                    <div class="form__inputBox me-2">
                      <div class="form__labelBox">
                        <label for="companyDataCompanyCity" class="form__label--custom form-label"
                          >公司地址</label
                        >
                        <p class="formTag--must">必填</p>
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
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="companyDataCompanyDist" class="form__label--custom form-label"
                          >區域鄉鎮</label
                        >
                        <p class="formTag--must">必填</p>
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
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="compnayDataaddressDetail" class="form__label--custom form-label"
                        >公司詳細地址</label
                      >
                      <p class="formTag--must">必填</p>
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
              <h3 class="admin__mainContent__title" v-if="editMode">主要聯絡人資料</h3>
              <div class="row">
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="mainContactName" class="form__label--custom form-label"
                        >聯絡人姓名</label
                      >
                      <p class="formTag--must">必填</p>
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
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="mainContactJobTitle" class="form__label--custom form-label"
                        >聯絡人職稱</label
                      >
                      <p class="formTag--must">必填</p>
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
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="mainContactEmail" class="form__label--custom form-label"
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
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="mainContactPhone" class="form__label--custom form-label"
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
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-gray-light me-2" @click="editMode = false">
                    取消
                  </button>
                  <button type="submit" class="btn btn-companyColor text-light">保存</button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CompanyPhotoEdit :userImgUrl="company.companyInfo.companyLogoUrl" @emit-send-img-data="getImg" />
</template>

<script>
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import CompanyPhotoEdit from '@/components/company/CompanyPhotoEdit.vue';

import database from '@/methods/firebaseinit';

export default {
  components: {
    CompanyAdminNav,
    CompanyPhotoEdit,
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
      user: {
        account: {
          chineseName: '',
          EnglishName: '',
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
        workExp: {
          years: 0,
          works: [],
        },
        educationExp: {
          lastestEducation: '',
          educations: [],
        },
        languages: [],
        licenses: [],
        skill: [],
        others: {
          driverLicenses: [],
          identities: [],
          militaryServices: [],
        },
        career: {
          workType: [],
          workTime: [],
          targetJobs: [],
          targetIndustries: [],
          targetPlaces: [],
          expat: null,
          salaryRange: {
            lowest: 0,
            highest: 0,
            interview: null,
          },
        },
      },
      tempImgurl: '',
      tempWorkExp: {},
      tempEducation: {},
      tempSkill: {},
      tempLanguage: {},
      tempLicense: '',
      tempSkillList: { groupName: '', skillList: [] },
    };
  },
  watch: {
    date(newValue) {
      const data = Math.ceil(newValue.valueOf() / 1000);
      this.user.account.birthday = data;
      console.log(data);
      console.dir(this.$filters.date(data));
      console.log(data);
    },
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
    saveWorkExpData(obj) {
      if (obj.num === 'new') {
        this.user.workExp.works.push(obj.data);
      } else {
        this.user.workExp.works[obj.num] = obj.data;
      }
      this.saveAllData();
      this.closeTemplate();
    },
    saveSkillData(obj) {
      if (obj.num === 'new') {
        this.user.skills.push(obj.data);
      } else {
        this.user.skills[obj.num] = obj.data;
      }
      this.saveAllData();
      this.closeTemplate();
    },
    saveEducationExpData(obj) {
      if (obj.num === 'new') {
        this.user.educationExp.educations.push(obj.data);
      } else {
        this.user.educationExp.educations[obj.num] = obj.data;
      }
      this.saveAllData();
      this.closeTemplate();
    },
    saveLanguageData(obj) {
      this.user.languages = obj;
      this.saveAllData();
      this.closeTemplate();
    },
    saveLicenseData(obj) {
      this.user.licenses = obj;
      this.saveAllData();
      this.closeTemplate();
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
    // 切換頁面
    selectListItem(navName) {
      this.settingSideList = navName;
      this.closeTemplate();
    },
    // 編輯其他資訊
    openSettingModal(action) {
      const obj = {
        action,
        user: this.user,
      };
      emitter.emit('open-setting-career-modal', obj);
    },
    defaultTempData() {
      this.tempWorkExp = {
        companyName: '',
        jobName: '',
        jobContent: '',
        startYear: null,
        startMonth: null,
        endYear: null,
        endMonth: null,
        isStillWork: false,
      };
      this.tempEducation = {
        schoolName: '',
        majorName: '',
        educationContent: '',
        educationLevel: null,
        startYear: null,
        startMonth: null,
        endYear: null,
        endMonth: null,
        isStillAtSchool: false,
      };
      this.tempSkill = {
        name: '',
        otherSupport: '',
      };
      this.tempSkillList = { groupName: '', skillList: [] };
      this.tempLanguage = {
        name: '',
        languageLevel: null,
        otherSupport: '',
      };
    },
  },
  created() {
    this.getFbData();
    this.formData = webData;
    this.chooseCityDist = this.formData.districts['台北市'].district;
    emitter.emit('spinner-open-bg', 800);
    this.defaultTempData();
  },
};
</script>

<style lang="scss"></style>
