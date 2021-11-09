<template>
  <div class="adminPage--py" v-if="dataReady">
    <Form v-slot="{ errors }" @submit="processUploadAd">
      <div class="admin__subHeader admin__subHeader--edit mb-6 box--shadow">
        <div class="container admin__subNav justify-content-between align-items-center">
          <h2 class="admin__subNav__title me-0">新建廣告-{{ adType }}</h2>
          <div>
            <button
              type="button"
              class="btn btn-outline-gray-line text-dark me-2"
              @click="openPreviewModal"
            >
              預覽廣告
            </button>
            <button
              type="button"
              class="btn btn-outline-gray-line text-dark me-2"
              @click="$router.back(-1)"
            >
              取消
            </button>
            <button type="submit" class="btn btn-companyColor text-light">申請刊登</button>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-12">
            <div class="jobContentSection box--shadow mb-4">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle--company me-2"></span>廣告內容
              </h3>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="adName" class="form__label--custom form-label">廣告標題</label>
                  <p class="formTag--must company">必填</p>
                </div>
                <Field
                  id="adName"
                  ref="adName"
                  name="廣告標題"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['廣告標題'] }"
                  placeholder="請輸入廣告標題"
                  rules="required"
                  v-model="adForm.adName"
                ></Field>
                <ErrorMessage name="廣告標題" class="invalid-feedback"></ErrorMessage>
              </div>
              <ImgInputBoxCompany
                :imgNumber="0"
                :mustUpload="false"
                :inputAction="'single'"
                :dataName="'adImgUrl'"
                :tempImgUrl="adForm.adImgUrl.url"
                @send-img-to-page="getImg"
              />
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="adLinkSetting" class="form__label--custom form-label"
                    >廣告職位連結類型</label
                  >
                </div>
                <div class="d-flex">
                  <div class="form-check me-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="adLinkIn"
                      name="adLinkIn"
                      value="企業頁面"
                      v-model="adForm.adLink.type"
                      :checked="adForm.adLink.type === '企業頁面'"
                    />
                    <label class="form-check-label" for="adLinkIn"> sendCV 企業頁面</label>
                  </div>
                  <div class="form-check me-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="adLinkIn"
                      name="adLinkIn"
                      value="職位頁面"
                      v-model="adForm.adLink.type"
                      :checked="adForm.adLink.type === '職位頁面'"
                    />
                    <label class="form-check-label" for="adLinkIn"> sendCV 職位頁面</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="adLinkIn"
                      name="adLinkIn"
                      value="外部連結"
                      v-model="adForm.adLink.type"
                      :checked="adForm.adLink.type === '外部連結'"
                    />
                    <label class="form-check-label" for="adLinkIn"> 外部連結</label>
                  </div>
                </div>
              </div>
              <div class="form__inputBox" v-if="adForm.adLink.type === '職位頁面'">
                <div class="form__labelBox">
                  <label for="adJobPageLink" class="form__label--custom form-label"
                    >廣告職位連結</label
                  >
                  <p class="formTag--must company">必填</p>
                </div>
                <Field
                  id="adJobPageLink"
                  ref="adJobPageLink"
                  name="廣告職位連結"
                  as="select"
                  class="form-control form-select"
                  :class="{ 'is-invalid': errors['廣告職位連結'] }"
                  v-model="adForm.adLink.link"
                  rules="required"
                >
                  <option value="" disabled selected>請選擇職位</option>
                  <option v-for="item in companyJobList" :value="item.key" :key="item">
                    {{ item.jobName }}
                  </option>
                </Field>
              </div>
              <div class="form__inputBox" v-if="adForm.adLink.type === '外部連結'">
                <div class="form__labelBox">
                  <label for="adOutterLink" class="form__label--custom form-label"
                    >廣告外部連結</label
                  >
                  <p class="formTag--must company">必填</p>
                </div>
                <Field
                  id="adOutterLink"
                  ref="adOutterLink"
                  name="廣告外部連結"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['廣告外部連結'] }"
                  placeholder="請輸入廣告外部連結"
                  rules="required"
                  v-model="adForm.adLink.link"
                ></Field>
                <ErrorMessage name="廣告外部連結" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox form__infoEditBox">
                <div class="form__labelBox">
                  <label for="adContent" class="form__label--custom form-label">廣告內容</label>
                  <p class="formTag--must company">必填</p>
                </div>
                <ckeditor
                  id="adContent"
                  ref="adContent"
                  name="廣告內容"
                  :editor="editor"
                  tag-name="textarea"
                  v-model="adForm.adContent"
                  :config="editorConfig"
                ></ckeditor>
                <Field
                  name="廣告內容"
                  type="text"
                  class="form-control d-none"
                  :class="{ 'is-invalid': errors['廣告內容'] }"
                  placeholder="請輸入"
                  v-model="adForm.adContent"
                  as="textarea"
                  rules="required"
                >
                </Field>
                <ErrorMessage name="廣告內容" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox form__infoEditBox">
                <div class="form__labelBox">
                  <label for="adRemark" class="form__label--custom form-label">廣告備註</label>
                </div>
                <textarea
                  type="textarea"
                  class="form-control chatArea__txtInput"
                  placeholder="如有需要注意的地方，歡迎留下備註"
                  rows="5"
                  v-model="adForm.adRemark"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-12">
            <div class="jobContentSection box--shadow mb-lg-0 mb-3">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle--company me-2"></span>廣告刊登設定
              </h3>
              <div class="mb-2 d-flex align-items-center justify-content-between">
                <p>目前剩餘額度：{{ company.payService.adTokens }}</p>
                <button type="button" class="btn btn-outline-gray-line text-dark">購買額度</button>
              </div>
              <div v-if="adType !== '粉絲專頁廣告'">
                <div class="inputGroup--item mb-3">
                  <div class="form__labelBox">
                    <label for="adToken" class="form__label--custom form-label">使用額度</label>
                    <p class="formTag--must company">必填</p>
                  </div>
                  <div class="fakeInput--counter">
                    <div
                      class="fakeBtn"
                      @click="minusData('大型看板廣告')"
                      :class="{ disActive: adForm.usedToken < 2 }"
                    >
                      <i class="jobIcon bi bi-dash-circle"></i>
                    </div>
                    <p>{{ adForm.usedToken }}</p>
                    <div
                      class="fakeBtn"
                      @click="plusData('大型看板廣告')"
                      :class="{
                        disActive: adForm.usedToken >= company.payService.adTokens,
                      }"
                    >
                      <i class="jobIcon bi bi-plus-circle"></i>
                    </div>
                  </div>
                  <Field
                    id="adToken"
                    ref="adToken"
                    name="使用額度"
                    as="number"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['使用額度'] }"
                    v-model="adForm.usedToken"
                  >
                  </Field>
                  <ErrorMessage name="使用額度" class="invalid-feedback"></ErrorMessage>
                </div>
                <p class="mb-1">收費方式：一個額度推廣 7 天</p>
                <p class="mb-4">起算日期：於刊登日期後連續 7 天</p>
              </div>
              <div class="inputGroup--item mb-3" v-if="adType === '粉絲專頁廣告'">
                <div class="form__labelBox">
                  <label for="adToken" class="form__label--custom form-label">使用額度</label>
                </div>
                <div class="fakeInput--counter p-2 justify-content-center">
                  <p>{{ adForm.usedToken }}</p>
                </div>
                <Field
                  id="adToken"
                  ref="adToken"
                  name="使用額度"
                  as="number"
                  class="form-control d-none"
                  :class="{ 'is-invalid': errors['使用額度'] }"
                  v-model="adForm.usedToken"
                >
                </Field>
                <ErrorMessage name="使用額度" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="adStartDate" class="form__label--custom form-label"
                    >刊登起始日期</label
                  >
                  <p class="formTag--must company">必填</p>
                </div>
                <Field
                  id="adStartDate"
                  ref="adStartDate"
                  name="刊登起始日期"
                  type="date"
                  class="form-control"
                  :class="{ 'is-invalid': errors['刊登起始日期'] }"
                  placeholder="請輸入刊登起始日期"
                  rules="required"
                  v-model="adForm.startDate"
                ></Field>
                <ErrorMessage name="刊登起始日期" class="invalid-feedback"></ErrorMessage>
              </div>
              <p v-if="adType !== '粉絲專頁廣告'">
                注意事項：最快只能選擇申請日三天後開始刊登，如申請日遇到假日則順延。
              </p>
              <p v-if="adType === '粉絲專頁廣告'">
                注意事項：我們將在收到需求後與您聯繫，並按照您的需求製作廣告。
              </p>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
  <AdModal @back-to-list="goToPageLink('/company-admin/service-ad')" />
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emitter from '@/methods/emitter';
import database from '@/methods/firebaseinit';
import ImgInputBoxCompany from '@/components/helpers/ImgInputBoxCompany.vue';
import AdModal from '@/components/company/AdModal.vue';

export default {
  components: {
    AdModal,
    ImgInputBoxCompany,
  },
  data() {
    return {
      adType: '大型版面廣告',
      dataReady: false,
      company: {},
      companyJobList: [],
      adForm: {
        adType: '',
        adState: '審核中',
        usedToken: 1,
        startDate: null,
        adName: '',
        adContent: '',
        adLink: {
          type: '企業頁面',
          link: '',
        },
        adImgUrl: { url: '', key: '' },
        adRemark: '',
      },
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
      cropper: {}, // 套件切圖工具
      tempImgurl: '',
    };
  },
  methods: {
    goToPageLink(routerLink) {
      console.log(routerLink);
      this.$router.push(routerLink);
    },
    uploadAd() {
      this.adForm.adType = this.adType;
      if (this.adForm.adLink.type === '企業頁面') {
        this.adForm.adLink.link = '123445677';
      }
      this.costCompanyAdTokens();
      const newAdListRef = database.ref('company/payService/adList');
      const { key } = newAdListRef.push();
      const obj = this.adForm;
      console.log(this.adForm);
      obj.key = key;
      newAdListRef.child(key).set(obj);
    },
    processUploadAd() {
      const obj = {
        action: '已成功申請刊登廣告',
        data: this.adForm,
      };
      this.uploadAd();
      emitter.emit('open-ad-modal', obj);
    },
    // promote token +1
    plusData(dataName) {
      if (dataName === '大型看板廣告') {
        if (this.adForm.usedToken < this.company.payService.adTokens) {
          this.adForm.usedToken += 1;
        }
      } else if (dataName === '粉絲專頁廣告') {
        if (this.adForm.usedToken < this.company.payService.bannerTokens) {
          this.adForm.usedToken += 1;
        }
      }
    },
    // promote token -1
    minusData(dataName) {
      if (dataName === '大型看板廣告') {
        if (this.adForm.usedToken > 1) {
          this.adForm.usedToken -= 1;
        }
      } else if (dataName === '粉絲專頁廣告') {
        if (this.adForm.usedToken < this.company.payService.bannerTokens) {
          this.adForm.usedToken += 1;
        }
      }
    },
    // If user use promote, It will cost token.
    costCompanyAdTokens() {
      this.company.payService.adTokens -= this.adForm.usedToken;
      const companyRef = database.ref('company/payService');
      companyRef.set(this.company.payService);
    },
    openPreviewModal() {
      const obj = {
        action: '廣告預覽',
        data: this.adForm,
      };
      emitter.emit('open-ad-modal', obj);
    },
    // Get img data form Cropper modal.
    getImg(data) {
      console.log(data);
      this.adForm.adImgUrl.url = data.url;
      this.adForm.adImgUrl.key = data.key;
    },
    // Get company data from Firebase.
    getCompanyData() {
      const companyRef = database.ref('company');
      companyRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.company = data;
          this.dataReady = true;
          this.filterJob(this.company.jobList);
        }
      });
    },
    filterJob(data) {
      this.companyJobList = [];
      Object.keys(data).forEach((item) => {
        // 物件轉陣列
        this.companyJobList.push(data[item]);
      });
    },
    checkAdType() {
      const { type } = this.$route.params;
      if (type === 'banner') {
        this.adType = '粉絲專頁廣告';
        this.adForm.usedToken = 2;
      } else if (type === 'web-ad-big') {
        this.adType = '大型版面廣告';
      } else if (type === 'web-ad-md') {
        this.adType = '一般版面廣告';
      } else if (type === 'web-ad-sm') {
        this.adType = '小型版面廣告';
      }
    },
  },
  created() {
    this.checkAdType();
    this.getCompanyData();
    emitter.emit('spinner-open-bg', 500);
  },
};
</script>

<style lang="scss"></style>
