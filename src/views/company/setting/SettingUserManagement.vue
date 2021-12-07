<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container">
      <div class="row justify-content-center" v-if="!editMode">
        <div class="col-lg-10 col-12">
          <ul class="adminList adminList--card">
            <li class="adminList__item adminList__titleItem">
              <p class="text-secondary fw-normal text-nowrap">
                目前共 {{ userList.length }} 個用戶
              </p>
              <button
                type="btn"
                class="btn btn-outline-companyColor"
                @click="openSettingUserModal('新增用戶')"
              >
                新增用戶
              </button>
            </li>
            <li class="adminList__item">
              <div class="adminList__item__body">
                <p class="itemTitle text-dark d-flex align-items-center mb-1">
                  {{ meUser.chineseName }}<span class="jobTag ms-2">{{ meUser.userRole }}</span
                  ><span class="jobTag jobTag--company ms-2">本人</span>
                </p>
                <p>{{ meUser.email }}</p>
              </div>
              <div class="adminList__item__footer--line btnBox">
                <div
                  class="btn btn--switch btn--switch--company putPointer"
                  :class="{ 'text-secondary': !meUser.is_enabled }"
                  @click="toogleUserState(meUser.key)"
                >
                  {{ meUser.is_enabled ? '帳號使用中' : '帳號已關閉' }}
                  <div class="ms-2 switch__container" :class="{ active: meUser.is_enabled }">
                    <div class="switch__controller"></div>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-gray-light text-dark"
                  @click="editUserData(meUser.key)"
                >
                  編輯
                </button>
              </div>
            </li>
            <template v-for="item in userList" :key="item.key">
              <li class="adminList__item" v-if="item.key !== meUser.key">
                <div class="adminList__item__body">
                  <p class="itemTitle text-dark d-flex align-items-center mb-1">
                    {{ item.chineseName }}
                    <span class="jobTag ms-2" v-if="item.is_admin">管理員</span>
                  </p>
                  <p>{{ item.email }}</p>
                </div>
                <div class="adminList__item__footer--line btnBox">
                  <div
                    class="btn btn--switch btn--switch--company putPointer"
                    :class="{ 'text-secondary': !item.is_enabled }"
                    @click="toogleUserState(item.key)"
                  >
                    {{ item.is_enabled ? '帳號使用中' : '帳號已關閉' }}
                    <div class="ms-2 switch__container" :class="{ active: item.is_enabled }">
                      <div class="switch__controller"></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-gray-light text-dark"
                    @click="editUserData(item.key)"
                  >
                    編輯
                  </button>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="row" v-if="editMode">
        <div class="col-lg-3 col-12">
          <button
            type="button"
            class="btn btn-light w-100 d-flex align-items-center mb-4"
            @click="backToUserList"
          >
            <i class="jobIcon bi bi-chevron-left me-2"></i>返回用戶列表
          </button>
          <div class="setting__sideList">
            <div class="setting__sideList__top">
              <div class="userImgBox mb-4 bg-gray-light">
                <img class="userImgBox__img" :src="tempUser.userImgUrl" alt="用戶照片" />
                <div class="userImgBox__editBtn">
                  <button type="button" class="btn btn--circle" @click="OpenEditUserPhotoModal">
                    <i class="jobIcon bi bi-pencil-square text-dark"></i>
                  </button>
                </div>
              </div>
              <p class="mb-3">{{ tempUser.chineseName }}</p>
              <div class="form__input w-100">
                <div
                  class="btn border-gray-line border btn--switch putPointer"
                  @click="tempUser.is_enabled = !tempUser.is_enabled"
                >
                  {{ tempUser.is_enabled ? `帳號使用中` : `帳號已關閉` }}
                  <div class="switch__container" :class="{ active: tempUser.is_enabled }">
                    <div class="switch__controller"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <div class="admin__mainContent">
            <ul class="infoList--company">
              <li class="infoList__item">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">中文姓名</p>
                    <p v-if="tempUser.chineseName !== ''" class="infoList__item__content">
                      {{ tempUser.chineseName }}
                    </p>
                    <p v-if="tempUser.chineseName === ''" class="infoList__item__content">
                      尚未填寫
                    </p>
                  </div>
                  <button
                    type="button"
                    class="btn--edit btn btn-gray-light text-dark"
                    @click="openSettingUserModal('變更中文姓名')"
                  >
                    <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                  </button>
                </div>
              </li>
              <li class="infoList__item">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">英文姓名</p>
                    <p v-if="tempUser.englishName !== ''" class="infoList__item__content">
                      {{ tempUser.englishName }}
                    </p>
                    <p v-if="tempUser.englishName === ''" class="infoList__item__content">
                      尚未填寫
                    </p>
                  </div>
                  <button
                    type="button"
                    class="btn--edit btn btn-gray-light text-dark"
                    @click="openSettingUserModal('變更英文姓名')"
                  >
                    <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                  </button>
                </div>
              </li>
              <li class="infoList__item">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">職稱</p>
                    <p v-if="tempUser.jobTitle !== ''" class="infoList__item__content">
                      {{ tempUser.jobTitle }}
                    </p>
                    <p v-if="tempUser.jobTitle === ''" class="infoList__item__content">尚未填寫</p>
                  </div>
                  <button
                    type="button"
                    class="btn--edit btn btn-gray-light text-dark"
                    @click="openSettingUserModal('變更職稱')"
                  >
                    <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                  </button>
                </div>
              </li>
              <li class="infoList__item">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">帳號信箱</p>
                    <p v-if="tempUser.email !== ''" class="infoList__item__content">
                      {{ tempUser.email }}
                    </p>
                    <p v-if="tempUser.email === ''" class="infoList__item__content">尚未填寫</p>
                  </div>
                  <button
                    type="button"
                    class="btn--edit btn btn-gray-light text-dark"
                    @click="openSettingUserModal('變更帳號信箱')"
                  >
                    <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                  </button>
                </div>
              </li>
              <li class="infoList__item">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">密碼</p>
                    <p v-if="tempUser.password !== ''" class="infoList__item__content">
                      {{ tempUser.password }}
                    </p>
                    <p v-if="tempUser.password === ''" class="infoList__item__content">尚未填寫</p>
                  </div>
                  <button
                    type="button"
                    class="btn--edit btn btn-gray-light text-dark"
                    @click="openSettingUserModal('變更密碼')"
                  >
                    <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                  </button>
                </div>
              </li>
              <li class="infoList__item">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">手機號碼</p>
                    <p v-if="tempUser.phone !== ''" class="infoList__item__content">
                      {{ tempUser.phone }}
                    </p>
                    <p v-if="tempUser.phone === ''" class="infoList__item__content">尚未填寫</p>
                  </div>
                  <button
                    type="button"
                    class="btn--edit btn btn-gray-light text-dark"
                    @click="openSettingUserModal('變更手機號碼')"
                  >
                    <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                  </button>
                </div>
              </li>
              <li class="infoList__item show--compressed">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">權限設定</p>
                    <p v-if="tempUser.is_admin" class="infoList__item__content">管理員</p>
                    <ul v-if="!tempUser.is_admin" class="infoList__item__skillList">
                      <template v-for="(item, index) in authority" :key="index">
                        <li class="infoList__item__skillList__skill">
                          <p>{{ item }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                  <button
                    type="button"
                    class="btn--edit btn btn-gray-light text-dark"
                    @click="openSettingUserModal('編輯權限')"
                  >
                    <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                  </button>
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
  <SettingUserModal @new-user-data="newUserToList" @return-user-data="getUserDataFormModal" />
  <UserPhotoEdit :userImgUrl="tempUser.userImgUrl" @emit-send-img-data="getImg" />
  <SettingAccountModal :userData="tempUser" @return-user-data="getAccountDataFormModal" />
</template>

<script>
import emitter from '@/methods/emitter';
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import UserPhotoEdit from '@/components/admin/UserPhotoEdit.vue';
import SettingAccountModal from '@/components/company/SettingAccountModal.vue';
import SettingUserModal from '@/components/company/SettingUserModal.vue';
import database from '@/methods/firebaseinit';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';

export default {
  components: {
    CompanyAdminNav,
    UserPhotoEdit,
    SettingUserModal,
    SettingAccountModal,
    UpTopBtn,
  },
  data() {
    return {
      nowPage: '用戶管理',
      personalState: true,
      settingSideList: '個人資料',
      skillShowStyle: true,
      meUser: {
        chineseName: '',
        englishName: '',
        jobTitle: '',
        email: '',
        phone: '',
        password: '',
        userImgUrl: '',
        authority: [],
        notify: {
          web: {
            applys: {
              is_enabled: true,
              useWeb: true,
              useShotToApply: true,
              useEmailToApply: true,
              agreeInterView: true,
              agreeAdmission: true,
              refuse: true,
            },
            chatRoom: { is_enabled: true },
            recommend: { is_enabled: true },
            interView: { is_enabled: true },
          },
          email: {
            applys: {
              is_enabled: true,
              useWeb: true,
              useShotToApply: true,
              useEmailToApply: true,
              agreeInterView: true,
              agreeAdmission: true,
              refuse: true,
            },
            chatRoom: { is_enabled: true },
            recommend: { is_enabled: true },
            jobs: {
              is_enabled: true,
              success: true,
              closed: true,
              restart: true,
              promote: true,
            },
            interView: { is_enabled: true },
          },
          app: {
            applys: {
              is_enabled: true,
              useWeb: true,
              useShotToApply: true,
              useEmailToApply: true,
              agreeInterView: true,
              agreeAdmission: true,
              refuse: true,
            },
            chatRoom: { is_enabled: true },
            recommend: { is_enabled: true },
            jobs: {
              is_enabled: true,
              success: true,
              closed: true,
              restart: true,
              promote: true,
            },
            interView: { is_enabled: true },
          },
        },
        login: false,
      },
      userList: [],
      tempUser: {},
      editMode: false,
      authority: [],
      tempImgurl: '',
    };
  },
  methods: {
    toogleUserState(key) {
      console.log(key);
      this.tempUser = this.userList.find((item) => item.key === key);
      this.tempUser.is_enabled = !this.tempUser.is_enabled;
      this.saveUserData();
    },
    // 取得 modal 資料
    getAccountDataFormModal(obj) {
      this.tempUser = obj;
      this.saveUserData();
    },
    getImg(data) {
      this.tempImgurl = data;
      this.updateImg();
    },
    updateImg() {
      emitter.emit('spinner-open');
      const item = this.tempImgurl;
      const base64String = item.replace('data:image/jpeg;base64,', '');
      console.log(item);
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
          this.tempUser.userImgUrl = res.data.data.link;
          emitter.emit('spinner-close');
          this.saveUserData();
        })
        .catch((err) => {
          console.log(err);
          emitter.emit('spinner-close');
        });
    },
    OpenEditUserPhotoModal() {
      emitter.emit('open-uploadUserImgModal', '個人照片說明1');
    },
    editUserData(key) {
      this.tempUser = this.userList.find((item) => item.key === key);
      this.editMode = true;
      const tempArray = Object.keys(this.tempUser.authority);
      tempArray.forEach((item) => {
        if (this.tempUser.authority[item] === true) {
          this.authority.push(item);
        }
      });
    },
    backToUserList() {
      this.tempUser = {};
      this.editMode = false;
    },
    newUserToList(array) {
      const companyUserListRef = database.ref('company/userList');
      console.log(companyUserListRef);
      const { key } = companyUserListRef.push();
      const obj = array;
      obj.key = key;
      console.log(obj);
      companyUserListRef.child(key).set(obj);
      this.getUserListData();
    },
    getUserDataFormModal(obj) {
      this.tempUser = obj;
      console.log(this.tempUser);
      this.saveUserData();
    },
    // 保存用戶資料
    saveUserData() {
      console.log(this.tempUser);
      const obj = {};
      this.userList.forEach((item) => {
        // 陣列轉回物件
        obj[item.key] = item;
      });
      this.saveUserListData(obj);
    },
    // 保存全部用戶資料
    saveUserListData(obj) {
      const companyUserListRef = database.ref('company/userList');
      companyUserListRef.set(obj);
      this.getUserListData();
    },
    // 取得全部用戶資料
    getUserListData() {
      this.userList = [];
      const companyUserListRef = database.ref('company/userList');
      companyUserListRef.once('value', (snapshot) => {
        const data = snapshot.val();
        Object.keys(data).forEach((item) => {
          // 物件轉陣列
          this.userList.push(data[item]);
        });
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
    // 打開 modal
    openSettingUserModal(action) {
      const obj = {};
      if (action === '新增用戶') {
        obj.action = action;
      } else {
        obj.action = action;
        obj.data = this.tempUser;
      }
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
