<template>
  <div class="page--py">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="applyContainer">
            <div class="applyContainer__applySideBox">
              <button
                type="button"
                class="applyBackBtn btn btn-light text-dark mb-md-4 mb-0"
                @click="$router.back(-1)"
              >
                <i class="bi bi-chevron-left me-2"></i>返回<span class="applyBackBtn__title ms-4">{{
                  jobItem.title
                }}</span>
              </button>
              <div class="applySideBox">
                <div class="applySideBox__section">
                  <div class="applySideBox__companyBox">
                    <div class="logoImgBox me-2">
                      <img
                        class="logoImg"
                        :src="jobItem.options.company.companyLogoUrl"
                        :alt="`${temCompany.title}企業Logo`"
                        v-if="temCompany.title"
                      />
                    </div>
                    <router-link
                      class="d-block putPointer"
                      :to="`/products-list/company/${temCompany.id}`"
                      >{{ jobItem.options.company.companyName }}</router-link
                    >
                  </div>
                  <router-link
                    class="sideJobBox__title mb-3 d-block putPointer"
                    :to="`/products-list/product/${jobItem.id}`"
                    >{{ jobItem.title }}</router-link
                  >
                  <!-- 薪資 -->
                  <p class="mb-3" v-if="!jobItem.options.job.salaryInterView">
                    <span><i class="jobIcon--sm me-1 bi bi-currency-dollar"></i></span>薪資：{{
                      jobItem.price
                    }}
                    / 月薪
                  </p>
                  <p class="mb-3" v-if="jobItem.options.job.salaryInterView">
                    <span><i class="jobIcon--sm me-1 bi bi-currency-dollar"></i></span
                    >薪資：薪資面議
                  </p>
                  <!-- 需求人數 -->
                  <p class="mb-3">
                    <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                      jobItem.num
                    }}
                    人
                  </p>
                  <!-- 工作地點 -->
                  <p class="mb-3">
                    <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span>工作地點：{{
                      jobItem.options.company.companyAddressCity
                    }}
                  </p>
                  <!-- 更新時間 -->
                  <p class="mb-3">
                    <span><i class="jobIcon--sm me-1 bi bi-calendar4-event"></i></span>更新時間：{{
                      $filters.date(jobItem.options.job.create)
                    }}
                  </p>
                </div>
                <div class="applySideBox__section">
                  <p class="applySideBox__section__open" @click="openApplySideSection('職位內容')">
                    職位內容
                    <i v-if="applyJobContentStage !== '職位內容'" class="bi bi-chevron-down"></i>
                    <i v-if="applyJobContentStage === '職位內容'" class="bi bi-chevron-up"></i>
                  </p>
                  <div
                    v-if="applyJobContentStage === '職位內容'"
                    class="applySideBox__section__content"
                  >
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-journal"></i></span>工作性質：{{
                        jobItem.options.job.workType
                      }}
                    </p>
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-clock"></i></span>工作時間：{{
                        jobItem.options.job.workTime
                      }}
                    </p>
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-building"></i></span>產業類別：{{
                        jobItem.options.company.industryCategory
                      }}
                    </p>
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-card-list"></i></span>工作類別：{{
                        jobItem.category
                      }}
                    </p>
                    <p class="mb-3">工作內容：</p>
                    <div class="page__txt" v-html="jobItem.content"></div>
                  </div>
                </div>
                <div class="applySideBox__section" @click="openApplySideSection('應徵條件')">
                  <p class="applySideBox__section__open">
                    應徵條件
                    <i v-if="applyJobContentStage !== '應徵條件'" class="bi bi-chevron-down"></i>
                    <i v-if="applyJobContentStage === '應徵條件'" class="bi bi-chevron-up"></i>
                  </p>
                  <div
                    v-if="applyJobContentStage === '應徵條件'"
                    class="applySideBox__section__content"
                  >
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-book"></i></span>學歷要求：{{
                        jobItem.options.job.education
                      }}
                    </p>
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-briefcase"></i></span>工作經驗：{{
                        jobItem.options.job.workExp
                      }}
                    </p>
                    <p class="mb-3">其他條件：</p>
                    <div class="page__txt" v-html="jobItem.options.job.otherRequirement"></div>
                  </div>
                </div>
                <div class="applySideBox__section" @click="openApplySideSection('申請方法')">
                  <p class="applySideBox__section__open">
                    申請方法
                    <i v-if="applyJobContentStage !== '申請方法'" class="bi bi-chevron-down"></i>
                    <i v-if="applyJobContentStage === '申請方法'" class="bi bi-chevron-up"></i>
                  </p>
                  <div
                    v-if="applyJobContentStage === '申請方法'"
                    class="applySideBox__section__content"
                  >
                    <p class="mb-3">
                      <span><i class="jobIcon--sm me-1 bi bi-person"></i></span>職位聯絡人：{{
                        jobItem.options.company.companyContact
                      }}
                    </p>
                    <a
                      class="mb-3 d-block"
                      :href="`mailto:${jobItem.options.company.companyEmail}`"
                    >
                      <span><i class="jobIcon--sm me-1 bi bi-envelope"></i></span>聯絡信箱：{{
                        jobItem.options.company.companyEmail
                      }}
                    </a>
                    <a class="mb-3 d-block" :href="`tel:${jobItem.options.company.companyTel}`">
                      <span><i class="jobIcon--sm me-1 bi bi-phone"></i></span>聯絡電話：{{
                        jobItem.options.company.companyTel
                      }}
                    </a>
                    <p class="mb-3">申請備註：</p>
                    <div v-html="jobItem.options.job.otherApplyInfo"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="applyContainer__applyInfoBox">
              <Form ref="sendFormInfoForm1" @submit="sendApplyFormProcess">
                <h3 class="section__title--sub mb-4">
                  <span class="title__icon"></span>求職者申請資訊
                </h3>
                <div class="row">
                  <div class="col-md-8 col-12 mb-4">
                    <div class="docSelector">
                      <div class="docSelector__titleBox mb-2">
                        <p>履歷</p>
                        <p class="formTag--must">必選</p>
                      </div>
                      <div class="docSelector__contentBox overFlow--x">
                        <template v-for="(item, index) in docData.cvList" :key="index">
                          <div class="docCard me-2 mb-0">
                            <div
                              class="d-flex flex-column  flex-grow-1 me-2"
                            >
                              <p class="docCard__title">{{ item.cvName }}</p>
                              <p class="subTxt">{{ $filters.date(item.cvKey) }}</p>
                            </div>
                            <img class="docCard__cover" :src="item.cvImgUrl" alt="CV封面" />
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-12 mb-4">
                    <!-- 表單2-2：職位名稱(必填) -->
                    <div class="docSelector">
                      <div class="docSelector__titleBox mb-2">
                        <p>自我介紹</p>
                        <p class="formTag--must">必選</p>
                      </div>
                      <div class="docSelector__contentBox"></div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="docSelector mb-4">
                      <div class="docSelector__titleBox mb-2">
                        <p>求職信</p>
                        <p class="formTag--must">必選</p>
                      </div>
                      <div class="docSelector__contentBox"></div>
                    </div>
                    <div class="form__inputBox form__infoEditBox">
                      <div class="form__labelBox">
                        <label for="sendFormInfoMessage" class="form__label--custom form-label"
                          >求職信內容</label
                        >
                      </div>
                      <ckeditor
                        id="sendFormInfoMessage"
                        ref="sendFormInfoMessage"
                        name="求職信"
                        :editor="editor"
                        tag-name="textarea"
                        v-model="form.message"
                        :config="editorConfig"
                      ></ckeditor>
                    </div>
                  </div>
                </div>
                <!-- 表單操作按鈕 -->
                <div class="col-12">
                  <div class="formStepBtnBox d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary">申請職位</button>
                  </div>
                </div>
              </Form>
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
        jobKey: '',
        jobName: '',
        key: null,
        cvSelect: '',
        introVideo: false,
        coverLettertitle: '',
        coverLetterContent: '',
        productList: [],
        videoList: [],
      },
      cvList: [],
      docData: {},
      // 圖片用
      personalImg: { src: '', isUpDated: false },
      // 表單資料
      formData: {},
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
      tempArticle: {
        tag: [''],
      },
      cropper: {}, // 圖片套件
      uploadImgState: 'upLoadSingleImg',
      applyJobContentStage: '', // 左側職位資訊欄區塊
    };
  },
  methods: {
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
        const cv = data;
        this.cvList = cv;
        this.getFbData();
      });
    },
    // 取得資料
    getFbData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.docData = data.docData;
        this.docData.cvList = this.cvList;
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
