<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container position-relative">
      <div class="row justify-content-center">
        <div class="col-lg-9 col-12">
          <div class="admin__mainContent">
            <h3 class="admin__mainContent__title">{{ nowPage }}</h3>
            <ul class="infoList infoList--company">
              <li class="infoList__item show--compressed">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">帳號信箱</p>
                    <p v-if="user.email !== ''" class="infoList__item__content">
                      {{ user.email }}
                    </p>
                    <p v-if="user.email === ''" class="infoList__item__content">尚未填寫</p>
                  </div>
                  <button
                    type="button"
                    class="btn--edit btn btn-gray-light text-dark"
                    @click="openSettingAccountModal('變更帳號')"
                  >
                    <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                  </button>
                </div>
              </li>
              <li class="infoList__item show--compressed">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">聯絡電話</p>
                    <p v-if="user.phone !== ''" class="infoList__item__content">
                      {{ user.phone }}
                    </p>
                    <p v-if="user.phone === ''" class="infoList__item__content">尚未填寫</p>
                  </div>
                  <button
                    type="button"
                    class="btn--edit btn btn-gray-light text-dark"
                    @click="openSettingAccountModal('變更電話')"
                  >
                    <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                  </button>
                </div>
              </li>
              <li class="infoList__item show--compressed">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">密碼</p>
                    <p v-if="user.password !== ''" class="infoList__item__content">
                      {{ user.password }}
                    </p>
                    <p v-if="user.password === ''" class="infoList__item__content">尚未填寫</p>
                  </div>
                  <button
                    type="button"
                    class="btn--edit btn btn-gray-light text-dark"
                    @click="openSettingAccountModal('變更密碼')"
                  >
                    <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                  </button>
                </div>
              </li>
              <li class="infoList__item show--compressed">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">雙重認證</p>
                    <p class="infoList__item__content">
                      一經設定，後續除了需要填寫帳號密碼外，同時需要填寫行動裝置上的驗證碼才能進行登入。
                    </p>
                  </div>
                  <button type="button" class="btn btn-companyColor text-light">
                    啟動雙重認證
                  </button>
                </div>
              </li>
              <li class="infoList__item show--compressed list--last">
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
  <SettingAccountModal :userData="user" @return-user-data="getAccountDataFormModal" />
</template>

<script>
import emitter from '@/methods/emitter';
import SettingAccountModal from '@/components/company/SettingAccountModal.vue';
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import database from '@/methods/firebaseinit';

export default {
  components: { SettingAccountModal, CompanyAdminNav },
  data() {
    return {
      nowPage: '我的帳戶',
      personalState: true,
      settingSideList: '個人資料',
      skillShowStyle: true,
      user: {
        chineseName: '',
        englishName: '',
        jobTitle: '',
        email: '',
        phone: '',
        password: '',
        userImgUrl: '',
      },
    };
  },
  methods: {
    // 保存資料
    saveAccountData() {
      const companyUserRef = database.ref('company/myAccount');
      companyUserRef.set(this.user);
    },
    // 取得資料
    getAccountData() {
      const companyUserRef = database.ref('company/myAccount');
      companyUserRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = data;
      });
    },
    // 取得 modal 資料
    getAccountDataFormModal(obj) {
      this.user = obj;
      this.saveAccountData();
    },
    // 打開 modal
    openSettingAccountModal(action) {
      emitter.emit('open-setting-account-company-modal', action);
    },
  },
  created() {
    this.getAccountData();
  },
};
</script>

<style lang="scss"></style>
