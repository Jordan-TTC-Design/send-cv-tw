<template>
  <div class="page--py">
    <div class="container">
      <div class="row justify-content-center">
        <div :class="{ 'col-10': formStep < 4, 'col-6': formStep === 4 }">
          <div class="applyContainer p-5 pt-6 flex-column">
            <div
              class="d-flex flex-column align-items-center border-bottom border-gray-line mb-5"
              v-if="formStep < 4"
            >
              <div class="titleBox">
                <div class="tag--doubleCircle me-2"></div>
                <h2 class="titleBox__title">寫郵件 SendCV</h2>
              </div>
              <div class="addProcess mb-6 w-100" v-if="formStep >= 1 && formStep <= 3">
                <div class="row justify-content-center d-md-flex d-none">
                  <div class="col-lg-2 col-md-3">
                    <div
                      class="addProcessBox addProcessBox--inner py-2"
                      ref="addProcessBox--1"
                      :class="{ completed: formStep > 1 }"
                    >
                      <h5 class="addProcessBox__title">1</h5>
                      <p class="addProcessBox__txt">填寫職位資料</p>
                      <div class="icon--okBox">
                        <div class="icon--okBox__innerBox">
                          <i class="jobIcon bi bi-check-lg"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-3">
                    <div
                      class="addProcessBox addProcessBox--inner py-2"
                      ref="addProcessBox--2"
                      :class="{ completed: formStep > 2, unActive: formStep < 2 }"
                    >
                      <h5 class="addProcessBox__title">2</h5>
                      <p class="addProcessBox__txt">設定公司地址</p>
                      <div class="icon--okBox">
                        <div class="icon--okBox__innerBox">
                          <i class="jobIcon bi bi-check-lg"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-3">
                    <div
                      class="addProcessBox addProcessBox--inner py-2"
                      ref="addProcessBox--3"
                      :class="{ completed: formStep > 3, unActive: formStep < 3 }"
                    >
                      <h5 class="addProcessBox__title">3</h5>
                      <p class="addProcessBox__txt">選擇履歷資料</p>
                      <div class="icon--okBox">
                        <div class="icon--okBox__innerBox">
                          <i class="jobIcon bi bi-check-lg"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Form
              ref="sendFormInfoForm1"
              v-if="formStep === 1"
              @submit="changeStep('next')"
              v-slot="{ errors }"
            >
              <h3 class="section__title--sub mb-4">
                <span class="tag--doubleCircle me-2"></span>職位資訊
              </h3>
              <div class="row mb-0">
                <div class="col-md-6 col-12">
                  <!-- 公司名稱(必填) -->
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="sendFormInfoCompanyName" class="labelBox__label">公司名稱</label>
                      <p class="formTag--must">必填</p>
                    </div>
                    <Field
                      id="sendFormInfoCompanyName"
                      name="公司名稱"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['公司名稱'] }"
                      placeholder="請輸入公司名稱"
                      rules="required"
                      v-model="form.companyInfo.companyName"
                      ref="sendFormInfoCompanyName"
                    ></Field>
                    <ErrorMessage name="公司名稱" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-md-6">
                  <!-- 公司email(必填) -->
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="sendFormInfoCompanyEmail" class="labelBox__label"
                        >公司Email</label
                      >
                      <p class="formTag--must">必填</p>
                    </div>
                    <Field
                      id="sendFormInfoCompanyEmail"
                      name="公司Email"
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': errors['公司Email'] }"
                      placeholder="請輸入公司Email"
                      rules="required"
                      v-model="form.companyInfo.companyEmail"
                      ref="sendFormInfoCompanyEmail"
                    ></Field>
                    <ErrorMessage name="公司Email" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-md-6">
                  <!-- 職位名稱(必填) -->
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="sendFormInfoJobName" class="labelBox__label">職位名稱</label>
                      <p class="formTag--must">必填</p>
                    </div>
                    <Field
                      id="sendFormInfoJobName"
                      name="職位名稱"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['職位名稱'] }"
                      placeholder="請輸入職位名稱"
                      rules="required"
                      v-model="form.jobName"
                      ref="sendFormInfoJobName"
                    ></Field>
                    <ErrorMessage name="職位名稱" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form__input form__infoEditBox">
                    <div class="form__labelBox">
                      <label for="sendFormInfoJobContent" class="labelBox__label me-2"
                        >職位內容</label
                      >
                      <p class="subTxt">(可幫助企業了解您對職位的認知與期待)</p>
                    </div>
                    <ckeditor
                      id="sendFormInfoJobContent"
                      ref="sendFormInfoJobContent"
                      name="職位內容"
                      :editor="editor"
                      tag-name="textarea"
                      v-model="form.jobContent"
                      :config="editorConfigNomal"
                    ></ckeditor>
                  </div>
                </div>
                <div class="col-12">
                  <div class="formStepBtnBox d-flex justify-content-between">
                    <button type="button" class="btn btn-gray-light text-dark me-2">
                      取消申請
                    </button>
                    <button type="submit" class="btn btn-primary">下一步</button>
                  </div>
                </div>
              </div>
            </Form>
            <Form
              ref="sendFormInfoForm2"
              v-if="formStep === 2"
              @submit="changeStep('next')"
              v-slot="{ errors }"
            >
              <h3 class="section__title--sub mb-4">
                <span class="tag--doubleCircle me-2"></span>公司地址
              </h3>
              <div class="row">
                <div class="col-md-6 col-12 mb-4">
                  <div class="mapBox">
                    <img class="mapBox__map" src="https://i.imgur.com/B1ILMKo.png" alt="" />
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="d-flex">
                    <div class="form__input me-2">
                      <div class="form__labelBox">
                        <label for="sendFormInfoCompanyCity" class="labelBox__label"
                          >公司地址</label
                        >
                        <p class="formTag--must">必填</p>
                      </div>
                      <Field
                        id="sendFormInfoCompanyCity"
                        ref="sendFormInfoCompanyCity"
                        name="縣市"
                        as="select"
                        class="form-control form-select w-auto mb-2"
                        :class="{ 'is-invalid': errors['縣市'] }"
                        rules="required"
                        v-model="form.jobAddress.addressCity"
                        @change="chooseDist(form.jobAddress.addressCity)"
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
                        <label for="sendFormInfoCompanyDist" class="labelBox__label"
                          >區域鄉鎮</label
                        >
                        <p class="formTag--must">必填</p>
                      </div>
                      <Field
                        id="sendFormInfoCompanyDist"
                        ref="sendFormInfoCompanyDist"
                        name="區域鄉鎮"
                        as="select"
                        class="form-control form-select w-auto mb-2"
                        :class="{ 'is-invalid': errors['區域鄉鎮'] }"
                        rules="required"
                        v-model="form.jobAddress.addressDist"
                      >
                        <option value="" disabled selected>請選擇區域鄉鎮</option>
                        <option v-for="dist in chooseCityDist" :value="dist" :key="dist">
                          {{ dist }}
                        </option>
                      </Field>
                      <ErrorMessage name="區域鄉鎮" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="form__input w-100">
                    <div class="form__labelBox">
                      <label for="sendFormInfoCompanyDatail" class="labelBox__label"
                        >公司詳細地址</label
                      >
                      <p class="formTag--must">必填</p>
                    </div>
                    <Field
                      id="sendFormInfoCompanyDatail"
                      name="公司詳細地址"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['公司詳細地址'] }"
                      placeholder="請輸入公司詳細地址"
                      rules="required"
                      v-model="form.jobAddress.addressDetail"
                      ref="sendFormInfoCompanyDatail"
                    ></Field>
                    <ErrorMessage name="公司詳細地址" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-12">
                  <div class="formStepBtnBox d-flex justify-content-between">
                    <button type="button" class="btn btn-gray-light text-dark me-2">
                      取消申請
                    </button>
                    <div class="d-flex">
                      <button
                        type="button"
                        class="btn btn-gray-light text-dark me-2"
                        @click="changeStep('back')"
                      >
                        上一步
                      </button>
                      <button type="submit" class="btn btn-primary">下一步</button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
            <Form
              ref="sendFormInfoForm3"
              v-if="formStep === 3"
              @submit="sendApply"
              v-slot="{ errors }"
            >
              <h3 class="section__title--sub mb-4">
                <span class="tag--doubleCircle me-2"></span>求職者申請資訊
              </h3>
              <div class="row">
                <div class="col-md-8 mb-4">
                  <!-- 履歷 -->
                  <div class="docSelector h-100">
                    <div class="docSelector__titleBox mb-2">
                      <p>履歷</p>
                      <p class="formTag--must">必選</p>
                    </div>
                    <div class="docSelector__contentBox overFlow--x">
                      <template v-for="(item, index) in docData.cvList" :key="index">
                        <div
                          class="scvCard flex-row me-4 flex-shrink-0 putPointer align-items-center"
                          @click="form.document.cvKey = item.cvKey"
                        >
                          <div class="scvCard__body flex-grow-1 h-100">
                            <p class="scvCard__title mb-2">{{ item.cvName }}</p>
                            <p class="scvCard__subTxt mb-3">{{ $filters.date(item.cvKey) }}</p>
                            <div class="form-check my-auto mb-0">
                              <input
                                class="form-check-input mt-0"
                                type="radio"
                                :value="item.cvKey"
                                v-model="form.document.cvKey"
                              />
                            </div>
                          </div>
                          <img class="scvCard__img m-3 ms-0" :src="item.cvImgUrl" alt="CV封面" />
                        </div>
                      </template>
                    </div>
                    <Field
                      id="applyJobCvData"
                      ref="applyJobCvData"
                      name="履歷"
                      type="select"
                      class="form-control d-none"
                      :class="{ 'is-invalid': errors['履歷'] }"
                      v-model="form.document.cvKey"
                      rules="required"
                    ></Field>
                    <ErrorMessage name="履歷" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-md-4 mb-4">
                  <!-- 自我介紹 -->
                  <div class="docSelector h-100">
                    <div class="docSelector__titleBox mb-2 position-relative">
                      <p>自我介紹</p>
                      <div class="form-check position-absolute top-0 end-0 pe-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="顯示"
                          id="applyJobIntroVideo"
                          v-model="form.document.introVideo.is_enabled"
                        />
                        <label class="form-check-label text-nowrap" for="applyJobIntroVideo">
                          顯示
                        </label>
                      </div>
                    </div>
                    <div class="docSelector__contentBox">
                      <template v-for="(item, index) in docData.videoList" :key="index">
                        <div class="scvCard w-100 mb-0" v-if="item.introSelect">
                          <img
                            style="height: 96px"
                            class="scvCard__img--top"
                            :src="item.imgUrl"
                            alt="影片封面"
                          />
                          <div class="scvCard__body p-2">
                            <p class="scvCard__title mb-0">{{ item.title }}</p>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="docSelector mb-4">
                    <div class="docSelector__titleBox mb-2">
                      <p class="me-2">求職信</p>
                      <p class="subTxt">(可使用文字模板快速建立求職信)</p>
                    </div>
                    <div class="docSelector__contentBox">
                      <div
                        v-for="(item, index) in docData.coverLetterList"
                        :key="index"
                        class="scvCard scvCard--coverLetter mb-0 me-3"
                        @click="useThisTempalte(index)"
                      >
                        <div class="scvCard__body">
                          <div class="d-flex justify-content-between align-items-center mb-2">
                            <p class="scvCard__title">{{ item.title }}</p>
                            <div class="form-check">
                              <input
                                class="form-check-input mt-0"
                                type="checkbox"
                                value="顯示"
                                id="applyJobIntroVideo"
                                v-model="item.select"
                              />
                            </div>
                          </div>
                          <div class="scvCard__txtContent subTxt" v-html="item.content"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__input form__infoEditBox mb-1">
                    <div class="form__labelBox">
                      <label for="coverLetterContent" class="labelBox__label">求職信內容</label>
                    </div>
                    <div class="textarea--tag">
                      <ul class="textarea--tag__tagList">
                        <li><p class="jobTag jobTag--letter me-2">職位標籤</p></li>
                        <li><p class="jobTag jobTag--letter">公司標籤</p></li>
                      </ul>
                      <ckeditor
                        id="coverLetterContent"
                        ref="coverLetterContent"
                        name="求職信內容"
                        :editor="editor"
                        tag-name="textarea"
                        class="form-control textarea--tag__inputBox"
                        v-model="form.document.coverLetter.title"
                        :config="editorConfig"
                      ></ckeditor>
                    </div>
                  </div>
                  <div class="d-flex">
                    <div class="form-check me-4" v-if="coverLetterSaveOld.show">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="coverLetterSaveOld"
                        @change="changeCoverLetter('old')"
                        v-model="coverLetterSaveOld.replace"
                      />
                      <label class="form-check-label text-nowrap" for="coverLetterSaveOld">
                        覆蓋舊求職信
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="coverLetterSaveNew"
                        v-model="coverLetterSaveNew"
                        @change="changeCoverLetter('new')"
                      />
                      <label class="form-check-label text-nowrap" for="coverLetterSaveNew">
                        另存新求職信
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="border-top border-gray-line pt-5">
                    <p class="text-center mb-4">
                      填寫到這裡，恭喜您即將完成拍照申請，我們會立即審核，並幫您投遞履歷，如企業有所回覆，會通知您。
                    </p>
                    <div class="formStepBtnBox d-flex justify-content-between">
                      <button type="button" class="btn btn-gray-light text-dark">取消申請</button>
                      <div class="d-flex">
                        <button
                          type="button"
                          class="btn btn-gray-light text-dark me-2"
                          @click="changeStep('back')"
                        >
                          上一步
                        </button>
                        <button type="submit" class="btn btn-primary">傳送審核</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 表單操作按鈕 -->
            </Form>
            <div class="d-flex flex-column align-items-center" v-if="formStep === 4">
              <div class="titleBox">
                <h5 class="titleBox__title">已成功送出申請</h5>
              </div>
              <p class="mx-5 text-center mb-4">
                我們將盡快為您的申請做審核，如審核通過會直接寄送到您所設定之企業郵件地址，企業會由此跟您做聯絡，煩請再多加留意申請進度！
              </p>
              <img class="w-50 mb-5" src="https://i.imgur.com/n0AgJDN.png" alt="" />
              <router-link to="/" type="button" class="btn btn-outline-gray-line text-dark w-100"
                >返回首頁</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
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
      // 表單
      form: {
        jobKey: '',
        jobName: '',
        jobContent: '',
        time: null,
        is_enabled: true,
        jobAddress: {
          addressCity: '',
          addressDist: '',
          addressDetail: '',
          companyAddress: '',
        },
        companyInfo: {
          companyName: '',
          companyKey: '',
          companyEmail: '',
        },
        document: {
          cvkey: '',
          introVideo: { is_enabled: true, key: '' },
          coverLetter: {
            title: '',
            content: '',
          },
        },
      },
      chooseCityDist: [],
      formStep: 1,
      docData: {},
      // 表單資料
      formData: {},
      // 編輯器套件
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [],
        language: 'zh',
        placeholder: '請輸入...',
      },
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
      coverLetterSaveOld: { key: null, replace: false, show: false },
      coverLetterSaveNew: false,
    };
  },
  methods: {
    // 跳頁
    changeStep(way) {
      if (way === 'back' && this.formStep > 0) {
        this.formStep -= 1;
      } else if (way === 'next') {
        this.formStep += 1;
      }
      document.documentElement.scrollTop = 0;
    },
    chooseDist(cityName) {
      this.chooseCityDist = [];
      this.chooseCityDist = this.formData.districts[cityName].district;
      const [temDist] = this.chooseCityDist;
      this.form.jobAddress.addressDist = temDist;
    },
    changeCoverLetter(action) {
      if (action === 'old') {
        this.coverLetterSaveNew = false;
        this.docData.coverLetterList.forEach((item) => {
          if (item.select) {
            this.coverLetterSaveOld.key = item.time;
          }
        });
      } else {
        this.coverLetterSaveOld.replace = false;
        this.coverLetterSaveOld.key = '';
      }
    },
    useThisTempalte(index) {
      this.coverLetterSaveOld.replace = false;
      this.coverLetterSaveOld.show = true;
      this.docData.coverLetterList.forEach((item, number) => {
        if (number === index) {
          this.docData.coverLetterList[number].select = !item.select;
          this.form.document.coverLetter.content = '';
          this.form.document.coverLetter.content = item.content;
        } else {
          this.docData.coverLetterList[number].select = false;
        }
      });
    },
    getDocumentData() {
      const docDataRef = database.ref('user/docData');
      docDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.docData = JSON.parse(JSON.stringify(data));
      });
      const cvRef = database.ref('cvList');
      cvRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.docData.cvList = JSON.parse(JSON.stringify(data));
        this.dataReady = true;
      });
    },
    sendApply() {
      this.form.jobAddress.companyAddress = `${this.form.jobAddress.addressCity}，${this.form.jobAddress.addressDist}，${this.form.jobAddress.addressDetail}`;
      this.form.time = `${Math.floor(Date.now() / 1000)}`;
      if (this.coverLetterSaveOld.replace) {
        const number = this.coverLetterSaveOld.key;
        console.log(this.docData.coverLetterList);
        this.docData.coverLetterList.forEach((item, index) => {
          if (item.time === number) {
            this.docData.coverLetterList[index].content = this.form.coverLetterContent;
          }
        });
      } else if (this.coverLetterSaveNew) {
        // this.newcoverLetterModalOpen();
      }
      this.saveMailApplyData();
      this.formStep = 4;
    },
    // put message to apllyList to firebase
    saveMailApplyData() {
      const otherApplyRef = database.ref('applyList/otherApplyList/mailList');
      const { key } = otherApplyRef.push();
      const obj = this.form;
      obj.key = key;
      otherApplyRef.child(key).set(obj);
    },
  },
  created() {
    this.formData = webData;
    this.getDocumentData();
    emitter.emit('spinner-open-bg', 800);
  },
};
</script>

<style lang="scss"></style>
