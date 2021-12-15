<template>
  <div class="adminPage--py">
    <AdminNav :nowPage="nowPage" />
    <div class="container-xl position-relative">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-12">
          <div class="adminContentBox adminContentBox--full">
            <div class="adminContentBox__body">
              <h3 class="pageSubTitle">帳號設定</h3>
              <ul class="infoList infoList--jobSeeker infoList--withBtn infoList--row">
                <li class="infoList__item">
                  <div>
                    <p class="infoList__item__title">帳號信箱</p>
                    <p v-if="user.account.email !== ''" class="infoList__item__content">
                      {{ user.account.email }}
                    </p>
                    <p v-if="user.account.email === ''" class="infoList__item__content">尚未填寫</p>
                  </div>
                  <div class="infoList__btnBox">
                    <button
                      type="button"
                      class="btn text-dark"
                      @click="openSettingAccountModal('變更帳號')"
                    >
                      <i class="jobIcon--sm bi bi-pencil-square"></i>
                    </button>
                  </div>
                </li>
                <li class="infoList__item">
                  <div>
                    <p class="infoList__item__title">聯絡電話</p>
                    <p v-if="user.account.phone !== ''" class="infoList__item__content">
                      {{ user.account.phone }}
                    </p>
                    <p v-if="user.account.phone === ''" class="infoList__item__content">尚未填寫</p>
                  </div>
                  <div class="infoList__btnBox">
                    <button
                      type="button"
                      class="btn text-dark"
                      @click="openSettingAccountModal('變更電話')"
                    >
                      <i class="jobIcon--sm bi bi-pencil-square"></i>
                    </button>
                  </div>
                </li>
                <li class="infoList__item">
                  <div>
                    <p class="infoList__item__title">密碼</p>
                    <p v-if="user.account.password !== ''" class="infoList__item__content">
                      {{ user.account.password }}
                    </p>
                    <p v-if="user.account.password === ''" class="infoList__item__content">
                      尚未填寫
                    </p>
                  </div>
                  <div class="infoList__btnBox">
                    <button
                      type="button"
                      class="btn text-dark"
                      @click="openSettingAccountModal('變更密碼')"
                    >
                      <i class="jobIcon--sm bi bi-pencil-square"></i>
                    </button>
                  </div>
                </li>
                <li class="infoList__item">
                  <div>
                    <p class="infoList__item__title">雙重認證</p>
                    <p class="infoList__item__content">
                      一經設定，後續除了需要填寫帳號密碼外，同時需要填寫行動裝置上的驗證碼才能進行登入。
                    </p>
                  </div>
                  <div class="infoList__btnBox">
                    <button type="button" class="btn btn-primary text-nowrap">啟動雙重認證</button>
                  </div>
                </li>
                <li class="infoList__item flex-column align-items-stretch">
                  <p class="infoList__item__title">社群連結</p>
                  <p class="infoList__item__content mb-3">
                    連結您的社群帳號，除了可以快速登入外，也能增加企業聯繫方式。
                  </p>
                  <div>
                    <div class="infoList__item__socialMediaBox putPointer mb-2">
                      <div class="d-flex align-items-center flex-grow-1 mb-lg-0 mb-3">
                        <i class="jobIcon bi bi-facebook me-6"></i>
                        <div>
                          <p class="socialMediaBox__title">Jordan Tseng</p>
                          <p class="txtLink">Facebook</p>
                        </div>
                      </div>
                      <div class="d-flex justify-content-end flex-grow-1">
                        <button
                          type="button"
                          class="btn btn--switch btn--switch--jobSeeker me-2"
                          @click="toogleData('skillShowStyle')"
                        >
                          <div class="switch__container" :class="{ active: skillShowStyle }">
                            <div class="switch__controller"></div>
                          </div>
                          顯示在個人帳號
                        </button>
                        <button type="button" class="btn btn--text--dark">
                          <i class="jobIcon-sm bi bi-x-lg"></i>
                        </button>
                      </div>
                    </div>
                    <div class="infoList__item__socialMediaBox putPointer mb-2">
                      <div class="d-flex align-items-center flex-grow-1 mb-lg-0 mb-3">
                        <i class="jobIcon bi bi-google me-6"></i>
                        <div>
                          <p class="socialMediaBox__title">Jordan Tseng</p>
                          <p class="txtLink">Google</p>
                        </div>
                      </div>
                      <div class="d-flex justify-content-end flex-grow-1">
                        <button
                          type="button"
                          class="btn btn--switch btn--switch--jobSeeker me-2"
                          @click="toogleData('skillShowStyle')"
                        >
                          <div class="switch__container" :class="{ active: skillShowStyle }">
                            <div class="switch__controller"></div>
                          </div>
                          顯示在個人帳號
                        </button>
                        <button type="button" class="btn btn--text--dark">
                          <i class="jobIcon-sm bi bi-x-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item list--last">
                  <div class="mb-lg-0 mb-3">
                    <p class="infoList__item__title">刪除帳號</p>
                    <p class="infoList__item__content">
                      點擊刪除帳號後帳號依舊會保留7 天，於此期間內隨時可以選擇取消刪除。
                    </p>
                  </div>
                  <div class="infoList__btnBox">
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="openSettingAccountModal('刪除帳號')"
                    >
                      刪除帳號
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SettingAccountModal :userData="user" />
</template>

<script>
import emitter from '@/methods/emitter';
import SettingAccountModal from '@/components/admin/SettingAccountModal.vue';
import AdminNav from '@/components/admin/AdminNav.vue';
import database from '@/methods/firebaseinit';

export default {
  components: { SettingAccountModal, AdminNav },
  data() {
    return {
      nowPage: '帳號設定',
      personalState: true,
      settingSideList: '個人資料',
      skillShowStyle: true,
      user: {
        account: {
          chineseName: '',
          englishName: '',
          jobTitle: '',
          gender: '',
          birthday: '',
          email: '',
          phone: '',
          addressCity: '',
          addressDist: '',
          password: '',
          socialMedia: [],
        },
        workExp: {
          years: 0,
          works: [],
        },
        educationExp: {
          lastestEducation: '',
          educations: [],
        },
        languages: [],
        Licenses: [],
        skill: [],
        others: {
          driverLicenses: [],
          identity: [],
          militaryService: '',
        },
      },
    };
  },
  methods: {
    // 保存資料
    saveAllData() {
      const userRef = database.ref('user');
      userRef.set(this.user);
      this.getFbData();
      this.editMode = false;
    },
    // 取得資料
    getFbData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = data;
      });
    },
    openSettingAccountModal(action) {
      emitter.emit('open-setting-account-modal', action);
    },
    toogleData(dataName) {
      if (this[dataName]) {
        this[dataName] = false;
      } else if (!this[dataName]) {
        this[dataName] = true;
      }
    },
    changePersonalState() {
      if (this.personalState) {
        this.personalState = false;
      } else if (!this.personalState) {
        this.personalState = true;
      }
    },
    selectListItem(navName) {
      this.settingSideList = navName;
    },
  },
  created() {
    this.getFbData();
  },
};
</script>

<style lang="scss"></style>
