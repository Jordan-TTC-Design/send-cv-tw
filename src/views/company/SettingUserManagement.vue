<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="jobsListContainer container">
      <div class="row">
        <div class="col-12">
          <div class="jobListBox">
            <div
              class="
                d-flex
                justify-content-between
                align-items-center
                px-3
                mb-3
                bg-light
                rounded
                py-2
              "
            >
              <p class="text-secondary fw-normal text-nowrap">目前共 10 個用戶</p>
              <button
                type="btn"
                class="btn btn-outline-companyColor"
                @click="openSettingUserModal('新增用戶')"
              >
                新增用戶
              </button>
            </div>
            <ul class="adminList--single">
              <li class="list__item flex-md-row flex-column box--shadow p-3">
                <div class="w-50">
                  <p class="itemTitle text-dark d-flex align-items-center mb-1">
                    {{ meUser.ChineseName }}<span class="jobTag ms-2">{{ meUser.userRole }}</span
                    ><span class="jobTag jobTag--company ms-2">本人</span>
                  </p>
                  <p>jordan.tseng@talentgroup.asia</p>
                </div>
                <div class="d-flex">
                  <div
                    class="btn btn--switch btn--switch--company putPointer"
                    :class="{ 'text-secondary': !meUser.is_enabled }"
                    @click="meUser.is_enabled = !meUser.is_enabled"
                  >
                    {{ meUser.is_enabled ? '帳號使用中' : '帳號已關閉' }}
                    <div class="ms-2 switch__container" :class="{ active: meUser.is_enabled }">
                      <div class="switch__controller"></div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-gray-light text-dark">編輯</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
  <SettingUserModal @new-user-data="newUserToList" />
</template>

<script>
import emitter from '@/methods/emitter';
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import SettingUserModal from '@/components/company/SettingUserModal.vue';
import database from '@/methods/firebaseinit';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';

export default {
  components: {
    CompanyAdminNav,
    SettingUserModal,
    UpTopBtn,
  },
  data() {
    return {
      nowPage: '用戶管理',
      personalState: true,
      settingSideList: '個人資料',
      skillShowStyle: true,
      meUser: {
        ChineseName: '',
        EnglishName: '',
        jobTitle: '',
        email: '',
        phone: '',
        password: '',
        userImgUrl: '',
      },
      userList: [],
    };
  },
  methods: {
    newUserToList(array) {
      this.userList = array;
      this.saveUserListData();
      console.log(this.userList);
    },
    // 保存全部用戶資料
    saveUserListData() {
      const companyUserListRef = database.ref('company/userList');
      companyUserListRef.set(this.userList);
    },
    // 取得全部用戶資料
    getUserListData() {
      const companyUserListRef = database.ref('companyuserList');
      companyUserListRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.userList = data;
      });
    },
    // 保存資料
    saveAccountData() {
      const companyUserRef = database.ref('company/myAccount');
      companyUserRef.set(this.meUser);
    },
    // 取得資料
    getAccountData() {
      const companyUserRef = database.ref('company/myAccount');
      companyUserRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.meUser = data;
      });
    },
    // 取得 modal 資料
    getAccountDataFormModal(obj) {
      this.user = obj;
      this.saveAccountData();
    },
    // 打開 modal
    openSettingUserModal(action) {
      const obj = {
        action,
      };
      emitter.emit('open-setting-company-user-modal', obj);
    },
  },
  created() {
    this.getAccountData();
    this.getUserListData();
  },
};
</script>

<style lang="scss"></style>
