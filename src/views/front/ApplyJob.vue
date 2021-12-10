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
              <Form ref="sendFormInfoForm1" @submit="sendApply" v-slot="{ errors }">
                <h3 class="section__title--sub mb-4">
                  <span class="tag--doubleCircle me-2"></span>求職者申請資訊
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
                          <div
                            class="
                              scvCard
                              flex-row
                              me-4
                              flex-shrink-0
                              putPointer
                              align-items-center
                            "
                            @click="form.cvSelect = item.cvKey"
                          >
                            <div class="scvCard__body flex-grow-1 h-100">
                              <p class="scvCard__title mb-2">{{ item.cvName }}</p>
                              <p class="scvCard__subTxt mb-3">{{ $filters.date(item.cvKey) }}</p>
                              <div class="form-check my-auto mb-0">
                                <input
                                  class="form-check-input mt-0"
                                  type="radio"
                                  :value="item.cvKey"
                                  v-model="form.cvSelect"
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
                        <template v-for="(item, index) in docData.coverLetterList" :key="index">
                          <div
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
                        </template>
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
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import database from '@/methods/firebaseinit';

export default {
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
        time: null,
        cvSelect: '',
        introVideo: true,
        coverLettertitle: '',
        coverLetterContent: '',
      },
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
