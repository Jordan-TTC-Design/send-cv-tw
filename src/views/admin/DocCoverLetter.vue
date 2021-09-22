<template>
  <div class="adminPage--py">
    <AdminNav :nowPage="nowPage" />
    <div class="container">
      <ul class="row" v-if="dataReady">
        <li class="col-4">
          <div class="docCard--new putPointer" @click="openDocModal('newCoverLetter')">
            <p><i class="jobIcon-sm bi bi-plus-lg me-1"></i>新增求職信</p>
          </div>
        </li>
        <template v-for="(item, index) in user.docData.coverLetterList" :key="index">
          <li class="col-4" @click="openDocModal('readCoverLetter', index)">
            <div class="docCard docCard--coverLetter">
              <p class="docCard__title">{{ item.title }}</p>
              <div class="docCard--coverLetter__content subTxt mb-3" v-html="item.content"></div>
              <div class="d-flex justify-content-between align-items-end">
                <p class="subTxt">更新時間:{{ $filters.date(item.time) }}</p>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
  <DocModal
    :userData="user"
    @returnUserData="getUserDataFromModal"
    @openSecondAsk="openSecondAsk"
  />
  <SecondAskModal @delete-target="deleteCoverLetterData" />
</template>

<script>
import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import DocModal from '@/components/admin/DocModal.vue';
import AdminNav from '@/components/admin/AdminNav.vue';
import SecondAskModal from '@/components/helpers/SecondAskModal.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    UpTopBtn,
    DocModal,
    AdminNav,
    SecondAskModal,
  },
  data() {
    return {
      nowPage: '求職信',
      editLetterModal: {},
      user: {},
      tempCoverLetter: {
        title: '',
        content: '',
      },
      dataReady: false,
    };
  },
  methods: {
    // 刪除CoverLetter
    deleteCoverLetterData(id) {
      this.user.docData.coverLetterList.splice(id, 1);
      this.saveAllData();
    },
    getUserDataFromModal(userData) {
      this.user = JSON.parse(JSON.stringify(userData));
      this.saveAllData();
    },
    openSecondAsk(obj) {
      const temItem = {
        itemId: obj.index,
        itemName: obj.title,
        action: '刪除',
      };
      emitter.emit('open-delete-product-modal', temItem);
    },
    openDocModal(action, index) {
      const obj = {
        action,
      };
      if (action === 'newCoverLetter') {
        emitter.emit('open-doc-modal', obj);
      } else if (action === 'readCoverLetter') {
        obj.index = index;
        emitter.emit('open-doc-modal', obj);
      }
    },
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
    // 取得資料
    getFbData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = data;
        this.dataReady = true;
      });
    },
    // 保存資料
    saveAllData() {
      const userRef = database.ref('user');
      userRef.set(this.user);
      this.getFbData();
    },
  },
  created() {
    this.getFbData();
    emitter.emit('spinner-open-bg', 1000);
  },
};
</script>

<style lang="scss"></style>
