<template>
  <div class="adminPage--py">
    <AdminNav :nowPage="nowPage" />
    <div class="container">
      <ul class="row row-cols-lg-3 row-cols-1 gy-5" v-if="dataReady">
        <li class="col">
          <div class="newScvCard putPointer h-100" @click="openDocModal('newMessageTemplate')">
            <p class="newScvCard__txt"><i class="jobIcon-sm bi bi-plus-lg me-1"></i>新增文字模板</p>
          </div>
        </li>
        <template v-for="(item, index) in user.messageTemplateList" :key="index">
          <li class="col" @click="openDocModal('readMessageTemplate', index)">
            <div class="scvCard scvCard--messageTemplate putPointer h-100">
              <div class="scvCard__body">
                <p class="scvCard__title mb-1">{{ item.title }}</p>
                <div class="scvCard__txtContent subTxt" v-html="item.content"></div>
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
      nowPage: '文字模板',
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
      this.saveFbData();
    },
    getUserDataFromModal(userData) {
      this.user = JSON.parse(JSON.stringify(userData));
      this.saveFbData();
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
      } else if (action === 'newMessageTemplate') {
        emitter.emit('open-doc-modal', obj);
      } else if (action === 'readMessageTemplate') {
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
    saveFbData() {
      const userRef = database.ref('user');
      userRef.set(this.user);
      this.getFbData();
    },
  },
  created() {
    this.getFbData();
  },
};
</script>

<style lang="scss"></style>
