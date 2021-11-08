<template>
  <div class="container">
    <div
      ref="settingCareerModal"
      class="settingCareerModal popModal modal fade"
      tabindex="-1"
      id="settingCareerModal"
      aria-hidden="true"
      aria-labelledby="settingCareerModalLabel"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        :class="{
          'modal-sm': modalAction === '新增用戶提醒',
          'modal-lg': modalAction === '新增用戶' || modalAction === '編輯權限',
        }"
      >
        <div class="modal-content">
          <div v-if="modalAction === '新增用戶'">
            <div
              class="popModal__header popModal__header--center border-bottom border-gray-line mb-4"
            >
              <h5 class="popModal__title">新增用戶</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <Form v-slot="{ errors }" @submit="processNewUser">
              <div class="modal-body">
                <div class="row">
                  <div class="col-6">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="newUserChineseName" class="form__label--custom form-label"
                          >用戶名稱</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="newUserChineseName"
                        name="用戶名稱"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors['用戶名稱'] }"
                        placeholder="請輸入用戶名稱"
                        rules="required"
                        v-model="tempUser.ChineseName"
                        ref="newUserChineseName"
                      ></Field>
                      <ErrorMessage name="用戶名稱" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="newUserJobTitle" class="form__label--custom form-label"
                          >職稱</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="newUserJobTitle"
                        name="職稱"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors['職稱'] }"
                        placeholder="請輸入職稱"
                        rules="required"
                        v-model="tempUser.jobTitle"
                        ref="newUserJobTitle"
                      ></Field>
                      <ErrorMessage name="職稱" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="newUserEmail" class="form__label--custom form-label"
                          >用戶Email<span class="subTxt ms-2">(將用於登入帳號)</span></label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <Field
                        id="newUserEmail"
                        name="用戶Email"
                        type="email"
                        class="form-control"
                        :class="{ 'is-invalid': errors['用戶Email'] }"
                        placeholder="請輸入用戶Email"
                        rules="required|email"
                        v-model="tempUser.email"
                        ref="newUserEmail"
                      ></Field>
                      <ErrorMessage name="用戶Email" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="newUserPhone" class="form__label--custom form-label"
                          >用戶手機號碼</label
                        >
                      </div>
                      <Field
                        id="newUserPhone"
                        name="用戶手機號碼"
                        type="tel"
                        class="form-control"
                        :class="{ 'is-invalid': errors['用戶手機號碼'] }"
                        placeholder="請輸入用戶手機號碼"
                        v-model="tempUser.phone"
                        ref="newUserPhone"
                      ></Field>
                      <ErrorMessage name="用戶手機號碼" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="newUserChineseName" class="form__label--custom form-label"
                          >管理員權限</label
                        >
                      </div>
                      <div
                        class="form-check border border-gray-line rounded ps-6 putPointer"
                        @click="tempUser.is_admin = !tempUser.is_admin"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="newUserAdmin"
                          v-model="tempUser.is_admin"
                        />
                        <label
                          class="form-check-label"
                          for="newUserAdmin"
                          @click="tempUser.is_admin = !tempUser.is_admin"
                        >
                          設為管理員 <span class="subTxt ms-1 text-secondary">(以下權限皆有)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item ps-3">
                    <p>權限設定</p>
                  </li>
                  <template v-for="(item, index) in authority" :key="index">
                    <li
                      class="list-group-item list-group-item-action p-2 ps-3 putPointer"
                      @click="item.select = !item.select"
                    >
                      <div class="row w-100 align-items-center">
                        <div class="col-4">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              :id="`authority${item.title}`"
                              v-model="item.select"
                            />
                            <label class="form-check-label" :for="`authority${item.title}`">
                              {{ item.title }}
                            </label>
                          </div>
                        </div>
                        <div class="col-8">
                          <p>{{ item.content }}</p>
                        </div>
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
              <div class="popModal__footer border-top border-gray-line">
                <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                  取消
                </button>
                <button type="submit" class="btn btn-companyColor text-light">新增用戶</button>
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
          <div v-if="modalAction === '編輯權限'">
            <div
              class="popModal__header popModal__header--center border-bottom border-gray-line mb-4"
            >
              <h5 class="popModal__title">新增用戶</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <Form @submit="saveAuthority">
              <div class="modal-body">
                <div class="row">
                  <div class="col-6">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="newUserChineseName" class="form__label--custom form-label"
                          >管理員權限</label
                        >
                      </div>
                      <div
                        class="form-check border border-gray-line rounded ps-6 putPointer"
                        @click="tempUser.is_admin = !tempUser.is_admin"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="newUserAdmin"
                          v-model="tempUser.is_admin"
                        />
                        <label
                          class="form-check-label"
                          for="newUserAdmin"
                          @click="tempUser.is_admin = !tempUser.is_admin"
                        >
                          設為管理員 <span class="subTxt ms-1 text-secondary">(以下權限皆有)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item ps-3">
                    <p>權限設定</p>
                  </li>
                  <template v-for="(item, index) in authority" :key="index">
                    <li
                      class="list-group-item list-group-item-action p-2 ps-3 putPointer"
                      @click="item.select = !item.select"
                    >
                      <div class="row w-100 align-items-center">
                        <div class="col-4">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              :id="`authority${item.title}`"
                              v-model="item.select"
                            />
                            <label class="form-check-label" :for="`authority${item.title}`">
                              {{ item.title }}
                            </label>
                          </div>
                        </div>
                        <div class="col-8">
                          <p>{{ item.content }}</p>
                        </div>
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
              <div class="popModal__footer border-top border-gray-line">
                <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                  取消
                </button>
                <button type="submit" class="btn btn-companyColor text-light">保存</button>
              </div>
            </Form>
          </div>
          <div v-if="modalAction === '綁定信箱'">
            <div class="popModal__header popModal__header--center">
              <h5 class="popModal__title">填寫預綁定信箱</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <Form v-slot="{ errors }" @submit="processNewEmail">
              <div class="modal-body">
                <div class="form__inputBox mb-0">
                  <div class="form__labelBox">
                    <label for="bindFormEmail" class="form__label--custom form-label">email</label>
                    <p class="formTag--must company">必填</p>
                  </div>
                  <Field
                    id="bindFormEmail"
                    name="email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors['email'] }"
                    placeholder="請輸入email"
                    rules="required|email"
                    v-model="tempEmail.email"
                    ref="bindFormEmail"
                  ></Field>
                  <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="popModal__footer">
                <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                  取消
                </button>
                <button type="submit" class="btn btn-companyColor text-light">傳送驗證信</button>
              </div>
            </Form>
          </div>
          <div v-if="modalAction === '驗證信箱'">
            <div class="popModal__header popModal__header--center">
              <h5 class="popModal__title">驗證您的電子信箱</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <p class="text-center mb-2 px-5">
                我們寄出了一封驗證帳號的信件給您，驗證信有效期限24小時，建議您立即驗證並依照指示完成信箱綁定。
              </p>
              <p class="text-center mb-2">查看此信箱：</p>
              <p class="text-center text-companyColor text-decoration-underline">
                {{ tempEmail.email }}
              </p>
            </div>
            <div class="popModal__footer">
              <button
                type="button"
                class="btn btn-companyColor text-light w-100"
                @click="bindEmail"
              >
                再次寄送驗證信
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';
import emitter from '@/methods/emitter';

export default {
  emits: ['new-user-data', 'return-user-data', 'new-email-data'],
  data() {
    return {
      modalAction: '',
      modal: {},
      tempUser: {
        chineseName: '',
        englishName: '',
        jobTitle: '',
        email: '',
        phone: '',
        password: '',
        userImgUrl: '',
        is_enabled: false,
        is_admin: false,
        authority: {
          瀏覽公司資料: false,
          公司頁面管理: false,
          '新增、關閉、暫停職位': false,
          '修改、重啟職位': false,
          搜尋: false,
          應徵者管理: false,
          黑名單: false,
          購買服務: false,
          權限管理: false,
          用戶管理: false,
        },
      },
      authority: [
        { title: '瀏覽公司資料', select: false, content: '修改公司基本資料' },
        {
          title: '公司頁面管理',
          select: false,
          content: '修改公司頁面內的公司簡介、照片、福利制度等區塊',
        },
        { title: '新增、關閉、暫停職位', select: false, content: '新增、關閉、暫停職位刊登' },
        {
          title: '修改、重啟職位',
          select: false,
          content: '能夠修改職務內容，以及重新開啟已關閉之職位',
        },
        { title: '搜尋', select: false, content: '搜尋人才、查看推薦人才' },
        { title: '應徵者管理', select: false, content: '瀏覽、回覆、變更應徵者之應徵狀態' },
        { title: '黑名單', select: false, content: '對求職者進行黑名單之行為，屏蔽該求職者的互動' },
        {
          title: '購買服務',
          select: false,
          content: '能夠購買首頁、職位頁、Email、社群等公司廣告之服務',
        },
        { title: '權限管理', select: false, content: '新增、刪除以及變更使用者權限' },
        { title: '用戶管理', select: false, content: '新增、刪除、修改用戶資料' },
      ],
      tempEmail: {
        email: '',
        is_enabled: false,
        time: null,
        key: null,
      },
    };
  },
  methods: {
    saveAuthority() {
      this.processAuthority();
      this.modalAction = '';
      console.log(this.tempUser);
      this.$emit('return-user-data', this.tempUser);
    },
    processNewEmail() {
      this.modalAction = '驗證信箱';
    },
    bindEmail() {
      this.tempEmail.is_enabled = true;
      this.tempEmail.time = new Date().getTime();
      console.log(this.tempEmail);
      this.$emit('new-email-data', this.tempEmail);
      this.tempEmail = {
        email: '',
        is_enabled: false,
        time: null,
        key: null,
      };
      this.closeModal();
    },
    processAuthority() {
      if (this.tempUser.is_admin === false) {
        this.authority.forEach((item) => {
          if (item.select === true) {
            this.tempUser.authority[item.title] = true;
          } else {
            this.tempUser.authority[item.title] = false;
          }
        });
      } else {
        this.authority.forEach((item) => {
          this.tempUser.authority[item.title] = true;
        });
      }
    },
    processNewUser() {
      this.processAuthority();
      this.modalAction = '新增用戶提醒';
      this.$emit('new-user-data', this.tempUser);
    },
    openModal(obj) {
      this.modalAction = obj.action;
      if (this.modalAction === '新增用戶') {
        this.modal.show();
      } else if (this.modalAction === '綁定信箱') {
        this.modal.show();
      } else {
        this.tempUser = JSON.parse(JSON.stringify(obj.data));
        setTimeout(() => {
          this.modal.show();
        }, 100);
      }
    },
    closeModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.settingCareerModal);
    emitter.on('open-setting-company-user-modal', this.openModal);
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-setting-company-user-modal', this.openModal);
  },
};
</script>

<style lang="scss"></style>
