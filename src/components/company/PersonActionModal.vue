<template>
  <div class="container">
    <div
      ref="personActionModal"
      class="popModal modal fade"
      id="personActionModal"
      aria-hidden="true"
      aria-labelledby="personActionModalLabel"
      tabindex="-1"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        :class="{
          'modal-sm': modalAction === '選擇動作',
          'modal-lg':
            modalAction === '邀請面試' ||
            modalAction === '錄取' ||
            modalAction === '婉拒' ||
            modalAction === '設定職位',
        }"
      >
        <div class="modal-content" v-if="modalAction === '選擇動作'">
          <div class="popModal__header popModal__header--center mb-4">
            <h5 class="popModal__title">選擇動作</h5>
            <p class="popModal__header__subTxt">
              選擇您想對
              <span class="text-companyColor">{{ user.account.chineseName }}</span> 進行的操作
            </p>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="popModal__body--p mb-4">
            <button
              type="button"
              class="btn btn-gray-light text-dark w-100 mb-2"
              @click="startAction('邀請面試')"
            >
              邀請面試
            </button>
            <button
              type="button"
              class="btn btn-gray-light text-dark w-100 mb-2"
              @click="startAction('錄取')"
            >
              錄取
            </button>
            <button
              type="button"
              class="btn btn-gray-light text-dark w-100 mb-2"
              @click="startAction('婉拒')"
            >
              婉拒
            </button>
          </div>
        </div>
        <div
          class="modal-content"
          v-if="modalAction === '邀請面試' || modalAction === '錄取' || modalAction === '婉拒'"
        >
          <div
            class="popModal__header popModal__header--center border-bottom border-gray-line mb-4"
          >
            <h5 class="popModal__title">{{ modalAction }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <Form v-slot="{ errors }" @submit="sendForm">
            <div class="popModal__body--p">
              <h3 class="ms-2 section__title--sub">
                <span class="tag--doubleCircle--company me-2"></span>職位資訊
              </h3>
              <div class="row mb-4">
                <div class="col-6">
                  <div class="form__input mb-3">
                    <div class="form__labelBox">
                      <label class="labelBox__label form-label">職位</label>
                    </div>
                    <div class="fakeInput" @click="modalAction = '設定職位'">
                      <div class="fakeInput__txtList">
                        <p class="text-secondary" v-if="!form.jobInfo.jobName">請選擇</p>
                        <p>{{ form.jobInfo.jobName }}</p>
                      </div>
                      <i class="jobIcon bi bi-chevron-right"></i>
                    </div>
                  </div>
                  <Field
                    id="jobName"
                    ref="jobName"
                    name="職位"
                    type="date"
                    class="form-control d-none"
                    :class="{ 'is-invalid': errors['職位'] }"
                    placeholder="請選擇職位"
                    v-model="form.jobInfo.jobName"
                  ></Field>
                  <ErrorMessage name="職位" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-6">
                  <div class="form__input" v-if="modalAction === '邀請面試'">
                    <div class="form__labelBox">
                      <label for="jobinterviewDay" class="labelBox__label form-label"
                        >面試日期</label
                      >
                    </div>
                    <Field
                      id="jobinterviewDay"
                      ref="jobinterviewDay"
                      name="面試日期"
                      type="date"
                      class="form-control"
                      :class="{ 'is-invalid': errors['面試日期'] }"
                      placeholder="請選擇面試日期"
                      v-model="form.jobInfo.interviewDate"
                    ></Field>
                    <ErrorMessage name="面試日期" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="form__input" v-if="modalAction === '錄取'">
                    <div class="form__labelBox">
                      <label for="jobinterviewDay" class="labelBox__label form-label"
                        >入職日期</label
                      >
                    </div>
                    <Field
                      id="jobinterviewDay"
                      ref="jobinterviewDay"
                      name="入職日期"
                      type="date"
                      class="form-control"
                      :class="{ 'is-invalid': errors['入職日期'] }"
                      placeholder="請選擇入職日期"
                      v-model="form.jobInfo.onBoardDate"
                    ></Field>
                    <ErrorMessage name="入職日期" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-12" v-if="modalAction === '邀請面試'">
                  <div class="d-flex align-items-end mb-4">
                    <div class="form__input me-2">
                      <div class="form__labelBox">
                        <label for="jobFormCompanyCity" class="labelBox__label form-label"
                          >面試地址</label
                        >
                      </div>
                      <Field
                        id="jobFormCompanyCity"
                        ref="jobFormCompanyCity"
                        name="縣市"
                        as="select"
                        class="form-control form-select w-auto"
                        :class="{ 'is-invalid': errors['縣市'] }"
                        v-model="form.jobInfo.interviewAddress.addressCity"
                        @change="chooseDist(form.jobInfo.interviewAddress.addressCity)"
                      >
                        <option value="" disabled selected>請選擇縣市</option>
                        <option v-for="city in formData.cities" :value="city" :key="city">
                          {{ city }}
                        </option>
                      </Field>
                      <ErrorMessage name="縣市" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="form__input me-4">
                      <div class="form__labelBox">
                        <label for="jobFormCompanyDist" class="labelBox__label form-label"
                          >區域鄉鎮</label
                        >
                      </div>
                      <Field
                        id="jobFormCompanyDist"
                        ref="jobFormCompanyDist"
                        name="區域鄉鎮"
                        as="select"
                        class="form-control form-select w-auto"
                        :class="{ 'is-invalid': errors['區域鄉鎮'] }"
                        v-model="form.jobInfo.interviewAddress.addressDist"
                      >
                        <option value="" disabled selected>請選擇區域鄉鎮</option>
                        <option v-for="dist in chooseCityDist" :value="dist" :key="dist">
                          {{ dist }}
                        </option>
                      </Field>
                      <ErrorMessage name="區域鄉鎮" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="form-check" v-if="form.jobInfo.jobKey">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="sameAddressWithCompany"
                        v-model="sameAddressWithCompany"
                        @change="putCompanyAddressToJob"
                      />
                      <label class="form-check-label" for="sameAddressWithCompany">
                        同職位工作地點
                      </label>
                    </div>
                  </div>
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="jobFormAddressDetail" class="labelBox__label form-label"
                        >面試詳細地址</label
                      >
                    </div>
                    <Field
                      id="jobFormAddressDetail"
                      ref="jobFormAddressDetail"
                      name="面試詳細地址"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['面試詳細地址'] }"
                      placeholder="請輸入面試詳細地址"
                      v-model="form.jobInfo.interviewAddress.addressDetail"
                    ></Field>
                    <ErrorMessage name="面試詳細地址" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <div
                class="d-flex align-items-center justify-content-between mb-3"
                v-if="modalAction !== '婉拒'"
              >
                <h3 class="ms-2 mb-0 section__title--sub">
                  <span class="tag--doubleCircle--company me-2"></span>聯絡資訊
                </h3>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="sameContactWithAccount"
                    v-model="sameContactWithAccount"
                    @change="putAccountContactToJob"
                  />
                  <label class="form-check-label" for="sameContactWithAccount">
                    置入帳號聯絡資料
                  </label>
                </div>
              </div>
              <div class="row mb-4" v-if="modalAction !== '婉拒'">
                <div class="col-6">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="staffName" class="labelBox__label form-label">職位聯絡人</label>
                      <p class="formTag--must company">必填</p>
                    </div>
                    <Field
                      id="staffName"
                      name="職位聯絡人"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['職位聯絡人'] }"
                      placeholder="請輸入職位聯絡人"
                      rules="required"
                      v-model="form.staff.name"
                      ref="staffName"
                    ></Field>
                    <ErrorMessage name="職稱" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="staffJobTitle" class="labelBox__label form-label">職稱</label>
                    </div>
                    <Field
                      id="staffJobTitle"
                      name="職稱"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['職稱'] }"
                      placeholder="請輸入職稱"
                      v-model="form.staff.jobTitle"
                      ref="staffJobTitle"
                    ></Field>
                    <ErrorMessage name="職稱" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="staffEmail" class="labelBox__label form-label">聯絡信箱</label>
                    </div>
                    <Field
                      id="staffEmail"
                      name="聯絡信箱"
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': errors['聯絡信箱'] }"
                      placeholder="請輸入聯絡信箱"
                      rules="email"
                      v-model="form.staff.email"
                      ref="staffEmail"
                    ></Field>
                    <ErrorMessage name="用戶Email" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="staffPhone" class="labelBox__label form-label">聯絡電話</label>
                    </div>
                    <Field
                      id="staffPhone"
                      name="聯絡電話"
                      type="tel"
                      class="form-control"
                      :class="{ 'is-invalid': errors['聯絡電話'] }"
                      placeholder="請輸入聯絡電話"
                      v-model="form.staff.phone"
                      ref="emp"
                    ></Field>
                    <ErrorMessage name="用戶手機號碼" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <h3 class="ms-2 section__title--sub">
                <span class="tag--doubleCircle--company me-2"></span>訊息
              </h3>
              <div class="row">
                <div class="col-6" v-if="dataReady === true">
                  <div class="form__input mb-3">
                    <div class="form__labelBox">
                      <label for="formMessageTemplate" class="labelBox__label form-label"
                        >訊息模板</label
                      >
                    </div>
                    <select
                      class="form-select"
                      aria-label="模板"
                      id="formMessageTemplate"
                      v-model="form.message"
                      @change="messageOld.show = true"
                    >
                      <option disabled selected value="">請選擇文字模板</option>
                      <option
                        v-for="(item, index) in myAccountData.messageTemplateList"
                        :value="item.content"
                        :key="`文字模板${index}`"
                      >
                        {{ item.title }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-12" v-if="dataReady === true">
                  <div class="form__input form__infoEditBox mb-1">
                    <div class="form__labelBox">
                      <label for="formMessage" class="labelBox__label form-label">訊息內容</label>
                    </div>
                    <div class="textarea--tag">
                      <ul class="textarea--tag__tagList">
                        <li><p class="jobTag jobTag--letter me-2">職位標籤</p></li>
                        <li><p class="jobTag jobTag--letter">求職者標籤</p></li>
                      </ul>
                      <ckeditor
                        id="formMessage"
                        ref="formMessage"
                        name="訊息內容"
                        :editor="editor"
                        tag-name="textarea"
                        class="form-control textarea--tag__inputBox"
                        v-model="form.message"
                        :config="editorConfig"
                      ></ckeditor>
                    </div>
                  </div>
                  <div class="d-flex">
                    <div class="form-check me-4" v-if="messageOld.show">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="messageOld"
                        @change="changeCoverLetter('old')"
                        v-model="messageOld.replace"
                      />
                      <label class="form-check-label text-nowrap" for="messageOld">
                        覆蓋舊文字模板
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="messageNew"
                        v-model="messageNew"
                        @change="changeCoverLetter('new')"
                      />
                      <label class="form-check-label text-nowrap" for="messageNew">
                        另存新文字模板
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="popModal__footer--border">
              <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                取消
              </button>
              <button type="submit" class="btn btn-companyColor text-light">傳送</button>
            </div>
          </Form>
        </div>
        <div class="modal-content" v-if="modalAction === '發送成功'">
          <div class="popModal__header popModal__header--center">
            <h5 class="popModal__title">{{ thisTimeAction }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="popModal__body--p">
            <p>發送成功</p>
          </div>
          <div class="popModal__footer">
            <button
              type="button"
              class="btn btn-outline-gray-line text-dark w-100"
              @click="closeModal"
            >
              完成
            </button>
          </div>
        </div>
        <div class="modal-content" v-if="modalAction === '設定職位'">
          <div class="popModal__header popModal__header--center">
            <h5 class="popModal__title">{{ thisTimeAction }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="popModal__body--p">
            <div class="popModal__body__subNav">
              <p
                class="d-flex align-items-center text-dark putPointer"
                @click="modalAction = thisTimeAction"
              >
                <i class="jobIcon bi bi-chevron-left me-2 text-dark"></i>設定目標職務
              </p>
            </div>
            <div class="dataForm border-top border-gray-line">
              <div class="dataForm__leftList">
                <ul>
                  <li class="list__item list__title">職位</li>
                  <li class="list__item putPointer" @click="jobListNav = 'companyJob'">
                    <p :class="{ 'text-companyColor': jobListNav === 'companyJob' }">公司職位</p>
                  </li>
                  <li class="list__item putPointer" @click="jobListNav = 'shotJob'">
                    <p :class="{ 'text-companyColor': jobListNav === 'shotJob' }">拍照申請職位</p>
                  </li>
                </ul>
              </div>
              <div class="dataForm__contentBox">
                <ul class="dataForm__contentBox__list">
                  <li class="list__item list__title">
                    <p>{{ jobListNav }}中的職位</p>
                  </li>
                  <template v-for="item in jobList" :key="item.jobName">
                    <li class="foldList__item border-bottom border-gray-line bg-light">
                      <div
                        class="foldList__item__title putPointer"
                        :class="{ companyActive: selectJob.key === item.key }"
                        @click="selectJobForTarget(item)"
                      >
                        <p>{{ item.jobName }}</p>
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
          <div class="popModal__footer--border">
            <button type="button" class="btn btn-companyColor text-light" @click="putJobBackToForm">
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emitter from '@/methods/emitter';
import database from '@/methods/firebaseinit';
import webData from '@/methods/webData';

export default {
  data() {
    return {
      modal: {},
      formData: {},
      subNav: '個人資料',
      jobListNav: '公司職位',
      thisTimeAction: '',
      modalAction: '',
      dataReady: false,
      user: {},
      sameAddressWithCompany: false,
      sameContactWithAccount: false,
      myAccountData: {},
      selectJob: {},
      jobKey: '',
      form: {
        applyState: '',
        staff: {
          name: '',
          phone: '',
          jobTitle: '',
          email: '',
        },
        time: '',
        message: '',
        read: false,
        jobInfo: {
          jobType: '',
          jobName: '',
          jobKey: '',
          onBoardDate: '',
          interviewDate: '',
          interviewAddress: {
            addressCity: '',
            addressDist: '',
            addressDetail: '',
            totalAddress: '',
          },
        },
      },
      jobList: [],
      messageOld: { key: null, replace: false, show: false },
      messageNew: false,
      // 編輯器套件
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [],
        language: 'zh',
        placeholder: '請輸入...',
      },
    };
  },
  methods: {
    sendForm() {
      this.form.jobInfo.interviewAddress.totalAddress = `${this.form.jobInfo.interviewAddress.addressCity}${this.form.jobInfo.interviewAddress.addressDist}
      ${this.form.jobInfo.interviewAddress.addressDetail}`;
      this.form.applyState = this.thisTimeAction;
      if (this.form.jobInfo.jobType !== 'mailJob') {
        this.form.jobInfo.jobType = this.jobListNav;
      }
      this.form.time = `${Math.floor(Date.now() / 1000)}`;
      if (this.messageOld.replace) {
        const number = this.messageOld.key;
        this.myAccountData.messageTemplateList.forEach((item, index) => {
          if (item.time === number) {
            this.myAccountData.messageTemplateList[index].content = this.form.message;
          }
        });
        console.log(this.myAccountData.messageTemplateList);
      }
      this.sendToUserDb();
      this.sendToCompanyDb();
      this.modalAction = '發送成功';
    },
    // put message to apllyList to firebase
    sendToUserDb() {
      let applyState = 'interview';
      if (this.thisTimeAction === '錄取') {
        applyState = 'recruit';
      } else if (this.thisTimeAction === '婉拒') {
        applyState = 'decline';
      }
      const userApplyListRef = database.ref(`user/applyList/${applyState}`);
      const { key } = userApplyListRef.push();
      const obj = this.form;
      obj.key = key;
      userApplyListRef.child(key).set(obj);
    },
    sendToCompanyDb() {
      let applyState = 'interview';
      let jobType = 'companyJob';
      if (this.thisTimeAction === '錄取') {
        applyState = 'recruit';
      } else if (this.thisTimeAction === '婉拒') {
        applyState = 'decline';
      }
      if (this.form.jobInfo.jobType === 'shotJob') {
        jobType = 'shotJob';
      } else if (this.form.jobInfo.jobType === 'mailJob') {
        jobType = 'mailJob';
      }
      const companyApplyListRef = database.ref(`company/applyList/${jobType}/${applyState}`);
      const { key } = companyApplyListRef.push();
      const obj = this.form;
      obj.key = key;
      companyApplyListRef.child(key).set(obj);
    },
    putJobBackToForm() {
      this.form.jobInfo.jobName = this.selectJob.jobName;
      this.form.jobInfo.jobKey = this.selectJob.key;
      this.modalAction = this.thisTimeAction;
    },
    selectJobForTarget(item) {
      this.selectJob = JSON.parse(JSON.stringify(item));
      console.log(this.selectJob);
    },
    startAction(action) {
      this.modalAction = action;
      this.thisTimeAction = action;
      this.getCompanyAccountData();
      this.getJobListData();
    },
    openModal(obj) {
      console.log(obj);
      this.user = obj.user;
      this.modalAction = obj.action;
      if (obj.key) {
        this.jobKey = obj.key;
      }
      this.modal.show();
    },
    getCompanyAccountData() {
      const AccountRef = database.ref('company/myAccount');
      AccountRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.myAccountData = JSON.parse(JSON.stringify(data));
        this.dataReady = true;
      });
    },
    getJobListData() {
      this.jobList = [];
      const jobListDataRef = database.ref('company/jobList');
      jobListDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((item) => {
            // 物件轉陣列
            this.jobList.push(data[item]);
          });
        }
      });
    },
    closeModal() {
      this.thisTimeAction = '';
      this.modalAction = '';
      this.selectJobKey = '';
      this.modal.hide();
    },
    // pick city data
    chooseDist(cityName) {
      this.chooseCityDist = [];
      this.chooseCityDist = this.formData.districts[cityName].district;
      const [temDist] = this.chooseCityDist;
      this.form.jobInfo.interviewAddress.addressDist = temDist;
    },
    // Put company address to job form.
    putCompanyAddressToJob() {
      if (this.sameAddressWithCompany) {
        this.form.jobInfo.interviewAddress.addressCity = this.selectJob.jobAddress.addressCity;
        this.form.jobInfo.interviewAddress.addressDist = this.selectJob.jobAddress.addressDist;
        this.form.jobInfo.interviewAddress.addressDetail = this.selectJob.jobAddress.addressDetail;
      } else {
        this.form.jobInfo.interviewAddress.addressCity = '';
        this.form.jobInfo.interviewAddress.addressDist = '';
        this.form.jobInfo.interviewAddress.addressDetail = '';
      }
    },
    putAccountContactToJob() {
      if (this.sameContactWithAccount) {
        this.form.staff.name = this.myAccountData.ChineseName;
        this.form.staff.jobTitle = this.myAccountData.jobTitle;
        this.form.staff.phone = this.myAccountData.phone;
        this.form.staff.email = this.myAccountData.email;
      } else {
        this.form.staff.addressCity = '';
        this.form.staff.addressDist = '';
        this.form.staff.addressDetail = '';
      }
    },
  },
  created() {
    this.formData = webData;
  },
  mounted() {
    this.modal = new Modal(this.$refs.personActionModal);
    emitter.on('open-person-action-modal', this.openModal);
    this.chooseCityDist = this.formData.districts['台北市'].district;
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-person-action-modal', this.openModal);
  },
};
</script>

<style lang="scss"></style>
