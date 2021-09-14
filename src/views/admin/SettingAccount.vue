<template>
  <div class="adminPage--py">
    <div ref="adminSubHeader" class="admin__subHeader mb-6 box--shadow">
      <div class="container">
        <div class="admin__subNav">
          <li class="d-flex align-items-center d-md-flex d-none">
            <h2 class="admin__subNav__title">個人帳戶</h2>
          </li>
          <li
            class="admin__subNav__item"
            @click="changeSideHeader('基本資料')"
            :class="{ active: subTopNav === '基本資料' }"
          >
            <p class="admin__subNav__txt me-1">基本資料</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="changeSideHeader('求職意向')"
            :class="{ active: subTopNav === '求職意向' }"
          >
            <p class="admin__subNav__txt me-1">求職意向</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="changeSideHeader('帳號設定')"
            :class="{ active: subTopNav === '帳號設定' }"
          >
            <p class="admin__subNav__txt me-1">帳號設定</p>
          </li>
        </div>
      </div>
    </div>
    <div class="container position-relative">
      <div class="row justify-content-center">
        <div class="col-lg-9 col-12">
          <div class="admin__mainContent">
            <h3 class="admin__mainContent__title">帳號設定</h3>
            <div>
              <ul class="row">
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <p class="infoList__item__title">帳號信箱</p>
                        <p v-if="user.account.email !== ''" class="infoList__item__content">
                          {{ user.account.email }}
                        </p>
                        <p v-if="user.account.email === ''" class="infoList__item__content">
                          尚未填寫
                        </p>
                      </div>
                      <button
                        type="button"
                        class="btn--edit btn btn-gray-light text-dark"
                        @click="openSettingAccountModal('變更帳號')"
                      >
                        <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <p class="infoList__item__title">聯絡電話</p>
                        <p v-if="user.account.phone !== ''" class="infoList__item__content">
                          {{ user.account.phone }}
                        </p>
                        <p v-if="user.account.phone === ''" class="infoList__item__content">
                          尚未填寫
                        </p>
                      </div>
                      <button
                        type="button"
                        class="btn--edit btn btn-gray-light text-dark"
                        @click="openSettingAccountModal('變更電話')"
                      >
                        <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <p class="infoList__item__title">密碼</p>
                        <p v-if="user.account.password !== ''" class="infoList__item__content">
                          {{ user.account.password }}
                        </p>
                        <p v-if="user.account.password === ''" class="infoList__item__content">
                          尚未填寫
                        </p>
                      </div>
                      <button
                        type="button"
                        class="btn--edit btn btn-gray-light text-dark"
                        @click="openSettingAccountModal('變更密碼')"
                      >
                        <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <p class="infoList__item__title">雙重認證</p>
                        <p class="infoList__item__content">
                          一經設定，後續除了需要填寫帳號密碼外，同時需要填寫行動裝置上的驗證碼才能進行登入。
                        </p>
                      </div>
                      <button type="button" class="btn btn-primary text-dark">啟動雙重認證</button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item">
                    <p class="infoList__item__title">社群連結</p>
                    <p class="infoList__item__content mb-3">
                      連結您的社群帳號，除了可以快速登入外，也能增加企業聯繫方式。
                    </p>
                    <div
                      class="infoList__item__socialMediaBox putPointer mb-2 justify-content-between"
                    >
                      <div class="d-flex align-items-center">
                        <i class="jobIcon bi bi-facebook me-6"></i>
                        <div>
                          <p class="socialMediaBox__title">Jordan Tseng</p>
                          <p class="socialMediaBox__link subTxt">Facebook</p>
                        </div>
                      </div>
                      <div class="d-flex">
                        <button
                          type="button"
                          class="btn btn--switch me-2"
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
                    <div
                      class="infoList__item__socialMediaBox putPointer mb-2 justify-content-between"
                    >
                      <div class="d-flex align-items-center">
                        <i class="jobIcon bi bi-google me-6"></i>
                        <div>
                          <p class="socialMediaBox__title">Jordan Tseng</p>
                          <p class="socialMediaBox__link subTxt">Google</p>
                        </div>
                      </div>
                      <div class="d-flex">
                        <button
                          type="button"
                          class="btn btn--switch me-2"
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
                <li class="col-12">
                  <div class="infoList__item show--compressed listLast">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <p class="infoList__item__title">刪除帳號</p>
                        <p class="infoList__item__content">
                          點擊刪除帳號後帳號依舊會保留7 天，於此期間內隨時可以選擇取消刪除。
                        </p>
                      </div>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        @click="openSettingAccountModal('刪除帳號')"
                      >
                        刪除帳號
                      </button>
                    </div>
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
import database from '@/methods/firebaseinit';

export default {
  components: { SettingAccountModal },
  data() {
    return {
      subTopNav: '帳號設定',
      personalState: true,
      settingSideList: '個人資料',
      skillShowStyle: true,
      user: {
        account: {
          chineseName: '',
          EnglishName: '',
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
    changeSideHeader(navName) {
      if (navName === '基本資料') {
        this.subTopNav = navName;
        this.$router.push('/admin/setting');
      } else if (navName === '求職意向') {
        this.subTopNav = navName;
        this.$router.push('/admin/setting-career');
      } else if (navName === '帳號設定') {
        this.subTopNav = navName;
        this.$router.push('/admin/setting-account');
      }
    },
  },
  created() {
    this.getFbData();
  },
};
</script>

<style lang="scss"></style>
