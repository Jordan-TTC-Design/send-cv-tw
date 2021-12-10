<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container-xl">
      <div class="row justify-content-center">
        <div class="col-xl-9 col-12">
          <div class="p-5 mb-5 rounded bg-light box--shadow">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h2 class="subTitle">綁定其他信箱</h2>
              <button
                type="btn"
                class="btn btn-outline-companyColor"
                @click="openSettingUserModal('綁定信箱')"
              >
                綁定信箱
              </button>
            </div>
            <p class="mb-3">
              免去在各個聊天室和求職者聯繫，網站統一管理，讓資訊傳達更加迅速透明！
              綁定信箱取得更多功能！包括建立企業形象，搜尋更多求職者資訊。
            </p>
            <div class="row">
              <div class="col-6">
                <div>
                  <img class="w-100 rounded mb-2" src="https://i.imgur.com/w4Eeknw.jpeg" alt="" />
                  <p>綁定其他屬於企業招募的信箱，統合整理信箱來信，快速與求職者對談。</p>
                </div>
              </div>
              <div class="col-6">
                <div>
                  <img class="w-100 rounded mb-2" src="https://i.imgur.com/Rp7XWr6.jpeg" alt="" />
                  <p>綁定其他屬於企業招募的信箱，統一管理求職者拍照申請職位。</p>
                </div>
              </div>
            </div>
          </div>
          <ul class="adminList adminList--card">
            <li class="adminList__item adminList__titleItem">
              <p class="text-secondary fw-normal text-nowrap">
                目前共 {{ otherEmailList.length }} 個信箱
              </p>
            </li>
            <template v-for="(item, index) in otherEmailList" :key="item.key">
              <li class="adminList__item">
                <div class="adminList__item__body">
                  <p class="itemTitle text-dark d-flex align-items-center mb-1">
                    {{ item.email }}
                    <span class="jobTag ms-2">{{ item.is_enabled ? '驗證成功' : '尚未驗證' }}</span>
                  </p>
                  <p class="subTxt text-secondary">登陸時間：2021-12-20 12:30</p>
                </div>
                <div class="adminList__item__footer--line btnBox">
                  <button
                    type="button"
                    class="btn btn-gray-light text-dark"
                    @click="deleteEmail(index)"
                  >
                    解除綁定
                  </button>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <SettingUserModal @new-email-data="newEmailToList" />
</template>

<script>
import emitter from '@/methods/emitter';
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import SettingUserModal from '@/components/company/SettingUserModal.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    CompanyAdminNav,
    SettingUserModal,
  },
  data() {
    return {
      nowPage: '綁定信箱',
      otherEmailList: [],
    };
  },
  methods: {
    deleteEmail(index) {
      this.otherEmailList.splice(index, 1);
      this.saveEmailList();
    },
    newEmailToList(item) {
      const companyEmailListRef = database.ref('company/otherEmailList');
      console.log(item);
      const { key } = companyEmailListRef.push();
      const obj = item;
      obj.key = key;
      console.log(obj);
      companyEmailListRef.child(key).set(obj);
    },
    saveEmailList() {
      const companyEmailListRef = database.ref('company/otherEmailList');
      const obj = {};
      this.otherEmailList.forEach((item) => {
        // 陣列轉回物件
        obj[item.key] = item;
      });
      this.saveUserListData();
      companyEmailListRef.set(obj);
    },
    // 取得全部用戶資料
    getEmailListData() {
      this.otherEmailList = [];
      const companyEmailListRef = database.ref('company/otherEmailList');
      companyEmailListRef.once('value', (snapshot) => {
        const data = snapshot.val();
        Object.keys(data).forEach((item) => {
          // 物件轉陣列
          this.otherEmailList.push(data[item]);
        });
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
    this.getEmailListData();
  },
};
</script>

<style lang="scss"></style>
