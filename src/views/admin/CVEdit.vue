<template>
  <div class="adminPage--py">
    <div class="container">
      <div class="row">
        <div class="col-xxl-9 col-xl-8 col-12">
          <div class="admin__subNav bg-gray-mid align-items-center justify-content-between">
            <h2 class="admin__subNav__title">曾鼎鈞-我的第一份履歷</h2>
            <div class="d-flex">
              <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                <i class="jobIcon me-1 bi bi-cloud-download"></i>預覽履歷
              </button>
              <button type="button" class="btn btn-outline-gray-line text-dark">
                <i class="jobIcon-sm me-1 bi bi-share-fill"></i>履歷設定
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
          <template v-for="(listItem, listIndex) in cvData.cvSectionList" :key="listIndex">
            <div class="cvContainer mb-5">
              <div class="cvContainer__titleBox">
                <h3 class="cvContainer__title" :ref="`expDataTitle--${listIndex}`">
                  <div class="cvContainer__title__tag me-2"></div>
                  {{ listItem.sectionTitle }}
                  <button type="button" class="btn ms-2" @click="editSectionName(listIndex)">
                    <i class="jobIcon bi bi-pencil-square text-dark"></i>
                  </button>
                </h3>
                <div class="d-flex d-none" :ref="`expDataTitle--${listIndex}--edit`">
                  <div class="form__inputBox mb-0 me-2">
                    <input
                      :id="`expDataTitle--${listIndex}--input`"
                      name="標題"
                      type="text"
                      class="form-control h-100"
                      placeholder="請輸入標題"
                      v-model="listItem.sectionTitle"
                    />
                  </div>
                  <button
                    type="button"
                    class="btn btn-gray-light text-dark"
                    @click="saveSectionTitle(listIndex)"
                  >
                    保存
                  </button>
                </div>
                <button
                  type="button"
                  class="btn btn-outline-gray-line text-dark"
                  @click="newTemplateData(listIndex)"
                >
                  新增
                </button>
              </div>
              <template v-for="(item, index) in listItem.sectionDataList" :key="index">
                <CVExpTemplate
                  :tempExpSectionData="item"
                  :formNumber="index"
                  :listNumber="listIndex"
                  @returnExpSectionData="saveExpSectionData"
                  @deleteData="deleteExpSectionData"
                  @reLoadData="getFbData"
                />
              </template>
            </div>
          </template>
        </div>
        <div class="col-xxl-3 col-xl-4 col-12">
          <div class="cvSideBox">
            <div class="cvSideBox__title">
              <p>履歷完成度</p>
              <p>0%</p>
            </div>
            <ul class="cvSideBox__sectionList">
              <li class="list__item">
                <p class="cvSideBox__sectionList__txt">
                  個人資料<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <li class="list__item">
                <p class="cvSideBox__sectionList__txt">
                  自我介紹<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <li class="list__item cvSideBox__sectionList--change">
                <div class="cvSideBox__sectionList__changeBtn"></div>
                <p class="cvSideBox__sectionList__txt">
                  工作經驗<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <li class="list__item cvSideBox__sectionList--change">
                <div class="cvSideBox__sectionList__changeBtn"></div>
                <p class="cvSideBox__sectionList__txt">
                  教育程度<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <li class="list__item cvSideBox__sectionList--change">
                <div class="cvSideBox__sectionList__changeBtn"></div>
                <p class="cvSideBox__sectionList__txt">
                  專業技能<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <li class="list__item cvSideBox__sectionList--change">
                <div class="cvSideBox__sectionList__changeBtn"></div>
                <p class="cvSideBox__sectionList__txt">
                  其他資訊<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <li class="list__item cvSideBox__sectionList--change">
                <div class="cvSideBox__sectionList__changeBtn"></div>
                <p class="cvSideBox__sectionList__txt">
                  我的作品<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <template v-for="(listItem, listIndex) in cvData.cvSectionList" :key="listIndex">
                <li class="list__item cvSideBox__sectionList--change">
                  <div class="cvSideBox__sectionList__changeBtn"></div>
                  <p class="cvSideBox__sectionList__txt">
                    {{ listItem.sectionTitle
                    }}<i
                      class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                    ></i>
                  </p>
                  <DropDownMenu
                    :sendMenuName="`cvSectionList--${listIndex}`"
                    :sendActionName="'特殊經歷'"
                    :sendIndex="listIndex"
                    @deleteData="deleteCvSection"
                  />
                </li>
              </template>
            </ul>
            <div class="cvSideBox__footer">
              <button
                type="button"
                class="btn btn-outline-gray-line text-dark"
                @click="newCvSection"
              >
                新增履歷板塊
              </button>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CVExpTemplate from '@/components/admin/CVExpTemplate.vue';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import database from '@/methods/firebaseinit';
import DropDownMenu from '@/components/helpers/DropDownMenu.vue';

export default {
  components: { CVExpTemplate, UpTopBtn, DropDownMenu },
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
      cvData: {
        cvName: '第一份履歷',
        expSectionList: [{ title: '我的大學經歷', content: '我的' }],
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
      tempExpSectionData: {
        title: '',
        content: '',
        imgUrl: '',
        editorStyle: '',
      },
    };
  },
  watch: {
    date(newValue) {
      const data = Math.ceil(newValue.valueOf() / 1000);
      this.user.account.birthday = data;
      console.dir(this.$filters.date(data));
    },
  },
  methods: {
    saveSectionTitle(listIndex) {
      console.log(this.cvData.cvSectionList[listIndex].sectionTitle);
      if (this.cvData.cvSectionList[listIndex].sectionTitle === '') {
        this.cvData.cvSectionList[listIndex].sectionTitle = '未命名板塊';
      }
      this.editSectionName(listIndex);
      this.saveAllData();
    },
    editSectionName(listIndex) {
      this.$refs[`expDataTitle--${listIndex}--edit`].classList.toggle('d-none');
      this.$refs[`expDataTitle--${listIndex}`].classList.toggle('d-none');
    },
    deleteCvSection(templateData) {
      this.cvData.cvSectionList.splice(templateData.index, 1);
      this.saveAllData();
    },
    deleteExpSectionData(templateData) {
      console.log(templateData);
      const listNum = templateData.listIndex;
      const itemNum = templateData.index;
      console.log(this.cvData.cvSectionList[listNum]);
      this.cvData.cvSectionList[listNum].sectionDataList.splice(itemNum, 1);
      this.saveAllData();
    },
    newTemplateData(listIndex) {
      const obj = {
        title: '',
        content: '',
        imgUrl: '',
        editorStyle: '',
        editMode: true,
      };
      if (this.cvData.cvSectionList[listIndex].sectionDataList) {
        this.cvData.cvSectionList[listIndex].sectionDataList.push(obj);
      } else {
        this.cvData.cvSectionList[listIndex].sectionDataList = [obj];
      }
    },
    // newCvSection() {
    //   this.cvData.cvSectionList = [];
    //   this.cvData.cvSectionList[0] = [
    //     {
    //       sectionTitle: '未命名板塊',
    //       sectionDataList: [
    //         {
    //           title: '',
    //           content: '',
    //           imgUrl: '',
    //           editorStyle: '',
    //         },
    //       ],
    //     },
    //   ];
    //   console.log(this.cvData);
    //   this.saveAllData();
    // },
    newCvSection() {
      this.cvData.cvSectionList[this.cvData.cvSectionList.length] = {
        sectionTitle: '未命名板塊',
        sectionNumber: this.cvData.cvSectionList.length - 1,
        sectionDataList: [
          // {
          //   title: '',
          //   content: '',
          //   imgUrl: '',
          //   editorStyle: '',
          // },
        ],
      };
      console.log(this.cvData);
      this.saveAllData();
    },
    saveExpSectionData(templateData) {
      const listNum = templateData.listIndex;
      const itemNum = templateData.index;
      const { data } = templateData;
      if (templateData.index !== 'new') {
        this.cvData.cvSectionList[listNum].sectionDataList[itemNum] = data;
        // const sectionRef = database.ref(`cvList/0/expSectionList/${templateData.index}`);
        // sectionRef.set(templateData.data);
      } else {
        const obj = {
          title: data.title,
          editorStyle: data.editorStyle,
          imgUrl: data.imgUrl,
          content: data.content,
        };
        this.cvData.cvSectionList[templateData.listIndex].sectionDataList.push(obj);
      }
      this.saveAllData();
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
      const cvRef = database.ref('cvList/0');
      const userRef = database.ref('user');
      cvRef.set(this.cvData);
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
      const cvRef = database.ref('cvList/0');
      cvRef.once('value', (snapshot) => {
        const data = snapshot.val();
        const cv = data;
        this.cvData = cv;
        console.log(this.cvData);
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
