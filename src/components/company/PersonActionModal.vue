<template>
  <div class="container">
    <div
      ref="personActionModal"
      class="modal fade popModal"
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
            modalAction === '邀請面試' || modalAction === '錄取' || modalAction === '婉拒',
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
          <div class="modal-body mb-4">
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
          <Form v-slot="{ errors }" @submit="processNewUser">
            <div class="modal-body">
              <div class="row">
                <div class="col-6">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobName" class="form__label--custom form-label">職位</label>
                      <p class="formTag--must company">必填</p>
                    </div>
                    <Field
                      id="jobName"
                      name="職位"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['職位'] }"
                      placeholder="請輸入職位"
                      rules="required"
                      v-model="form.jobInfo.jobName"
                      ref="jobName"
                    ></Field>
                    <ErrorMessage name="職位" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobInterViewDay" class="form__label--custom form-label"
                        >面試日期</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <Field
                      id="jobInterViewDay"
                      ref="jobInterViewDay"
                      name="面試日期"
                      type="date"
                      class="form-control"
                      :class="{ 'is-invalid': errors['面試日期'] }"
                      placeholder="請選擇面試日期"
                      rules="required"
                      v-model="form.jobInfo.interviewDate"
                    ></Field>
                    <ErrorMessage name="生日" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-12">
                  <!-- 公司地址 -->
                  <div class="d-flex align-items-end mb-4">
                    <div class="inputGroup--item me-2">
                      <div class="form__labelBox">
                        <label for="jobFormCompanyCity" class="form__label--custom form-label"
                          >公司地址</label
                        >
                      </div>
                      <Field
                        id="jobFormCompanyCity"
                        ref="jobFormCompanyCity"
                        name="縣市"
                        as="select"
                        class="form-control form-select w-auto"
                        :class="{ 'is-invalid': errors['縣市'] }"
                        v-model="form.jobInfo.interViewAddress.addressCity"
                        @change="chooseDist(form.jobInfo.interViewAddress.addressCity)"
                      >
                        <option value="" disabled selected>請選擇縣市</option>
                        <option v-for="city in formData.cities" :value="city" :key="city">
                          {{ city }}
                        </option>
                      </Field>
                      <ErrorMessage name="縣市" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="inputGroup--item me-4">
                      <div class="form__labelBox">
                        <label for="jobFormCompanyDist" class="form__label--custom form-label"
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
                        v-model="form.jobInfo.interViewAddress.addressDist"
                      >
                        <option value="" disabled selected>請選擇區域鄉鎮</option>
                        <option v-for="dist in chooseCityDist" :value="dist" :key="dist">
                          {{ dist }}
                        </option>
                      </Field>
                      <ErrorMessage name="區域鄉鎮" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="sameAddressWithCompany"
                        v-model="sameAddressWithCompany"
                        @change="putCompanyAddressToJob"
                      />
                      <label class="form-check-label" for="sameAddressWithCompany">
                        同公司地址
                      </label>
                    </div>
                  </div>
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormAddressDetail" class="form__label--custom form-label"
                        >公司詳細地址</label
                      >
                    </div>
                    <Field
                      id="jobFormAddressDetail"
                      ref="jobFormAddressDetail"
                      name="公司詳細地址"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['公司詳細地址'] }"
                      placeholder="請輸入公司詳細地址"
                      v-model="form.jobInfo.interViewAddress.addressDetail"
                    ></Field>
                    <ErrorMessage name="公司詳細地址" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="staffName" class="form__label--custom form-label"
                        >職位聯絡人</label
                      >
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
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="staffJobTitle" class="form__label--custom form-label">職稱</label>
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
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="staffEmail" class="form__label--custom form-label"
                        >聯絡信箱</label
                      >
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
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="staffPhone" class="form__label--custom form-label"
                        >聯絡電話</label
                      >
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
              <div class="row">
                <div class="col-6" v-if="dataReady === true">
                  <div class="inputGroup--item mb-3">
                    <label for="formMessageTemplate" class="form-label inputItem__title"
                      >訊息模板</label
                    >
                    <select
                      class="form-select"
                      aria-label="模板"
                      id="formMessageTemplate"
                      v-model="form.message"
                    >
                      <option disabled>請選擇文字模板</option>
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
                  <div class="form__inputBox form__infoEditBox mb-1">
                    <div class="form__labelBox">
                      <label for="formMessage" class="form__label--custom form-label"
                        >訊息內容</label
                      >
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
                        覆蓋文字模板
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

            <div class="popModal__footer border-top border-gray-line">
              <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                取消
              </button>
              <button type="submit" class="btn btn-companyColor text-light">傳送</button>
            </div>
          </Form>
        </div>
        <div v-if="modalAction === '新增用戶提醒'">
          <div class="popModal__header popModal__header--center">
            <h5 class="popModal__title">新增用戶</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>新增完成</p>
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
      modalAction: '',
      dataReady: false,
      user: {},
      myAccountData: {},
      form: {
        action: '',
        staff: {
          name: '',
          phone: '',
          jobTitle: '',
          email: '',
        },
        message: '',
        jobInfo: {
          jobName: '',
          jobKey: '',
          interViewDate: '',
          interViewAddress: {
            addressCity: '',
            addressDist: '',
            addressDetail: '',
            totalAddress: '',
          },
        },
      },
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
    startAction(action) {
      this.modalAction = action;
      this.getTxtData();
    },
    openModal(obj) {
      console.log(obj);
      this.user = obj.user;
      this.modalAction = obj.action;
      this.modal.show();
    },
    getTxtData() {
      const AccountRef = database.ref('company/myAccount');
      AccountRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.myAccountData = JSON.parse(JSON.stringify(data));
        this.dataReady = true;
      });
    },
    closeModal() {
      this.modal.hide();
    },
    // pick city data
    chooseDist(cityName) {
      this.chooseCityDist = [];
      this.chooseCityDist = this.formData.districts[cityName].district;
      const [temDist] = this.chooseCityDist;
      this.form.jobInfo.interViewAddress.addressDist = temDist;
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
