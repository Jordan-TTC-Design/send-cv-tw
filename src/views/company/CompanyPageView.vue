<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container position-relative companyPage">
      <div class="row justify-content-center">
        <!-- 企業資料 -->
        <div class="col-lg-9 col-12">
          <div class="companyInfoBox box--shadow mb-3">
            <div class="d-flex flex-md-row flex-column align-items-md-stretch align-items-center">
              <div class="companyInfoBox__logoImgBox mb-md-0 mb-4 me-md-4">
                <img
                  class="logoImg"
                  :src="company.companyInfo.companyLogoUrl"
                  :alt="`${company.companyInfo.companyName}logo`"
                />
              </div>
              <div class="companyInfoBox__txtBox d-flex flex-column justify-content-center">
                <h2 class="page__title mb-3">{{ company.companyInfo.companyName }}</h2>
                <p class="page__txt mb-2">
                  <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                  >{{ company.companyInfo.companyAddress }}
                </p>
                <p class="page__txt mb-2">
                  <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                  {{ company.companyInfo.companyIndustry }}
                </p>
                <p class="page__txt">
                  <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>
                  {{ company.companyInfo.companySize }}
                </p>
              </div>
            </div>
          </div>
          <div class="companyInfoBox box--shadow mb-3">
            <div class="d-flex mb-3 justify-content-between">
              <h3 class="section__title--sub">
                <span class="tag--doubleCircle me-2"></span>工作照片
              </h3>
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                @click="editCompanyData('companyImgsUrl')"
                :class="{ 'd-none': editDataSection === 'companyImgsUrl' }"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-gray-light text-companyColor"
                @click="newImgInput()"
                v-if="editDataSection === 'companyImgsUrl'"
              >
                新增照片
              </button>
            </div>
            <div v-if="editDataSection !== 'companyImgsUrl'">
              <div
                class="d-flex justify-content-between flex-md-row flex-column"
                v-if="company.companyInfo.companyImgsUrl"
              >
                <template v-for="(item, index) in company.companyInfo.companyImgsUrl" :key="index">
                  <img
                    v-if="item.url !== ''"
                    class="companyPage__companyImage mb-md-0 mb-2 putPointer"
                    :src="item.url"
                    :alt="`${company.companyInfo.companyName}公司圖片${index}`"
                    @click="openImgModal(item.url)"
                  />
                  <div class="emptyCompanyImgBox" v-if="item.url === ''">
                    <img
                      class="emptyCompanyImg"
                      src="https://i.imgur.com/I2erb3u.png"
                      alt="尚未建立公司照片"
                    />
                  </div>
                </template>
              </div>
            </div>
            <div v-if="editDataSection === 'companyImgsUrl'">
              <div class="d-flex w-100 justify-content-between">
                <template
                  v-for="(item, index) in company.companyInfo.companyImgsUrl"
                  :key="`companyImgsUrl${index}`"
                  ><div class="width--33">
                    <ImgInputBoxCompany
                      :imgNumber="index"
                      :mustUpload="index < 1"
                      :inputAction="'muti'"
                      :dataName="'companyImgsUrl'"
                      :tempImgUrl="company.companyInfo.companyImgsUrl[index].url"
                      @send-img-to-page="getImgData"
                    />
                  </div>
                </template>
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-gray-light me-2" @click="closeCompanyDataForm">
                  取消
                </button>
                <button
                  type="button"
                  class="btn btn-companyColor text-light"
                  @click="saveCompanyDataForm"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
          <div class="companyInfoBox box--shadow mb-3">
            <div class="d-flex mb-3 justify-content-between">
              <h3 class="section__title--sub">
                <span class="tag--doubleCircle me-2"></span>公司簡介
              </h3>
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                :class="{ 'd-none': editDataSection === 'companyIntro' }"
                @click="editCompanyData('companyIntro')"
              >
                編輯
              </button>
            </div>
            <div v-if="editDataSection !== 'companyIntro'">
              <div class="page__txt" v-html="company.companyInfo.companyIntro"></div>
              <div
                class="py-5"
                v-if="!company.companyInfo.companyIntro || company.companyInfo.companyIntro === ''"
              >
                <p class="text-secondary text-center">尚未填寫</p>
              </div>
            </div>
            <div v-if="editDataSection === 'companyIntro'">
              <div class="form__input form__infoEditBox mb-4">
                <ckeditor
                  id="companyDataCompanyIntro"
                  ref="companyDataCompanyIntro"
                  name="福利制度"
                  :editor="editor"
                  tag-name="textarea"
                  v-model="company.companyInfo.companyIntro"
                  :config="editorConfigNomal"
                ></ckeditor>
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-gray-light me-2" @click="closeCompanyDataForm">
                  取消
                </button>
                <button
                  type="button"
                  class="btn btn-companyColor text-light"
                  @click="saveCompanyDataForm"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
          <div class="companyInfoBox box--shadow mb-3">
            <div class="pb-5 mb-5 border-bottom border-gray-line">
              <div class="d-flex mb-3 justify-content-between">
                <h3 class="section__title--sub">
                  <span class="tag--doubleCircle me-2"></span>福利制度
                </h3>
                <button
                  type="button"
                  class="btn btn-outline-gray-line btn--text--dark"
                  :class="{ 'd-none': editDataSection === 'welfareContent' }"
                  @click="editCompanyData('welfareContent')"
                >
                  編輯
                </button>
              </div>
              <div v-if="editDataSection !== 'welfareContent'">
                <div class="page__txt" v-html="company.companyInfo.welfareContent"></div>
                <div
                  class="py-5"
                  v-if="
                    !company.companyInfo.welfareContent || company.companyInfo.welfareContent === ''
                  "
                >
                  <p class="text-secondary text-center">尚未填寫</p>
                </div>
              </div>
              <div v-if="editDataSection === 'welfareContent'">
                <div class="form__input form__infoEditBox mb-4">
                  <ckeditor
                    id="companyDataWelfareContent"
                    ref="companyDataWelfareContent"
                    name="福利制度"
                    :editor="editor"
                    tag-name="textarea"
                    v-model="company.companyInfo.welfareContent"
                    :config="editorConfigNomal"
                  ></ckeditor>
                </div>
                <div class="d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-gray-light me-2"
                    @click="closeCompanyDataForm"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    class="btn btn-companyColor text-light"
                    @click="saveCompanyDataForm"
                  >
                    保存
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div class="d-flex mb-3 justify-content-between">
                <h3 class="section__title--sub">
                  <span class="tag--doubleCircle me-2"></span>服務項目
                </h3>
                <button
                  type="button"
                  class="btn btn-outline-gray-line btn--text--dark"
                  :class="{ 'd-none': editDataSection === 'servicesContent' }"
                  @click="editCompanyData('servicesContent')"
                >
                  編輯
                </button>
              </div>
              <div v-if="editDataSection !== 'servicesContent'">
                <div class="page__txt" v-html="company.companyInfo.servicesContent"></div>
                <div
                  class="py-5"
                  v-if="
                    !company.companyInfo.servicesContent ||
                    company.companyInfo.servicesContent === ''
                  "
                >
                  <p class="text-secondary text-center">尚未填寫</p>
                </div>
              </div>
              <div v-if="editDataSection === 'servicesContent'">
                <div class="form__input form__infoEditBox mb-4">
                  <ckeditor
                    id="companyDataServicesContent"
                    ref="companyDataServicesContent"
                    name="福利制度"
                    :editor="editor"
                    tag-name="textarea"
                    v-model="company.companyInfo.servicesContent"
                    :config="editorConfigNomal"
                  ></ckeditor>
                </div>
                <div class="d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-gray-light me-2"
                    @click="closeCompanyDataForm"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    class="btn btn-companyColor text-light"
                    @click="saveCompanyDataForm"
                  >
                    保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-12">
          <ul class="checkList position--sticky--pageTop p-0">
            <li class="checkList__title text-dark">
              <p class="checkList__item__title">公司頁面資料完成度</p>
            </li>
            <li class="checkList__item">
              <p class="checkList__item__title">公司照片</p>
              <i class="jobIcon bi bi-check-circle-fill"
              :class="{'text-companyColor':company.companyInfo.companyImgsUrl[0].url !==''}"
              ></i>
            </li>
            <li class="checkList__item">
              <p class="checkList__item__title">公司簡介</p>
              <i class="jobIcon bi bi-check-circle-fill"
              :class="{'text-companyColor':company.companyInfo.companyIntro !==''}"></i>
            </li>
            <li class="checkList__item">
              <p class="checkList__item__title">福利制度</p>
              <i class="jobIcon bi bi-check-circle-fill"
              :class="{'text-companyColor':company.companyInfo.welfareContent !==''}"></i>
            </li>
            <li class="checkList__item">
              <p class="checkList__item__title">服務項目</p>
              <i class="jobIcon bi bi-check-circle-fill"
              :class="{'text-companyColor':company.companyInfo.servicesContent !==''}"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <CompanyPhotoEdit :userImgUrl="company.companyInfo.companyLogoUrl" @emit-send-img-data="getImg" />
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import CompanyPhotoEdit from '@/components/company/CompanyPhotoEdit.vue';
import ImgInputBoxCompany from '@/components/helpers/ImgInputBoxCompany.vue';

import database from '@/methods/firebaseinit';

export default {
  components: {
    CompanyAdminNav,
    CompanyPhotoEdit,
    ImgInputBoxCompany,
  },
  data() {
    return {
      date: new Date(),
      nowPage: '公司頁面',
      editMode: false,
      editDataSection: '', // 編輯哪一塊
      formData: {},
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
          servicesContent: '',
          companyIntro: '',
          welfareContent: '',
          companyImgsUrl: [{ url: '', key: '' }],
        },
        mainContact: {
          name: '',
          jobTitle: '',
          email: '',
          phone: '',
        },
      },
      tempImgurl: '',
      // 編輯器套件
      editor: ClassicEditor,
      editorConfigNomal: {
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
    getImgData(data) {
      console.log(data);
      if (data.dataName === 'companyImgsUrl') {
        console.log(data.dataName);
        this.company.companyInfo.companyImgsUrl[data.index].url = data.url;
        this.company.companyInfo.companyImgsUrl[data.index].key = data.key;
      }
    },
    checkImgInput() {
      if (this.company.companyInfo.companyImgsUrl) {
        if (this.company.companyInfo.companyImgsUrl.length < 3) {
          for (let i = this.company.companyInfo.companyImgsUrl.length; i < 3; i += 1) {
            console.log(i);
            this.company.companyInfo.companyImgsUrl.push({ url: '', key: '' });
          }
        }
      } else {
        this.company.companyInfo.companyImgsUrl = [
          { url: '', key: '' },
          { url: '', key: '' },
          { url: '', key: '' },
        ];
      }
    },
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
    editCompanyData(txt) {
      this.editDataSection = txt;
      this.editMode = true;
    },
    closeCompanyDataForm() {
      this.editDataSection = '';
      this.editMode = false;
    },
    saveCompanyDataForm() {
      this.saveAllData();
      this.editDataSection = '';
      this.editMode = false;
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
          this.checkImgInput();
        }
      });
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
    emitter.emit('spinner-open-bg', 800);
  },
};
</script>

<style lang="scss"></style>
