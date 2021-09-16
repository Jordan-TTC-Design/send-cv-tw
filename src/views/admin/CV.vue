<template>
  <div class="adminPage--py">
    <div class="container">
      <div class="row">
        <div class="col-9">
          <div class="admin__subNav bg-gray-mid align-items-center justify-content-between">
            <h2 class="admin__subNav__title">曾鼎鈞-我的第一份履歷</h2>
            <div class="d-flex">
              <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                <i class="jobIcon me-1 bi bi-cloud-download"></i>下載履歷
              </button>
              <button type="button" class="btn btn-outline-gray-line text-dark">
                <i class="jobIcon-sm me-1 bi bi-share-fill"></i>分享連結
              </button>
            </div>
          </div>
          <div class="cvContainer mb-5">
            <div class="cvContainer__titleBox mb-5">
              <h3 class="cvContainer__title">
                <div class="cvContainer__title__tag me-2"></div>
                個人資訊
              </h3>
            </div>
            <h4 class="mb-1 text-dark">曾鼎鈞</h4>
            <p class="mb-1">UIUX Designer</p>
            <p class="mb-1">1992.01.01</p>
            <p class="mb-1">jordan.ttc.design@talentgroup.asia</p>
            <p class="mb-1">0987654321</p>
            <p class="mb-1">台北市，大安區</p>
          </div>
          <div class="cvContainer mb-5">
            <div class="cvContainer__titleBox">
              <h3 class="cvContainer__title">
                <div class="cvContainer__title__tag me-2"></div>
                工作經驗
              </h3>
            </div>
            <ul>
              <template v-for="(tempItem, index) in user.workExp.works" :key="index">
                <li class="col-12">
                  <div
                    class="infoList__item infoList__item--job"
                    :ref="`workExp--${index}`"
                    :class="{
                      'd-none': editTemplate === `editWorkExp--${index}`,
                      'list--last': index === user.workExp.works.length - 1,
                    }"
                  >
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <div class="d-flex">
                          <p class="infoList__item__jobTitle mb-1 me-2">
                            {{ tempItem.companyName }}
                          </p>
                          <p class="infoList__item__jobTitle mb-1">
                            <span class="me-2">-</span>{{ tempItem.jobName }}
                          </p>
                        </div>
                        <p class="infoList__item__subTitle mb-3">
                          {{ `${tempItem.startYear}.${tempItem.startMonth}` }} ~
                          {{
                            tempItem.isStillWork
                              ? '仍在職'
                              : `${tempItem.endYear}.${tempItem.endMonth}`
                          }}
                        </p>
                      </div>
                      <div class="dropdown">
                        <button
                          class="btn position-relative"
                          type="button"
                          :id="`dropdownMenuButton--workExp--${index}`"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          :disabled="editMode"
                        >
                          <i class="jobIcon bi bi-three-dots"></i>
                        </button>
                        <ul
                          :ref="`dropDownMenu--${index}`"
                          class="dropDownMenu dropdown-menu"
                          :aria-labelledby="`dropdownMenuButton--workExp--${index}`"
                        >
                          <li
                            class="dropDownMenu__item"
                            @click="editTemplateData(`editWorkExp--${index}`)"
                          >
                            編輯
                          </li>
                          <li class="dropDownMenu__item">調整排序</li>
                          <li
                            class="dropDownMenu__item"
                            @click="deleteTemplateData('workExp', index)"
                          >
                            刪除
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="infoList__item__contentBox">
                      <p class="contentBox__title mb-1">職務內容與成就</p>
                      <div class="infoList__item__content" v-html="tempItem.jobContent"></div>
                    </div>
                  </div>
                </li>
              </template>
            </ul>
          </div>
          <div class="cvContainer mb-5">
            <div class="cvContainer__titleBox">
              <h3 class="cvContainer__title">
                <div class="cvContainer__title__tag me-2"></div>
                學歷
              </h3>
            </div>
            <ul>
              <template v-for="(tempItem, index) in user.educationExp.educations" :key="index">
                <li class="col-12">
                  <div
                    class="infoList__item infoList__item--job"
                    :ref="`educationExp--${index}`"
                    :class="{
                      'd-none': editTemplate === `editEducationExp--${index}`,
                      'list--last': index === user.educationExp.educations.length - 1,
                    }"
                  >
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__jobTitle mb-1">
                          {{ tempItem.schoolName }} - {{ tempItem.majorName }}
                        </p>
                        <p class="infoList__item__subTitle mb-3">
                          {{ `${tempItem.startYear}.${tempItem.startMonth}` }} ~
                          {{
                            tempItem.isStillAtSchool
                              ? '仍在學'
                              : `${tempItem.endYear}.${tempItem.endMonth}`
                          }}
                          <span class="ms-2 text-secondary">{{ tempItem.educationLevel }}</span>
                        </p>
                      </div>
                      <div class="dropdown">
                        <button
                          class="btn position-relative"
                          type="button"
                          :id="`dropdownMenuButton--education--${index}`"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          :disabled="editMode"
                        >
                          <i class="jobIcon bi bi-three-dots"></i>
                        </button>
                        <ul
                          :ref="`dropDownMenu--${index}`"
                          class="dropDownMenu dropdown-menu"
                          :aria-labelledby="`dropdownMenuButton--education--${index}`"
                        >
                          <li
                            class="dropDownMenu__item"
                            @click="editTemplateData(`editEducationExp--${index}`)"
                          >
                            編輯
                          </li>
                          <li class="dropDownMenu__item">調整排序</li>
                          <li
                            class="dropDownMenu__item"
                            @click="deleteTemplateData('education', index)"
                          >
                            刪除
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="infoList__item__contentBox">
                      <p class="contentBox__title mb-1">學習專業與經歷</p>
                      <div class="infoList__item__content" v-html="tempItem.educationContent"></div>
                    </div>
                  </div>
                </li>
              </template>
            </ul>
          </div>
          <div class="cvContainer mb-5">
            <div class="cvContainer__titleBox">
              <h3 class="cvContainer__title">
                <div class="cvContainer__title__tag me-2"></div>
                專業技能
              </h3>
            </div>
            <div
              ref="languageData"
              class="infoList__item show--compressed"
              :class="{ 'd-none': editTemplate === 'editLanguage' }"
            >
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="infoList__item__title">語言</p>
                  <ul class="infoList__item__skillList">
                    <template v-for="(item, index) in user.languages" :key="index">
                      <li class="infoList__item__skillList__skill">
                        <p>{{ item.name }} - {{ item.languageLevel }}</p>
                      </li>
                    </template>
                  </ul>
                </div>
                <div class="dropdown">
                  <button
                    class="btn position-relative"
                    type="button"
                    :id="`dropdownMenuButton--language`"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    :disabled="editMode"
                  >
                    <i class="jobIcon bi bi-three-dots"></i>
                  </button>
                  <ul
                    :ref="`dropDownMenu--language`"
                    class="dropDownMenu dropdown-menu"
                    :aria-labelledby="`dropdownMenuButton--language`"
                  >
                    <li class="dropDownMenu__item" @click="editTemplateData(`editLanguage`)">
                      編輯
                    </li>
                    <li class="dropDownMenu__item">調整排序</li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              class="infoList__item show--compressed"
              :class="{ 'd-none': editTemplate === 'editLicense' }"
            >
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="infoList__item__title">證照</p>
                  <ul class="infoList__item__skillList">
                    <template v-for="(item, index) in user.licenses" :key="index">
                      <li class="infoList__item__skillList__skill">
                        <p>{{ item.name }}</p>
                      </li>
                    </template>
                  </ul>
                </div>
                <div class="dropdown">
                  <button
                    class="btn position-relative"
                    type="button"
                    :id="`dropdownMenuButton--license`"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    :disabled="editMode"
                  >
                    <i class="jobIcon bi bi-three-dots"></i>
                  </button>
                  <ul
                    :ref="`dropDownMenu--license`"
                    class="dropDownMenu dropdown-menu"
                    :aria-labelledby="`dropdownMenuButton--license`"
                  >
                    <li class="dropDownMenu__item" @click="editTemplateData(`editLicense`)">
                      編輯
                    </li>
                    <li class="dropDownMenu__item">調整排序</li>
                  </ul>
                </div>
              </div>
            </div>
            <ul class="infoList__item__skillList">
              <template v-for="(skill, index) in user.skills" :key="index">
                <li
                  class="infoList__item show--compressed"
                  :class="{
                    'd-none': editTemplate === `editSkill--${index}`,
                    'list--last': index === user.skills.length - 1,
                  }"
                >
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <p class="infoList__item__title">{{ skill.groupName }}</p>
                      <ul class="infoList__item__skillList">
                        <template v-for="item in skill.skillList" :key="item.name">
                          <li class="infoList__item__skillList__skill">
                            <p>{{ item.name }}</p>
                          </li>
                        </template>
                      </ul>
                    </div>
                    <div class="dropdown">
                      <button
                        class="btn position-relative"
                        type="button"
                        :id="`dropdownMenuButton--skill--${index}`"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        :disabled="editMode"
                      >
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                      <ul
                        :ref="`dropDownMenu--${index}`"
                        class="dropDownMenu dropdown-menu"
                        :aria-labelledby="`dropdownMenuButton--skill--${index}`"
                      >
                        <li
                          class="dropDownMenu__item"
                          @click="editTemplateData(`editSkill--${index}`)"
                        >
                          編輯
                        </li>
                        <li class="dropDownMenu__item">調整排序</li>
                        <li class="dropDownMenu__item" @click="deleteTemplateData('skill', index)">
                          刪除
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import database from '@/methods/firebaseinit';

export default {
  data() {
    return {
      date: new Date(),
      nowPage: '基本資料',
      personalState: true,
      settingSideList: '個人資料',
      skillShowStyle: true,
      editMode: false,
      editTemplate: '', // 編輯哪一塊
      formData: {},
      chooseCityDist: [],
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
      tempWorkExp: {},
      tempEducation: {},
      tempSkill: {},
      tempLanguage: {},
      tempLicense: '',
      // 編輯器套件
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
    saveEditTemplateData() {
      this.editTemplate = '';
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
      const userRef = database.ref('user');
      userRef.set(this.user);
      this.getFbData();
      this.editMode = false;
    },
    // 取得資料
    getFbData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = data;
      });
    },
    choose(cityName) {
      this.chooseCityDist = [];
      this.chooseCityDist = this.formData.districts[cityName].district;
      const [temDist] = this.chooseCityDist;
      this.user.account.addressDist = temDist;
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
