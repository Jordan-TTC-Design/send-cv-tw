<template>
  <div class="page--py">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-10">
          <div class="applyContainer p-5 flex-column">
            <div class="d-flex flex-column align-items-center border-bottom border-gray-line">
              <div class="titleBox--tag">
                <div class="titleTag--doubleCircle me-2"></div>
                <h2 class="titleBox__title">寫郵件SendCV</h2>
              </div>
              <p class="mb-2 text-dark">申請工作全新進化 !!</p>
              <p class="mb-5">
                最強快速申請方式，只要填寫公司信箱，填寫好下面資料，我們幫您投遞履歷！
              </p>
            </div>
            <Form ref="sendFormInfoForm2" @submit="sendApply" v-slot="{ errors }">
              <h3 class="section__title--sub mb-4 mt-5">
                <span class="titleTag--doubleCircle me-2"></span>職位資訊
              </h3>
              <div class="row">
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
              </div>
              <h3 class="section__title--sub mb-4">
                <span class="titleTag--doubleCircle me-2"></span>公司地址
              </h3>
              <div class="row">
                <div class="col-md-6 col-12">
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
                        @change="show(form.addressDist)"
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
              </div>
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
              </div>
              <!-- 表單操作按鈕 -->
              <div class="col-12 border-top border-gray-line pt-6">
                <p class="text-center mb-4">
                  填寫到這裡，恭喜您即將完成拍照申請，我們會立即審核，並幫您投遞履歷，如企業有所回覆，會通知您。
                </p>
                <div class="formStepBtnBox d-flex justify-content-between">
                  <button type="button" class="btn btn-gray-light text-dark">暫存</button>
                  <div class="d-flex">
                    <button type="button" class="btn btn-gray-light text-dark me-2">取消</button>
                    <button type="submit" class="btn btn-primary">傳送審核</button>
                  </div>
                </div>
              </div>
            </Form>
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
import ImageSquareCropper from '@/components/helpers/ImageSquareCropperModal.vue';
import database from '@/methods/firebaseinit';

export default {
  components: { ImageSquareCropper },
  data() {
    return {
      // 申請的職位
      jobItem: {
        options: {
          company: { companyLogoUrl: '' },
          job: { create: '' },
        },
      },
      // 全部產品
      jobsList: [],
      // 放企業連結用
      temCompany: {},
      // 表單
      form: {
        companyName: '',
        addressDist: '',
        addressCity: '',
        addressDatail: '',
        jobKey: '',
        jobName: '',
        key: null,
        time: null,
        cvSelect: '',
        introVideo: true,
        coverLettertitle: '',
        coverLetterContent: '',
      },
      chooseCityDist: [],
      cvList: [],
      docData: {},
      // 圖片用
      personalImg: { src: '', isUpDated: false },
      // 表單資料
      formData: {},
      // 編輯器套件
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [],
        language: 'zh',
        placeholder: '請輸入...',
      },
      tempArticle: {
        tag: [''],
      },
      cropper: {}, // 圖片套件
      uploadImgState: 'upLoadSingleImg',
      applyJobContentStage: '', // 左側職位資訊欄區塊
      coverLetterSaveOld: { key: null, replace: false, show: false },
      coverLetterSaveNew: false,
    };
  },
  methods: {
    choose(cityName) {
      this.chooseCityDist = [];
      this.chooseCityDist = this.formData.districts[cityName].district;
      const [temDist] = this.chooseCityDist;
      this.form.addressDist = temDist;
    },
    sendApply() {
      this.form.time = `${Math.floor(Date.now() / 1000)}`;
      this.form.key = `${Math.floor(Date.now() / 1000)}`;
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
    // 用來打開左側職位資訊欄的區塊
    openApplySideSection(sectionName) {
      if (this.applyJobContentStage !== sectionName) {
        this.applyJobContentStage = sectionName;
      } else {
        this.applyJobContentStage = '';
      }
    },
    // 取得圖片傳給modal
    loadingImg(e) {
      const nowId = '';
      emitter.emit('open-imageSquareCropper', [e.target.files[0], nowId]);
    },
    // 從modal抓回圖片
    getImg(data, img, id) {
      if (this.uploadImgState === 'upLoadMutiImg') {
        this.temImageInputs[id].src = data;
        this.temImages[id] = img.src;
      } else if (this.uploadImgState === 'upLoadSingleImg') {
        this.personalImg.src = data;
      }
    },
    // 觸發 圖片input
    clickInput(e) {
      if (e.target.dataset.input === 'upLoadSingleImg') {
        this.$refs.sendFormInfoPersonalImg.click();
        this.uploadImgState = 'upLoadSingleImg';
      }
    },
    // 上傳圖片
    updateImg(e) {
      emitter.emit('spinner-open');
      this.uploadImgState = e.target.dataset.input;
      let item = null;
      if (this.uploadImgState === 'upLoadSingleImg') {
        item = this.personalImg.src;
      }
      const base64String = item.replace('data:image/jpeg;base64,', '');
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
          if (this.uploadImgState === 'upLoadSingleImg') {
            this.personalImg.isUpDated = true;
            this.form.user.options.personalImg = res.data.data.link;
            emitter.emit('alertMessage-open', this.form.user.options.personalImg);
          }
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    deleteImgInput() {
      this.personalImg.src = '';
      this.personalImg.isUpDated = false;
      this.form.user.options.personalImg = '';
    },
    // 以下是表單送出的過程
    // 1.由於api限制，先將職位加入購物車
    sendApplyFormProcess() {
      emitter.emit('spinner-open');
      const { id } = this.jobItem;
      const product = { data: { product_id: id, qty: 1 } };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, product)
        .then(() => {
          this.getCart(); // 抓購物車資料
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 重新抓取購物車資料，才會啟動傳送表單
    getCart() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          this.cartList = res.data.data.carts;
          this.sendForm(); // 送出申請表單
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 送出申請表單
    sendForm() {
      emitter.emit('spinner-open');
      // 整理傳送資料
      this.form.user.options.appliedJob = this.jobItem.id;
      this.form.user.address = `${this.form.user.options.addressCity}
      ${this.form.user.options.addressDetail}`;
      // api路徑
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const formData = {
        data: this.form,
      };
      this.$http
        .post(url, formData)
        .then(() => {
          emitter.emit('spinner-close');
          this.$router.push('/'); // 送出成功後回到首頁
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 以下是api資料動作
    // 取得產品資料
    getProductData() {
      emitter.emit('spinner-open');
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.isExist = true;
            this.jobItem = res.data.product;
            this.getAllJobs();
          } else {
            this.isExist = false;
          }
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 取得全部產品，為了要抓到企業資料
    getAllJobs() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.jobsList = res.data.products;
          this.findCompany();
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // 篩選企業
    findCompany() {
      emitter.emit('spinner-open');
      this.jobsList.forEach((item) => {
        if (item.description === '企業') {
          if (item.title === this.jobItem.options.company.companyName) {
            this.temCompany = item;
          }
        }
      });
      emitter.emit('spinner-close');
    },
    // 刪除購物車資料
    deleteCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then(() => {})
        .catch((err) => {
          emitter.emit('alertMessage-open', err);
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
  },
  created() {
    this.formData = webData;
    this.deleteCart(); // 避免有加入過其他資料，先清空購物車
    this.getProductData();
    this.getCvData();
    emitter.emit('spinner-open-bg', 800);
  },
};
</script>

<style lang="scss"></style>
