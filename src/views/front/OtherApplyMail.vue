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
              <div class="titleBox--tag">
                <div class="titleTag--doubleCircle me-2"></div>
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
                <span class="titleTag--doubleCircle me-2"></span>職位資訊
              </h3>
              <div class="row mb-0">
                <div class="col-md-6 col-12">
                  <!-- 公司名稱(必填) -->
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="sendFormInfoCompanyName" class="form__label--custom form-label"
                        >公司名稱</label
                      >
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
                      v-model="form.companyName"
                      ref="sendFormInfoCompanyName"
                    ></Field>
                    <ErrorMessage name="公司名稱" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-md-6">
                  <!-- 公司email(必填) -->
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="sendFormInfoCompanyEmail" class="form__label--custom form-label"
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
                      v-model="form.companyEmail"
                      ref="sendFormInfoCompanyEmail"
                    ></Field>
                    <ErrorMessage name="公司Email" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-md-6">
                  <!-- 職位名稱(必填) -->
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="sendFormInfoJobName" class="form__label--custom form-label"
                        >職位名稱</label
                      >
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
                  <div class="form__inputBox form__infoEditBox">
                    <div class="form__labelBox">
                      <label
                        for="sendFormInfoJobContent"
                        class="form__label--custom form-label me-2"
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
                <span class="titleTag--doubleCircle me-2"></span>公司地址
              </h3>
              <div class="row">
                <div class="col-md-6 col-12 mb-4">
                  <div class="mapBox">
                    <img class="mapBox__map" src="https://i.imgur.com/B1ILMKo.png" alt="" />
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="d-flex">
                    <div class="form__inputBox me-2">
                      <div class="form__labelBox">
                        <label for="sendFormInfoCompanyCity" class="form__label--custom form-label"
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
                        v-model="form.addressCity"
                        @change="choose(form.addressCity)"
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
                        <label for="sendFormInfoCompanyDist" class="form__label--custom form-label"
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
                        v-model="form.addressDist"
                      >
                        <option value="" disabled selected>請選擇區域鄉鎮</option>
                        <option v-for="dist in chooseCityDist" :value="dist" :key="dist">
                          {{ dist }}
                        </option>
                      </Field>
                      <ErrorMessage name="區域鄉鎮" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="form__inputBox w-100">
                    <div class="form__labelBox">
                      <label for="sendFormInfoCompanyDatail" class="form__label--custom form-label"
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
                      v-model="form.addressDatail"
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
                <span class="titleTag--doubleCircle me-2"></span>求職者申請資訊
              </h3>
              <div class="row">
                <div class="col-md-8 col-12 mb-4">
                  <!-- 履歷 -->
                  <div class="docSelector h-100">
                    <div class="docSelector__titleBox mb-2">
                      <p>履歷</p>
                      <p class="formTag--must">必選</p>
                    </div>
                    <div class="docSelector__contentBox overFlow--x">
                      <template v-for="(item, index) in docData.cvList" :key="index">
                        <div class="docCard me-2 mb-0" @click="form.cvSelect = item.cvKey">
                          <div class="d-flex flex-column flex-grow-1 me-2">
                            <div>
                              <p class="docCard__title">{{ item.cvName }}</p>
                              <p class="subTxt">{{ $filters.date(item.cvKey) }}</p>
                            </div>
                            <div class="form-check position-absolute bottom-0 start-0 ms-2">
                              <input
                                class="form-check-input mt-0"
                                type="radio"
                                :value="item.cvKey"
                                v-model="form.cvSelect"
                              />
                            </div>
                          </div>
                          <img class="docCard__cover" :src="item.cvImgUrl" alt="CV封面" />
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
                      v-model="form.cvSelect"
                      rules="required"
                    ></Field>
                    <ErrorMessage name="履歷" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-md-4 col-12 mb-4">
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
                          v-model="form.introVideo"
                        />
                        <label class="form-check-label text-nowrap" for="applyJobIntroVideo">
                          顯示
                        </label>
                      </div>
                    </div>
                    <div class="docSelector__contentBox">
                      <template v-for="(item, index) in docData.videoList" :key="index">
                        <div class="docCard docCard--video card w-100 mb-0" v-if="item.introSelect">
                          <img class="card-img-top" :src="item.imgUrl" alt="影片封面" />
                          <div class="card-body p-2">
                            <p class="docCard__title mb-0">{{ item.title }}</p>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
                <div class="col-12 mb-5">
                  <div class="docSelector mb-4">
                    <div class="docSelector__titleBox mb-2">
                      <p class="me-2">求職信</p>
                      <p class="subTxt">(可使用文字模板快速建立求職信)</p>
                    </div>
                    <div class="docSelector__contentBox overFlow--x">
                      <template v-for="(item, index) in docData.coverLetterList" :key="index">
                        <div
                          class="docCard docCard--coverLetter mb-0 me-2"
                          @click="useThisTempalte(index)"
                        >
                          <div class="d-flex align-items-center justify-content-between">
                            <p class="docCard__title">{{ item.title }}</p>
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
                          <div
                            class="docCard--coverLetter__content subTxt"
                            v-html="item.content"
                          ></div>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="form__inputBox form__infoEditBox mb-1">
                    <div class="form__labelBox">
                      <label for="coverLetterContent" class="form__label--custom form-label"
                        >求職信內容</label
                      >
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
                        v-model="form.coverLetterContent"
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
              <div class="titleBox--tag">
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
  <ImageSquareCropper @emit-send-img-data="getImg" />
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
        companyName: '',
        addressDist: '',
        addressCity: '',
        addressDatail: '',
        jobKey: '',
        jobName: '',
        jobContent: '',
        time: null,
        cvSelect: '',
        introVideo: true,
        coverLettertitle: '',
        coverLetterContent: '',
      },
      formStep: 1,
      chooseCityDist: [],
      cvList: [],
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
    choose(cityName) {
      this.chooseCityDist = [];
      this.chooseCityDist = this.formData.districts[cityName].district;
      const [temDist] = this.chooseCityDist;
      this.form.addressDist = temDist;
    },
    sendApply() {
      this.form.time = `${Math.floor(Date.now() / 1000)}`;
      console.log(this.form);
      if (this.coverLetterSaveOld.replace) {
        const number = this.coverLetterSaveOld.key;
        console.log(this.docData.coverLetterList);
        this.docData.coverLetterList.forEach((item, index) => {
          if (item.time === number) {
            this.docData.coverLetterList[index].content = this.form.coverLetterContent;
          }
        });
        console.log(this.docData.coverLetterList);
      } else if (this.coverLetterSaveNew) {
        // this.newcoverLetterModalOpen();
      }
      this.saveApplyData();
      this.formStep = 4;
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
      console.log(this.coverLetterSaveOld);
      console.log(this.coverLetterSaveNew);
    },
    useThisTempalte(index) {
      this.coverLetterSaveOld.replace = false;
      this.coverLetterSaveOld.show = true;
      this.docData.coverLetterList.forEach((item, number) => {
        if (number === index) {
          this.docData.coverLetterList[number].select = !item.select;
          this.form.coverLetterContent = '';
          this.form.coverLetterContent = item.content;
        } else {
          this.docData.coverLetterList[number].select = false;
        }
      });
    },
    getCvData() {
      const cvRef = database.ref('cvList');
      cvRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.cvList = data;
        this.getFbData();
      });
    },
    // 取得資料
    getFbData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.docData = JSON.parse(JSON.stringify(data.docData));
        this.docData.cvList = JSON.parse(JSON.stringify(this.cvList));
        this.dataReady = true;
        console.log(this.docData);
      });
    },
    // put message to apllyList to firebase
    saveApplyData() {
      const otherApplyRef = database.ref('applyList/otherApplyList/mailList');
      const { key } = otherApplyRef.push();
      console.log(key);
      otherApplyRef.child(key).set({
        data: this.form,
        key,
      });
    },
  },
  created() {
    this.formData = webData;
    this.getCvData();
    emitter.emit('spinner-open-bg', 800);
  },
};
</script>

<style lang="scss"></style>
